import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import Event from '../models/eventModel.js';
import AppError from '../utilities/AppError.js';
import { Op } from 'sequelize';
import { sortHelper,filterItemsByRange } from './paginatedProductController.js';


const getUserProductsByUserName = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res
                .status(400)
                .json({ message: 'Netinkamas vartotojo vardas' });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'Vartotojas nerastas' });
        }

        const products = await Product.findAll({ where: { user_id: user.id } });

        if (products.length === 0) {
            return res.status(200).json({
                message: 'Produktų nerasta',
                data: [],
                avgUserRating: 0,
            });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        const userIds = [...new Set(ratings.map((rating) => rating.user_id))];

        const users = await User.findAll({
            where: { id: { [Op.in]: userIds } },
        });

        const ratingEvents = await Event.findAll({
            where: {
                product_id: { [Op.in]: products.map((p) => p.id) },
                type_id: 1, // "created"
                target_id: 6, // "rating"
            },
        });

        const userMap = {};
        users.forEach((user) => {
            userMap[user.id] = user;
        });

        // Susiejame reitingus su įvykiais pagal rating.id
        const ratingEventMap = {};
        ratings.forEach((rating) => {
            const matchingEvent = ratingEvents.find(
                (event) =>
                    event.user_id === rating.user_id &&
                    event.product_id === rating.product_id
            );
            if (matchingEvent) {
                ratingEventMap[rating.id] = matchingEvent;
                // Pašaliname panaudotą įvykį, kad jis nebūtų pakartotinai priskirtas
                ratingEvents.splice(ratingEvents.indexOf(matchingEvent), 1);
            }
        });

        // Calculate each product's average rating
        const productRatingsMap = {};
        ratings.forEach((rating) => {
            if (!productRatingsMap[rating.product_id]) {
                productRatingsMap[rating.product_id] = { stars: 0, count: 0 };
            }
            productRatingsMap[rating.product_id].stars += rating.stars;
            productRatingsMap[rating.product_id].count += 1;
        });

        let totalRatings = 0;
        let totalStars = 0;

        const processedProducts = products.map((product) => {
            const productRating = productRatingsMap[product.id];
            let avgRating = 0;
            let ratingCount = 0;

            if (productRating) {
                ratingCount = productRating.count;
                avgRating = productRating.stars / ratingCount;
                totalStars += avgRating;
                totalRatings += 1;
            }

            const productRatings = ratings.filter(
                (rating) => rating.product_id === product.id
            );
            const comments = productRatings
                .map((rating) => {
                    const event = ratingEventMap[rating.id];
                    return {
                        username:
                            userMap[rating.user_id]?.username || 'Nežinomas',
                        comment: rating.comment,
                        stars: rating.stars,
                        timestamp: event ? event.timestamp : null,
                    };
                })
                .filter((comment) => comment.comment);

            const userData = userMap[product.user_id] || {};

            return {
                ...product.dataValues,
                ratingCount,
                avgRating,
                comments,
                userData,
            };
        });

        const avgUserRating =
            totalRatings > 0 ? +(totalStars / totalRatings).toFixed(2) : 0;

        return res.json({
            avgUserRating,
            totalRatings,
            data: processedProducts,
        });
    } catch (err) {
        console.error('Klaida gaunant duomenis:', err);
        return res.status(500).json({ message: 'Klaida gaunant duomenis' });
    }
};

const getUserProducts = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const products = await Product.findAll({
            where: { user_id: userId },
        });

        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: 'No products found for this user' });
        }

        return res.json({ data: products });
    } catch (error) {
        console.error('Error fetching user products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { q, minPrice, maxPrice, minDate, maxDate, sort, order  } = req.query;

        let { page = 1, limit = 8 } = req.query;
        page = Math.max(Number(page), 1);
        limit = Math.max(Number(limit), 1);
        const offset = (page - 1) * limit;

        let products;
        if (q) {
            products = await Product.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${q}%`,
                    },
                },
            });
        } else {
            products = await Product.findAll();
        }

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nėra produktų' });
        }

        const events = await Event.findAll({
            where: {
                type_id: 1,
                target_id: 2,
            },
        });

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        const processedProducts = products.map((product) => {
            const productEvents = events.filter(
                (event) =>
                    event.user_id === product.user_id &&
                    event.product_id === product.id
            );
            const latestEvent = productEvents.length
                ? productEvents.sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                  )[0]
                : null;

            const productRatings = ratings.filter(
                (r) => r.product_id === product.id
            );
            const ratingCount = productRatings.length;
            const avgRating =
                ratingCount > 0
                    ? productRatings.reduce((sum, r) => sum + r.stars, 0) /
                      ratingCount
                    : 0;

            return {
                ...product.toJSON(),
                timestamp: latestEvent ? latestEvent.timestamp : null,
                avgRating: avgRating.toFixed(2),
                ratingCount,
            };
        });

        let allFilteredProducts = processedProducts;

        if (minPrice || maxPrice) {
            allFilteredProducts = await filterItemsByRange(
                minPrice,
                maxPrice,
                allFilteredProducts,
                null,
                null,
                'price'
            );
        }

        if (minDate || maxDate) {
            allFilteredProducts = await filterItemsByRange(
                minDate,
                maxDate,
                allFilteredProducts,
                null,
                null,
                'date'
            );
        }

        console.log("controller:" ,sort,order)
        console.log("query!!!!!!!!: ",req.query)
        const sortedProducts = await sortHelper(
            allFilteredProducts,
            sort,
            order
        );
      
        

        return res.json({ data: sortedProducts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Klaida gaunant duomenis' });
    }
};

const getHotProducts = async (req, res, next) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setHours(0, 0, 0, 0);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1,
                target_id: 2,
                timestamp: { [Op.gte]: oneWeekAgo },
            },
            attributes: ['user_id', 'product_id', 'timestamp'],
        });

        if (newUserEvents.length === 0) {
            return res.status(200).json({
                message: 'Nerasta naujausių produktų įvykių',
                data: [],
            });
        }

        const newProductIds = newUserEvents.map((event) => event.product_id);

        const products = await Product.findAll({
            where: { id: { [Op.in]: newProductIds } },
        });

        if (products.length === 0) {
            return res.status(200).json({
                message: 'Nerasta produktų pagal naujausius įvykius',
                data: [],
            });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        const productCreationObject = {};
        newUserEvents.forEach((event) => {
            if (event.product_id) {
                productCreationObject[event.product_id] = event.timestamp;
            }
        });

        const processedProducts = products.map((product) => {
            const productRatings = ratings.filter(
                (rating) => rating.product_id === product.id
            );
            const ratingCount = productRatings.length;
            const avgRating =
                ratingCount > 0
                    ? productRatings.reduce(
                          (sum, rating) => sum + rating.stars,
                          0
                      ) / ratingCount
                    : 0;

            const createdAt = productCreationObject[product.id];

            return { ...product.dataValues, ratingCount, avgRating, createdAt };
        });

        const filteredProducts = processedProducts
            .filter(
                (product) => product.avgRating >= 4.5 && product.ratingCount > 0
            )
            .sort((a, b) => b.ratingCount - a.ratingCount)
            .slice(0, 4);

        if (filteredProducts.length === 0) {
            return res
                .status(200)
                .json({ message: 'Nerasta populiarių produktų', data: [] });
        }

        res.json({ status: 'success', data: filteredProducts });
    } catch (error) {
        next(error);
    }
};

const getTopRatedProducts = async (req, res, next) => {
    try {
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1,
                target_id: 2,
            },
            attributes: ['user_id'],
        });

        if (newUserEvents.length === 0) {
            return res
                .status(200)
                .json({ message: 'No recent product events found', data: [] });
        }

        const newUserIds = newUserEvents.map((event) => event.user_id);

        if (newUserIds.length === 0) {
            return res.json([]);
        }

        const products = await Product.findAll({
            where: {
                user_id: newUserIds,
            },
        });

        if (products.length === 0) {
            return res.status(200).json({
                message: 'No products found for the recent users',
                data: [],
            });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        const results = products.map((product) => {
            const productRatings = ratings.filter(
                (rating) => rating.product_id === product.id
            );
            const ratingCount = productRatings.length;
            const avgRating =
                ratingCount > 0
                    ? productRatings.reduce(
                          (sum, rating) => sum + rating.stars,
                          0
                      ) / ratingCount
                    : 0;

            return { ...product.dataValues, ratingCount, avgRating };
        });

        const filteredProducts = results
            .filter((result) => result.avgRating >= 4.5)
            .sort((a, b) => b.ratingCount - a.ratingCount)
            .slice(0, 4);

        if (filteredProducts.length === 0) {
            return res
                .status(200)
                .json({ message: 'No hot products found', data: [] });
        }

        res.json({
            status: 'success',
            data: filteredProducts,
        });
    } catch (error) {
        next(error);
    }
};

const getTopUserProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        const userStats = {};

        products.forEach((product) => {
            if (!userStats[product.user_id]) {
                userStats[product.user_id] = {
                    products: [],
                    totalRatings: 0,
                    totalStars: 0,
                };
            }
            userStats[product.user_id].products.push(product);
        });

        const productRatingsMap = {};
        ratings.forEach((rating) => {
            if (!productRatingsMap[rating.product_id]) {
                productRatingsMap[rating.product_id] = { stars: 0, count: 0 };
            }
            productRatingsMap[rating.product_id].stars += rating.stars;
            productRatingsMap[rating.product_id].count += 1;
        });

        Object.keys(userStats).forEach((userId) => {
            userStats[userId].products.forEach((product) => {
                const productRating = productRatingsMap[product.id];
                if (productRating) {
                    const avgProductRating =
                        productRating.stars / productRating.count;
                    userStats[userId].totalStars += avgProductRating;
                    userStats[userId].totalRatings += 1;
                }
            });
        });

        let topUserId = null;
        let maxRatings = 0;
        let topUserRating = 0;

        Object.entries(userStats).forEach(([userId, stats]) => {
            const avgUserRating =
                stats.totalRatings > 0
                    ? stats.totalStars / stats.totalRatings
                    : 0;

            if (
                stats.products.length >= 4 &&
                avgUserRating >= 4.5 &&
                stats.totalRatings > maxRatings
            ) {
                maxRatings = stats.totalRatings;
                topUserId = userId;
                topUserRating = avgUserRating;
            }
        });

        if (!topUserId || topUserRating < 4.5) {
            return res
                .status(200)
                .json({ message: 'No suitable user found', data: [] });
        }

        const topUserProducts = userStats[topUserId].products
            .map((product) => {
                const productRating = productRatingsMap[product.id];
                if (productRating) {
                    const ratingCount = productRating.count;
                    const avgRating = productRating.stars / ratingCount;
                    return { ...product.dataValues, ratingCount, avgRating };
                }
                return null;
            })
            .filter((product) => product !== null)
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 4);

        if (topUserProducts.length < 4) {
            return res
                .status(200)
                .json({ message: 'No suitable user found', data: [] });
        }

        res.json({
            status: 'success',
            user_id: topUserId,
            userRating: topUserRating.toFixed(2),
            totalRatings: maxRatings,
            data: topUserProducts,
        });
    } catch (error) {
        next(error);
    }
};

const getTrendingUserProducts = async (req, res, next) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setHours(0, 0, 0, 0);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1,
                target_id: 1,
                timestamp: { [Op.gte]: oneWeekAgo },
            },
            attributes: ['user_id', 'timestamp'],
        });

        const newUserIds = newUserEvents.map((event) => event.user_id);

        if (newUserIds.length === 0) {
            return res
                .status(200)
                .json({ message: 'users not found', data: [] });
        }

        const userCreationObject = {};
        newUserEvents.forEach((event) => {
            if (event.user_id) {
                userCreationObject[event.user_id] = event.timestamp;
            }
        });

        const products = await Product.findAll({
            where: { user_id: newUserIds },
        });

        if (products.length === 0) {
            return res
                .status(200)
                .json({ message: 'Nerasta produktų', data: [] });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        const userStats = {};

        products.forEach((product) => {
            if (!userStats[product.user_id]) {
                userStats[product.user_id] = {
                    products: [],
                    totalRatings: 0,
                    totalStars: 0,
                    createdAt: userCreationObject[product.user_id],
                };
            }
            userStats[product.user_id].products.push(product);
        });

        const productRatingsMap = {};
        ratings.forEach((rating) => {
            if (!productRatingsMap[rating.product_id]) {
                productRatingsMap[rating.product_id] = { stars: 0, count: 0 };
            }
            productRatingsMap[rating.product_id].stars += rating.stars;
            productRatingsMap[rating.product_id].count += 1;
        });

        Object.keys(userStats).forEach((userId) => {
            userStats[userId].products.forEach((product) => {
                const productRating = productRatingsMap[product.id];
                if (productRating) {
                    const avgProductRating =
                        productRating.stars / productRating.count;
                    userStats[userId].totalStars += avgProductRating;
                    userStats[userId].totalRatings += 1;
                }
            });
        });

        let trendingUserId = null;
        let highestAvgRating = 0;

        Object.entries(userStats).forEach(([userId, stats]) => {
            const avgUserRating =
                stats.totalRatings > 0
                    ? stats.totalStars / stats.totalRatings
                    : 0;

            if (stats.totalRatings >= 4 && avgUserRating >= 4) {
                if (avgUserRating > highestAvgRating) {
                    trendingUserId = userId;
                    highestAvgRating = avgUserRating;
                }
            }
        });

        if (!trendingUserId) {
            return res
                .status(200)
                .json({ message: 'Nerasta populiaraus vartotojo', data: [] });
        }

        const trendingUserProducts = userStats[trendingUserId].products
            .map((product) => {
                const productRating = productRatingsMap[product.id];
                if (productRating) {
                    const ratingCount = productRating.count;
                    const avgRating = productRating.stars / ratingCount;
                    return { ...product.dataValues, ratingCount, avgRating };
                }
                return null;
            })
            .filter((product) => product !== null)
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 4);

        if (trendingUserProducts.length < 4) {
            return res.status(200).json({
                message: 'Nerasta tinkamo populiaraus vartotojo',
                data: [],
            });
        }

        res.json({
            status: 'success',
            user_id: trendingUserId,
            userRating: highestAvgRating.toFixed(2),
            userCreatedAt: userStats[trendingUserId].createdAt,
            data: trendingUserProducts,
        });
    } catch (error) {
        next(error);
    }
};

const getAllProductCount = async (req, res) => {
    const userCount = await Product.count();
    res.status(200).json({
        status: 'success',
        data: userCount,
    });
};

const getRatedProductsByUserName = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(400).json({
                message: 'Username is required',
            });
        }

        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const userRatings = await Rating.findAll({
            where: { user_id: user.id },
        });

        if (userRatings.length === 0) {
            return res.status(200).json({
                message: 'No ratings found for the user',
                data: [],
            });
        }

        const productIds = [
            ...new Set(userRatings.map((rating) => rating.product_id)),
        ];

        const products = await Product.findAll({
            where: {
                id: { [Op.in]: productIds },
            },
        });

        const events = await Event.findAll({
            where: {
                user_id: user.id,
                type_id: 1, // "created"
                target_id: 6, // "rating"
                product_id: { [Op.in]: productIds },
            },
        });

        const productMap = {};
        products.forEach((product) => {
            productMap[product.id] = product.dataValues;
        });

        // Susiejame reitingus su įvykiais pagal rating.id
        const ratingEventMap = {};
        userRatings.forEach((rating) => {
            const matchingEvent = events.find(
                (event) =>
                    event.user_id === rating.user_id &&
                    event.product_id === rating.product_id
            );
            if (matchingEvent) {
                ratingEventMap[rating.id] = matchingEvent;
                // Pašaliname panaudotą įvykį, kad jis nebūtų pakartotinai priskirtas
                events.splice(events.indexOf(matchingEvent), 1);
            }
        });

        const processedProducts = userRatings.map((rating) => {
            const product = productMap[rating.product_id];
            const event = ratingEventMap[rating.id];

            return {
                ...product,
                userRating: rating.stars,
                userComment: rating.comment,
                timestamp: event ? event.timestamp : null,
            };
        });

        return res.json({
            status: 'success',
            data: processedProducts,
        });
    } catch (error) {
        console.error('Error getting rated products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'contacts'],
                },
                {
                    model: Rating,
                    attributes: ['stars'],
                },
            ],
        });
        if (product) {
            const ratings = product.Ratings;
            const ratingCount = ratings.length;
            const avgRating =
                ratingCount > 0
                    ? ratings.reduce((sum, rating) => sum + rating.stars, 0) /
                      ratingCount
                    : 0;

            res.json({
                ...product.dataValues,
                avgRating: avgRating.toFixed(2),
                ratingCount,
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error}` });
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { id } = res.locals;
        const {
            category_id,
            subcategory_id,
            name,
            price,
            description,
            amount_in_stock,
        } = req.body;
        const newProduct = await Product.create({
            user_id: id,
            category_id,
            subcategory_id,
            name,
            price,
            description,
            amount_in_stock,
        });
        if (!newProduct) {
            throw new AppError('Internal server error', 500);
        } else {
            res.status(201).json({
                status: 'success',
                data: newProduct.dataValues,
            });
        }
    } catch (error) {
        next(error);
    }
};

const editProduct = async (req, res, next) => {
    try {
        const { id } = res.locals;
        const { productId } = req.params;
        const {
            category_id,
            subcategory_id,
            name,
            price,
            description,
            amount_in_stock,
            image_url,
        } = req.body;
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            throw new AppError('Product not found', 404);
        } else if (foundProduct.user_id !== id) {
            throw new AppError(
                "Forbidden to change other user's products",
                403
            );
        } else {
            foundProduct.category_id = category_id || foundProduct.category_id;
            foundProduct.subcategory_id =
                subcategory_id || foundProduct.subcategory_id;
            foundProduct.name = name || foundProduct.name;
            foundProduct.price = price || foundProduct.price;
            foundProduct.amount_in_stock =
                amount_in_stock || foundProduct.amount_in_stock;
            foundProduct.description = description || foundProduct.description;
            foundProduct.image_url = image_url || foundProduct.image_url;
            await foundProduct.save();
            res.status(200).json({
                status: 'success',
                message: 'Changed product successfully',
                data: foundProduct.dataValues,
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = res.locals;
        const { productId } = req.params;
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            throw new AppError('Product not found', 404);
        } else if (foundProduct.user_id !== id) {
            throw new AppError(
                "Forbidden to delete other user's products",
                403
            );
        } else {
            await foundProduct.destroy();
            res.status(203).send();
        }
    } catch (error) {
        next(error);
    }
};
const getSearchRegex = (req, res) => {
    const zalgoRegex = process.env.ZALGO_REGEX;
    res.json({ zalgoRegex });
};

export {
    getAllProductCount,
    getUserProductsByUserName,
    getAllProducts,
    getHotProducts,
    getTopRatedProducts,
    getTopUserProducts,
    getTrendingUserProducts,
    getRatedProductsByUserName,
    getUserProducts,
    createProduct,
    editProduct,
    deleteProduct,
    getSearchRegex,
};
