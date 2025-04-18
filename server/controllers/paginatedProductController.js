import Product from '../models/productModel.js';
import Event from '../models/eventModel.js';
import Rating from '../models/ratingModel.js';
import { Op } from 'sequelize';

export const getPaginatedProducts = async (req, res) => {
    try {
        const { minPrice, maxPrice, minDate, maxDate, sort, order } = req.query;
        console.log('working sorting query=', req.query);

        let { page = 1, limit = 8 } = req.query;
        page = Math.max(Number(page), 1);
        limit = Math.max(Number(limit), 1);
        const offset = (page - 1) * limit;

        const products = await Product.findAll();

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

        const productsWithTimestamps = products.map((product) => {
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
                ratingCount,
                avgRating,
            };
        });

        let allFilteredProducts = productsWithTimestamps;

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

        const sortedProducts = await sortHelper(
            allFilteredProducts,
            sort,
            order
        );

        const totalProducts = sortedProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);
        const paginatedProducts = sortedProducts.slice(offset, offset + limit);

        res.json({
            products: paginatedProducts,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalProducts,
            },
        });
    } catch (error) {
        console.error(`(10) Error fetching products:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const filterItemsByRange = async (
    minValue,
    maxValue,
    items,
    limit,
    offset,
    value = 'price'
) => {
    const filteredItems = items.filter((item) => {
        const itemValue =
            value === 'date'
                ? new Date(item.timestamp).getTime()
                : parseFloat(item[value]);
        const inRange =
            (!minValue ||
                itemValue >=
                    (value === 'date'
                        ? new Date(minValue).getTime()
                        : parseFloat(minValue))) &&
            (!maxValue ||
                itemValue <=
                    (value === 'date'
                        ? new Date(maxValue).getTime()
                        : parseFloat(maxValue)));
        return inRange;
    });

    if (limit !== null && offset !== null) {
        return filteredItems.slice(offset, offset + limit);
    }
    return filteredItems;
};

export const sortHelper = async (products, sortField, order) => {
    const allowedSortFields = ['timestamp', 'price', 'name', 'avgRating'];
    const field = allowedSortFields.includes(sortField)
        ? sortField
        : 'timestamp';

    const orderDirection = order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const processed = [...products];

    const defaultSort = () => {
        processed.sort((a, b) => {
            const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
            const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
            return orderDirection === 'DESC' ? dateB - dateA : dateA - dateB;
        });
    };

    if (field === 'timestamp') {
        defaultSort();
    } else if (field === 'price') {
        processed.sort((a, b) => {
            const priceA = Number(a.price);
            const priceB = Number(b.price);
            return orderDirection === 'DESC'
                ? priceB - priceA
                : priceA - priceB;
        });
    } else if (field === 'name') {
        processed.sort((a, b) =>
            orderDirection === 'DESC'
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name)
        );
    } else if (field === 'avgRating') {
        processed.sort((a, b) =>
            orderDirection === 'DESC'
                ? b.avgRating - a.avgRating
                : a.avgRating - b.avgRating
        );
    } else {
        defaultSort();
    }

    return processed;
};
