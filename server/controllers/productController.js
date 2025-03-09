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





export { getUserProducts, getAllProducts, getBestNewUsersProducts,getTopRatedUsersProducts };
