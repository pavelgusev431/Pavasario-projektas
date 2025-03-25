import Product from '../models/productModel.js';

export const getPaginatedProducts = async (req, res) => {
    try {
        let { page = 1, limit = 8, minPrice, maxPrice } = req.query;

        page = Math.max(Number(page), 1);
        limit = Math.max(Number(limit), 1);

        const offset = (page - 1) * limit;

       console.log(`cia bet kas`,req.query);
       

        let products = await Product.findAll();
        
        if (minPrice || maxPrice) {
            products = await filterProductsByPrice(minPrice, maxPrice, products);
           
            
        } else {
            products = await Product.findAll({
                limit: Number(limit),
                offset: Number(offset),
            });
        }

        

        console.log('Fetched products:', products);

        const totalProducts = await Product.count();
        console.log('Total products in database:', totalProducts);

        if (!products.length) {
            console.log('No products found');
        }

        res.json({
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const filterProductsByPrice = async (minPrice, maxPrice, items) => {
    return items.filter((item) => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
};
