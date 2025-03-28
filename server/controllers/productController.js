import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import Event from '../models/eventModel.js';
import { Op } from 'sequelize';

const getUserProductsByUserName = async (req, res) => {
    try {
        const username = req.params.username; // Gauname username iš parametro

        if (!username) {
            return res
                .status(400)
                .json({ message: 'Netinkamas vartotojo vardas' });
        }

        // Surandame vartotoją pagal username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'Vartotojas nerastas' });
        }

        const userId = user.id; // Gaukime vartotojo ID

        // Gauname vartotojo produktus
        const products = await Product.findAll({ where: { user_id: userId } });

        if (products.length === 0) {
            return res.status(200).json({
                message: 'Produktų nerasta',
                data: [],
                avgUserRating: 0,
            });
        }

        // Gauname visus produktų reitingus
        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        // Surenkame visus unikalius vartotojų ID, kurie paliko reitingus
        const userIds = [...new Set(ratings.map((rating) => rating.user_id))];

        // Gauname visų vartotojų duomenis
        const users = await User.findAll({
            where: { id: { [Op.in]: userIds } },
        });

        const events = await Event.findAll({
            where: { type_id: 1, target_id: 6, user_id: user.id },
        });
        const event = events.find(
            (e) => e.user_id === user.id && e.target_id === 6
        );

        // Sukuriame žemėlapį { user_id: vartotojo informacija }
        const userMap = {};
        users.forEach((user) => {
            userMap[user.id] = user; // Įtraukiame visą vartotojo informaciją
        });

        // **Apskaičiuojame UserRating ir avgUserRating**
        let totalRatings = 0;
        let totalStars = 0;

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

            // Atnaujiname bendrą UserRating statistiką
            totalRatings += ratingCount;
            totalStars += productRatings.reduce(
                (sum, rating) => sum + rating.stars,
                0
            );

            // Surenkame visus vartotojų komentarus, tačiau vartotojo informacija bus rodoma produkto sekcijoje
            const comments = productRatings
                .map((rating) => ({
                    username: userMap[rating.user_id]?.username || 'Nežinomas',
                    comment: rating.comment,
                    stars: rating.stars,
                    timestamp: event ? event.timestamp : null,
                }))
                .filter((comment) => comment.comment); // Filtruojame tuščius komentarus

            // Sukuriame vartotojo duomenų skyrių (userData)
            const userData = userMap[product.user_id] || {};

            return {
                ...product.dataValues,
                ratingCount,
                avgRating,
                comments,
                userData,
            };
        });

        // Apskaičiuojame bendrą vartotojo įvertinimą (UserRating)
        const avgUserRating =
            totalRatings > 0 ? +(totalStars / totalRatings).toFixed(2) : '0.00';

        return res.json({
            avgUserRating,
            totalRatings,
            data: processedProducts,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Klaida gaunant duomenis' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.findAll();

        // If no products are found, return a 404 response
        if (products.length === 0) {
            return res.status(404).json({ message: 'Nėra produktų' });
        }

        // Send the products as a response
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

        // Randame per pastarąją savaitę sukurtų produktų įvykius
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1, // 'created' event type
                target_id: 2, // Produktų įvykiai
                timestamp: { [Op.gte]: oneWeekAgo },
            },
            attributes: ['user_id'],
        });

        if (newUserEvents.length === 0) {
            return res
                .status(200)
                .json({ message: 'No recent product events found', data: [] });
        }

        const newUserIds = newUserEvents.map((event) => event.user_id);
        const products = await Product.findAll({
            where: { user_id: newUserIds },
        });

        if (products.length === 0) {
            return res.status(200).json({
                message: 'No products found for the recent users',
                data: [],
            });
        }

        // Randame visus produktų reitingus
        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        // Apdorojame produktus su jų reitingais
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

            return { ...product.dataValues, ratingCount, avgRating };
        });

        // Filtruojame produktus, kurie turi vidutinį reitingą ≥ 4.5 ir bent vieną įvertinimą
        const filteredProducts = processedProducts
            .filter(
                (product) => product.avgRating >= 4.5 && product.ratingCount > 0
            )
            .sort((a, b) => b.ratingCount - a.ratingCount)
            .slice(0, 4);

        if (filteredProducts.length === 0) {
            return res
                .status(200)
                .json({ message: 'No hot products found', data: [] });
        }

        res.json({ status: 'success', data: filteredProducts });
    } catch (error) {
        next(error);
    }
};

const getTopRatedProducts = async (req, res, next) => {
    try {
        // Randame naujus vartotojus pagal jų registracijos įvykį
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1, // 'created' event type
                target_id: 2, // produktų įvykiai
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

        // Randame produktus, kurie priklauso naujiems vartotojams
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

        // Filtruojame pagal vidutinį reitingą (≥ 4.5) ir rūšiuojame pagal didžiausią reitingų kiekį
        const filteredProducts = results
            .filter((result) => result.avgRating >= 4.5) // Vidutinė įvertinimo žvaigždutė ≥ 4.5
            .sort((a, b) => b.ratingCount - a.ratingCount) // Rikiuojame pagal didžiausią reitingų kiekį
            .slice(0, 4); // Pasirenkame tik 4 geriausius produktus

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
        // Get all products with their users
        const products = await Product.findAll();

        // Get all ratings related to these products
        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        // Group by user
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

        ratings.forEach((rating) => {
            const product = products.find((p) => p.id === rating.product_id);
            if (product && userStats[product.user_id]) {
                userStats[product.user_id].totalRatings++;
                userStats[product.user_id].totalStars += rating.stars;
            }
        });

        // Find the user with most ratings, at least 4 products, and avg rating >= 4.5
        let topUserId = null;
        let maxRatings = 0;
        let topUserRating = 0; // Store the user's overall rating

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
                topUserRating = avgUserRating; // Store the best user's rating
            }
        });

        if (!topUserId || topUserRating < 4.5) {
            return res
                .status(200)
                .json({ message: 'No suitable user found', data: [] });
        }

        // Get only the user's products that have at least 1 rating
        const topUserProducts = userStats[topUserId].products
            .map((product) => {
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

                return ratingCount > 0
                    ? { ...product.dataValues, ratingCount, avgRating }
                    : null;
            })
            .filter((product) => product !== null) // Remove products without ratings
            .sort((a, b) => b.avgRating - a.avgRating) // Sort by highest ratings
            .slice(0, 4); // Get only the top 4 products

        // If the user has less than 4 rated products, do not display
        if (topUserProducts.length < 4) {
            return res
                .status(200)
                .json({ message: 'No suitable user found', data: [] });
        }

        res.json({
            status: 'success',
            user_id: topUserId, // Best user's ID
            userRating: topUserRating.toFixed(2), // Overall user's average rating
            totalRatings: maxRatings, // Total ratings count for the user
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

        // Randame vartotojus, kurie buvo sukurti PRIEŠ 7 dienas ar anksčiau
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1, // 'created' event type
                timestamp: { [Op.gte]: oneWeekAgo },
            },
            attributes: ['user_id'],
        });

        const newUserIds = newUserEvents.map((event) => event.user_id);

        if (newUserIds.length === 0) {
            return res
                .status(200)
                .json({ message: 'No new users found', data: [] });
        }

        // Randame šių vartotojų produktus
        const products = await Product.findAll({
            where: { user_id: newUserIds },
        });

        if (products.length === 0) {
            return res
                .status(200)
                .json({ message: 'No products found for new users', data: [] });
        }

        // Randame visus produktų reitingus
        const ratings = await Rating.findAll({
            where: {
                product_id: { [Op.in]: products.map((product) => product.id) },
            },
        });

        // Grupavimas pagal vartotojus
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

        ratings.forEach((rating) => {
            const product = products.find((p) => p.id === rating.product_id);
            if (product && userStats[product.user_id]) {
                userStats[product.user_id].totalRatings++;
                userStats[product.user_id].totalStars += rating.stars;
            }
        });

        // Ieškome vartotojo su bent 4 įvertintais produktais ir vidutiniu reitingu ≥ 4
        let trendingUserId = null;
        let highestAvgRating = 0;

        Object.entries(userStats).forEach(([userId, stats]) => {
            const avgUserRating =
                stats.totalRatings > 0
                    ? stats.totalStars / stats.totalRatings
                    : 0;

            if (stats.products.length >= 4 && avgUserRating >= 4) {
                if (avgUserRating > highestAvgRating) {
                    trendingUserId = userId;
                    highestAvgRating = avgUserRating;
                }
            }
        });

        if (!trendingUserId) {
            return res
                .status(200)
                .json({ message: 'No trending user found', data: [] });
        }

        // Atrenkame tik to vartotojo produktus su reitingais
        const trendingUserProducts = userStats[trendingUserId].products
            .map((product) => {
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

                return ratingCount > 0
                    ? { ...product.dataValues, ratingCount, avgRating }
                    : null;
            })
            .filter((product) => product !== null)
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 4);

        if (trendingUserProducts.length < 4) {
            return res
                .status(200)
                .json({ message: 'No suitable trending user found', data: [] });
        }

        res.json({
            status: 'success',
            user_id: trendingUserId,
            userRating: highestAvgRating.toFixed(2),
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
        const ratings = await Rating.findAll({ where: { user_id: user.id } });

        if (ratings.length === 0) {
            return res.status(200).json({
                message: 'No ratings found for the user',
                data: [],
            });
        }
        const productIds = ratings.map((rating) => rating.product_id);

        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: productIds,
                },
            },
        });
        const events = await Event.findAll({
            where: { type_id: 1, target_id: 6, user_id: user.id },
        });

        const processedProducts = ratings.map((rating) => {
            const product =
                products.find((p) => p.id === rating.product_id) || {};
            const event = events.find(
                (e) => e.user_id === user.id && e.target_id === 6
            );

            return {
                ...product.dataValues,
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
        console.error('error getting products', error);
        return res.status(500).json({ message: 'server error' });
    }
};

const getAllProductsSorted = async (req, res) => {
    try {
        const allowedSortFields = ['id', 'createdAt', 'price', 'name', 'avgRating'];
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

        if (sortField !== 'avgRating') {
        options.order = [[sortField, order]];
        }


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
                    ? productRatings.reduce((sum, r) => sum + r.stars, 0) / ratingCount
                    : 0;

            return {
                ...product.dataValues,
                ratingCount,
                avgRating,
            };
        });

        if (sortField === 'avgRating') {
            processed.sort((a, b) => {
                return order === 'DESC'
                    ? b.avgRating - a.avgRating
                    : a.avgRating - b.avgRating;
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
};
