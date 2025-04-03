import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import Event from '../models/eventModel.js';
import { Op } from 'sequelize';

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
                user_id: { [Op.in]: userIds },
                type_id: 1, // "created"
                target_id: 6, // "rating"
                product_id: { [Op.in]: products.map((p) => p.id) },
            },
        });

        const userMap = {};
        users.forEach((user) => {
            userMap[user.id] = user;
        });

        const eventMap = {};
        ratingEvents.forEach((event) => {
            eventMap[`${event.user_id}-${event.product_id}`] = event;
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
                    const event =
                        eventMap[`${rating.user_id}-${rating.product_id}`];
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
        const products = await Product.findAll();

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nėra produktų' });
        }

        return res.json({ data: products });
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
                type_id: 1,
                target_id: 6,
                product_id: { [Op.in]: productIds },
            },
        });

        const productMap = {};
        products.forEach((product) => {
            productMap[product.id] = product.dataValues;
        });

        const eventMap = {};
        events.forEach((event) => {
            if (!eventMap[event.product_id]) {
                eventMap[event.product_id] = [];
            }
            eventMap[event.product_id].push(event);
        });

        const processedProducts = userRatings.map((rating) => {
            const product = productMap[rating.product_id];
            const productEvents = eventMap[rating.product_id] || [];

            const event =
                productEvents.find((e) => e.product_id === rating.product_id) ||
                null;

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
        console.log('Request params:', req.params);
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
            console.log('Product found:', product);

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
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllProductsSorted = async (req, res) => {
    try {
        console.log('✅ Сортировка работает:', req.query);
        const allowedSortFields = [
            'id',
            'createdAt',
            'price',
            'name',
            'avgRating',
        ];
        const sortField = allowedSortFields.includes(req.query.sort)
            ? req.query.sort
            : 'id';

        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

        const from = req.query.from?.trim() || null;
        const to = req.query.to?.trim() || null;

        const where = {};

        if (from && to) {
            where.createdAt = {
                [Op.between]: [new Date(from), new Date(to)],
            };
        } else if (from) {
            where.createdAt = {
                [Op.gte]: new Date(from),
            };
        } else if (to) {
            where.createdAt = {
                [Op.lte]: new Date(to),
            };
        }

        const options = { where };
        const products = await Product.findAll(options);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nėra produktų' });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        const processed = products.map((product) => {
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
                ...product.dataValues,
                ratingCount,
                avgRating,
            };
        });

        if (sortField === 'avgRating') {
            processed.sort((a, b) =>
                order === 'DESC'
                    ? b.avgRating - a.avgRating
                    : a.avgRating - b.avgRating
            );
        } else if (sortField === 'price') {
            processed.sort((a, b) => {
                const priceA = Number(a.price);
                const priceB = Number(b.price);
                return order === 'DESC' ? priceB - priceA : priceA - priceB;
            });
        }

        return res.json({
            products: processed,
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalProducts: processed.length,
            },
        });
    } catch (err) {
        console.error('Klaida serveryje:', err);
        return res.status(500).json({ message: 'Klaida gaunant duomenis' });
    }
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
    getAllProductsSorted,
    getUserProducts,
};
