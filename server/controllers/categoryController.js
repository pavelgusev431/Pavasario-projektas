import { Category, Subcategory } from '../models/categorySyncModel.js';
import AppError from '../utilities/AppError.js';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import { Op } from 'sequelize';

export const getAllCategoriesWithSubcategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Subcategory,
                    as: 'subcategories',
                },
            ],
        });

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories,
            },
        });
    } catch (error) {
        next(new AppError(`Error fetching categories: ${error.message}`, 500));
    }
};

export const getCategoryWithSubcategories = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            include: [
                {
                    model: Subcategory,
                    as: 'subcategories',
                },
            ],
        });

        if (!category) {
            return next(new AppError(`No category found with id: ${id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
        });
    } catch (error) {
        next(new AppError(`Error fetching category: ${error.message}`, 500));
    }
};

export const getProductsBySubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;
        const limit = req.query.limit || 8;
        const offset = req.query.offset || 0;

        if (!subcategoryId || isNaN(subcategoryId)) {
            return res
                .status(400)
                .json({ message: 'Invalid or missing subcategory ID' });
        }

        const { count, rows: products } = await Product.findAndCountAll({
            where: {
                subcategory_id: subcategoryId,
            },
            include: {
                model: Subcategory,
                as: 'subcategory',
            },
            offset: offset,
            limit: limit,
        });

        if (!products || products.length === 0) {
            return res
                .status(404)
                .json({ message: 'No products found for this subcategory' });
        }

        const ratings = await Rating.findAll({
            where: {
                product_id: {
                    [Op.in]: products.map((product) => product.id),
                },
            },
        });

        const processedProducts = products.map((product) => {
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
                avgRating: avgRating.toFixed(2),
                ratingCount,
            };
        });

        res.status(200).json({
            status: 'success',
            results: processedProducts.length,
            totalProducts: count,
            data: {
                products: processedProducts,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
