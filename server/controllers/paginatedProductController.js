import Product from "../models/productModel.js";
import Event from "../models/eventModel.js";

export const getPaginatedProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 8,
      minPrice,
      maxPrice,
      minDate,
      maxDate,
    } = req.query;
    page = Math.max(Number(page), 1);
    limit = Math.max(Number(limit), 1);
    const offset = (page - 1) * limit;

    let products = await Product.findAll();

    const events = await Event.findAll({
      where: {
        type_id: 1, // 'created' event type
        target_id: 2, // Produktų įvykiai
      },
    });

    const productsWithTimestamps = products.map((product) => {
      const productEvents = events.filter(
        (event) =>
          event.user_id === product.user_id && event.product_id === product.id
      );

      const latestEvent = productEvents.length
        ? productEvents.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )[0]
        : null;

      if (!latestEvent) {
      }

      return {
        ...product.toJSON(),
        timestamp: latestEvent ? latestEvent.timestamp : null,
      };
    });

    if (minPrice || maxPrice) {
      products = await filterItemsByRange(
        minPrice,
        maxPrice,
        productsWithTimestamps,
        limit,
        offset,
        "price"
      );
    }

    if (minDate || maxDate) {
      products = await filterItemsByRange(
        minDate,
        maxDate,
        productsWithTimestamps,
        limit,
        offset,
        "date"
      );
    }

    if (!minPrice && !maxPrice && !minDate && !maxDate) {
      products = await Product.findAll({
        limit: Number(limit),
        offset: Number(offset),
      });
    }

    const totalProducts = await Product.count();

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
    });
  } catch (error) {
    console.error(`(10) Error fetching products:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const filterItemsByRange = async (
  minValue,
  maxValue,
  items,
  limit,
  offset,
  value = "price"
) => {
  if (!minValue || !maxValue) return items.slice(offset, offset + limit);

  const filteredItems = items.filter((item) => {
    let itemValue;

    if (value === "date") {
      itemValue = new Date(item.timestamp).getTime();
    } else {
      itemValue = parseFloat(item[value]);
    }

    const inRange =
      itemValue >=
        (value === "date"
          ? new Date(minValue).getTime()
          : parseFloat(minValue)) &&
      itemValue <=
        (value === "date"
          ? new Date(maxValue).getTime()
          : parseFloat(maxValue));

    if (!inRange) {
    }

    return inRange;
  });

  return filteredItems.slice(offset, offset + limit);
};
