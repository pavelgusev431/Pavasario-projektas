import { User } from '../models/userModel.js';
import Product from '../models/productModel.js';

// Gauti vartotojo produktus
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

        return res.json({ data: products });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Klaida gaunant duomenis' });
    }
};

// Gauti visus produktus
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nėra produktų' });
        }

        res.status(200).json({ status: "success", data: products });
    } catch (error) {
        console.error("Klaida gaunant produktus:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produktas nerastas' });
        }

        res.status(200).json({ data: product });
    } catch (error) {
        console.error('❌ Klaida gaunant produktą pagal ID:', error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
};

// Gauti produktų kiekį
const getAllProductCount = async (req, res) => {
    try {
        const productCount = await Product.count();
        res.status(200).json({
            status: 'success',
            data: productCount,
        });
    } catch (error) {
        console.error("Klaida gaunant produktų kiekį:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Gauti visų naudotojų produktus
const getAllUsersProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email']
                }
            ]
        });

        console.log("🟡 Data from Database (Server):", products);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'Produktų nėra' });
        }

        res.status(200).json({ status: 'success', data: products });
    } catch (error) {
        console.error("❌ Klaida gaunant visų naudotojų produktus:", error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
};




export { getUserProducts, getAllProducts, getAllProductCount, getProductById, getAllUsersProducts };
