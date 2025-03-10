import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import Event from '../models/eventModel.js';
import { Op} from 'sequelize';
const getUserProducts = async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        return res
            .status(400)
            .json({ message: 'Netinkamas vartotojo ID formatas' });
    }

    try {
        const user = await User.findOne({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'Vartotojas nerastas' });
        }

        const products = await Product.findAll({ where: { user_id: userId } });

        return res.json({ data: products }); // Send the products in the response
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

const getBestNewUsersProducts = async (req, res, next) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Randame naujus vartotojus pagal jų registracijos įvykį
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1, // 'created' event type
                timestamp: { [Op.gte]: oneWeekAgo }
            },
            attributes: ['user_id'],
        });

        const newUserIds = newUserEvents.map(event => event.user_id);

        if (newUserIds.length === 0) {
            return res.json([]);
        }

        // Randame produktus, kurie priklauso naujiems vartotojams ir turi reitingą 4+
        const products = await Product.findAll({
            where: {
                user_id: newUserIds
            },
        });

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map(product => product.id)
                }
            }
        })

        const results = products.map(product => {
            const productRatings = ratings.filter(rating => rating.product_id === product.id);
            return { ...product.dataValues, productRatings };
        });

        // Filtruojame pagal vidutinį reitingą
        const filteredProducts = results.filter(result => {
            if (!result.productRatings || result.productRatings.length === 0) return false;
            
            const avgRating = result.productRatings.reduce((sum, rating) => sum + rating.stars, 0) / result.productRatings.length;
            return avgRating >= 4;
        });

        res.json({
            status: 'success',
            data: filteredProducts
        });
    } catch (error) {
        next(error);
    }
};

const getTopRatedUsersProducts = async (req, res, next) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Randame naujus vartotojus pagal jų registracijos įvykį
        const newUserEvents = await Event.findAll({
            where: {
                type_id: 1, // 'created' event type
                timestamp: { [Op.gte]: oneMonthAgo }
            },
            attributes: ['user_id'],
        });

        const newUserIds = newUserEvents.map(event => event.user_id);

        if (newUserIds.length === 0) {
            return res.json([]);
        }

        // Randame produktus, kurie priklauso naujiems vartotojams ir turi reitingą 4.5+
        const products = await Product.findAll({
            where: {
                user_id: newUserIds
            },
        });

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map(product => product.id)
                }
            }
        })

        const results = products.map(product => {
            const productRatings = ratings.filter(rating => rating.product_id === product.id);
            const ratingCount = productRatings.length;
            const avgRating = ratingCount > 0 
                ? productRatings.reduce((sum, rating) => sum + rating.stars, 0) / ratingCount
                : 0;
            
            return { ...product.dataValues, productRatings, ratingCount, avgRating };
        });

         // Filtruojame pagal vidutinį reitingą ir minimalų reitingų kiekį
         const filteredProducts = results.filter(result => result.avgRating >= 4.5 && result.ratingCount >= 5);

        res.json({
            status: 'success', 
            data: filteredProducts
        });
    } catch (error) {
        next(error);
    }
};

const getTopUserProducts = async (req, res, next) => {
    try {
        // Paimame visus produktus su jų vartotojais
        const products = await Product.findAll();

        // Paimame visus reitingus susijusius su šiais produktais
        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map(product => product.id)
                }
            }
        });

        // Grupavimas pagal vartotoją
        const userStats = {};

        products.forEach(product => {
            if (!userStats[product.user_id]) {
                userStats[product.user_id] = { 
                    products: [], 
                    totalRatings: 0, 
                    totalStars: 0 
                };
            }
            userStats[product.user_id].products.push(product);
        });

        ratings.forEach(rating => {
            const product = products.find(p => p.id === rating.product_id);
            if (product && userStats[product.user_id]) {
                userStats[product.user_id].totalRatings++;
                userStats[product.user_id].totalStars += rating.stars;
            }
        });

        // Renkame vartotoją su daugiausiai reitingų, bent 4 produktais ir vidutiniu reitingu ≥ 4.5
        let topUserId = null;
        let maxRatings = 0;
        let topUserRating = 0; // Čia išsaugosime vartotojo bendrą įvertinimą

        Object.entries(userStats).forEach(([userId, stats]) => {
            // Apskaičiuojame vartotojo bendrą vidutinį reitingą tik iš įvertintų produktų
            const avgUserRating = stats.totalRatings > 0 ? stats.totalStars / stats.totalRatings : 0;
            
            // Tikriname, ar šis vartotojas turi daugiau reitingų nei ankstesnis geriausias
            if (stats.products.length >= 4 && avgUserRating >= 4.5 && stats.totalRatings > maxRatings) {
                maxRatings = stats.totalRatings;
                topUserId = userId;
                topUserRating = avgUserRating; // Išsaugome geriausio vartotojo reitingą
            }
        });

        // Jei nerastas tinkamas vartotojas arba jo bendras reitingas < 4.5, grąžiname klaidą
        if (!topUserId || topUserRating < 4.5) {
            return res.status(404).json({ message: "No suitable user found" });
        }

        // Atrenkame tik vartotojo produktus, kurie turi bent 1 reitingą
        const topUserProducts = userStats[topUserId].products
            .map(product => {
                const productRatings = ratings.filter(rating => rating.product_id === product.id);
                const ratingCount = productRatings.length;
                const avgRating = ratingCount > 0 
                    ? productRatings.reduce((sum, rating) => sum + rating.stars, 0) / ratingCount
                    : 0;
                
                return ratingCount > 0 ? { ...product.dataValues, ratingCount, avgRating } : null;
            })
            .filter(product => product !== null) // Pašaliname produktus be reitingų
            .sort((a, b) => b.avgRating - a.avgRating) // Rikiuojame nuo geriausio
            .slice(0, 4); // Paimame tik 4 geriausius produktus

        // Jei vartotojas turi mažiau nei 4 produktus su reitingais, jo nerodome
        if (topUserProducts.length < 4) {
            return res.status(404).json({ message: "No suitable user found" });
        }

        res.json({
            status: "success",
            user_id: topUserId, // Geriausio vartotojo ID
            userRating: topUserRating.toFixed(2), // Bendras vartotojo vidutinis įvertinimas
            totalRatings: maxRatings, // Bendras vartotojo reitingų skaičius
            data: topUserProducts
        });
    } catch (error) {
        next(error);
    }
};





export { getUserProducts, getAllProducts, getBestNewUsersProducts,getTopRatedUsersProducts, getTopUserProducts };
