// import Product from '../models/productModel.js';
// import { Op } from 'sequelize';

// export const searchProducts = async (req, res) => {
//     try {
//         const { q: query } = req.query;
//         let { page = 1, limit = 8, sort = 'name', order = 'ASC' } = req.query;

//         // Validate and parse inputs
//         page = Math.max(parseInt(page), 1);
//         limit = Math.max(parseInt(limit), 1);
//         const offset = (page - 1) * limit;
//         order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

//         // Validate sort field
//         const allowedSortFields = ['name', 'price', 'createdAt', 'avgRating'];
//         sort = allowedSortFields.includes(sort) ? sort : 'name';

//         const { count, rows } = await Product.findAndCountAll({
//             where: {
//                 name: {
//                     [Op.iLike]: `%${query}%`
//                 }
//             },
//             order: [[sort, order]],
//             limit,
//             offset,
//             include: [
//                 {
//                     model: Rating,
//                     attributes: [],
//                     required: false
//                 }
//             ],
//             attributes: {
//                 include: [
//                     [sequelize.fn('AVG', sequelize.col('ratings.stars')), 'avgRating'],
//                     [sequelize.fn('COUNT', sequelize.col('ratings.id')), 'ratingCount']
//                 ]
//             },
//             group: ['Product.id']
//         });

//         res.json({
//             data: rows,
//             pagination: {
//                 currentPage: page,
//                 totalPages: Math.ceil(count.length / limit),
//                 totalProducts: count.length
//             }
//         });
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ message: 'Error performing search' });
//     }
// };
