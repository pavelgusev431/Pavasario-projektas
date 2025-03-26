import { Category, Subcategory } from '../models/categorySyncModel.js';
import AppError from '../utilities/AppError.js';
import Product  from '../models/productModel.js';


export const getAllCategoriesWithSubcategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Subcategory,
                    as: 'subcategories'
                }
            ]
        });
        
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories
            }
        });
    } catch (error) {
        next(new AppError(`Error fetching categories: ${error.message}`, 500));
    }
};

// Get a specific category with its subcategories
export const getCategoryWithSubcategories = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findByPk(id, {
            include: [
                {
                    model: Subcategory,
                    as: 'subcategories'
                }
            ]
        });
        
        if (!category) {
            return next(new AppError(`No category found with id: ${id}`, 404));
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    } catch (error) {
        next(new AppError(`Error fetching category: ${error.message}`, 500));
    }
};

// Get all products for a specific subcategory
export const getProductsBySubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId; // Get the subcategoryId from the URL parameter
        console.log('Received subcategoryId:', subcategoryId); // For debugging

        // Ensure that subcategoryId is valid
        if (!subcategoryId || isNaN(subcategoryId)) {
            return res.status(400).json({ message: 'Invalid or missing subcategory ID' });
        }

        // Fetch products for the given subcategoryId, using the correct column name `subcategory_id`
        const products = await Product.findAll({
            where: {
                subcategory_id: subcategoryId, // Ensure this matches the column name in the database
            },
            include: {
                model: Subcategory,
                as: 'subcategory',
            },
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this subcategory' });
        }

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};