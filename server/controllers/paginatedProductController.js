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

    // Gauname visus produktus
    let products = await Product.findAll();

    const events = await Event.findAll({
      where: {
        type_id: 1, // 'created' event type
        target_id: 2, // Produktų įvykiai
      },
    });

    let productsWithTimestamps = products.map((product) => {
      const productEvents = events.filter(
        (event) =>
          event.user_id === product.user_id && event.product_id === product.id
      );
      const latestEvent = productEvents.length
        ? productEvents.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )[0]
        : null;
      return {
        ...product.toJSON(),
        timestamp: latestEvent ? latestEvent.timestamp : null,
      };
    });

    // Filtruojame visus produktus be puslapiavimo, kad gautume bendrą skaičių
    let allFilteredProducts = productsWithTimestamps;

    if (minPrice || maxPrice) {
      allFilteredProducts = await filterItemsByRange(
        minPrice,
        maxPrice,
        allFilteredProducts,
        null, // Be limit
        null, // Be offset
        "price"
      );
    }

    if (minDate || maxDate) {
      allFilteredProducts = await filterItemsByRange(
        minDate,
        maxDate,
        allFilteredProducts,
        null, // Be limit
        null, // Be offset
        "date"
      );
    }

    // Apskaičiuojame bendrą filtruotų produktų skaičių ir puslapių skaičių
    const totalProducts = allFilteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    // Taikome puslapiavimą tik po filtravimo
    let paginatedProducts = allFilteredProducts;
    if (minPrice || maxPrice || minDate || maxDate) {
      paginatedProducts = allFilteredProducts.slice(offset, offset + limit);
    } else {
      paginatedProducts = await Product.findAll({
        limit: Number(limit),
        offset: Number(offset),
      });
    }

    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: Number(page),
        totalPages: totalPages,
        totalProducts: totalProducts,
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
  const filteredItems = items.filter((item) => {
    let itemValue =
      value === "date"
        ? new Date(item.timestamp).getTime()
        : parseFloat(item[value]);
    const inRange =
      (!minValue || itemValue >= (value === "date" ? new Date(minValue).getTime() : parseFloat(minValue))) &&
      (!maxValue || itemValue <= (value === "date" ? new Date(maxValue).getTime() : parseFloat(maxValue)));
    return inRange;
  });

  if (limit !== null && offset !== null) {
    return filteredItems.slice(offset, offset + limit);
  }
  return filteredItems;
};