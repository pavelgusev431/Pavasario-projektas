import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import ProductCard from "../ProductCard";
import Tools from "../Tools";
import BackToTopButton from "../buttons/BackToTopButton";
import Sort from "../Sort";
import { searchProducts } from "../../helpers/searchProducts";
import getSearchRegex from "../../helpers/getSearchRegex";

export default function SearchedProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageSize, setPageSize] = useState(12);

  const [dateRange, setDateRange] = useState(() => {
    try {
        const savedDateRange = JSON.parse(
            localStorage.getItem('dateRange')
        );
        return savedDateRange
            ? savedDateRange
            : [
                  new Date('2024-01-01').getTime(),
                  new Date().setDate(new Date().getDate() + 1),
              ];
    } catch {
        return [
            new Date('2024-01-01').getTime(),
            new Date().setDate(new Date().getDate() + 1),
        ];
    }
});

  const [priceRange, setPriceRange] = useState(() => {
    try {
        const savedPriceRange = JSON.parse(
            localStorage.getItem('priceRange')
        );
        return savedPriceRange ? savedPriceRange : [0, 5000];
    } catch {
        return [0, 5000];
    }
});

//   const [sortValue, setSortValue] = useState("timestamp-desc");

  const [sortValue, setSortValue] = useState(() => {
    const savedSortValue = localStorage.getItem('sortValue');
    const validSortValues = [
        'timestamp-asc',
        'timestamp-desc',
        'price-asc',
        'price-desc',
        'avgRating-asc',
        'avgRating-desc',
        'name-asc',
        'name-desc',
    ];
    return validSortValues.includes(savedSortValue)
        ? savedSortValue
        : 'timestamp-desc';
});

  // Zalgo regex
  const [zalgoRegex, setZalgoRegex] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.trim().toLowerCase();

  // fetch Zalgo rules once
  useEffect(() => {
    getSearchRegex()
      .then((res) => res.zalgoRegex && setZalgoRegex(new RegExp(res.zalgoRegex)))
      .catch(() => {});
  }, []);

  // the main fetch function, debounced
  const fetchResults = useCallback(
    debounce(async (page = 1) => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const [sort, order] = sortValue.split("-");
    const { products: pageItems, pagination } = await searchProducts(
           query,
           {
             page,
             limit: pageSize,
             minPrice: priceRange[0],
             maxPrice: priceRange[1],
             // re‑enable date filtering if you want:
             minDate: new Date(dateRange[0]).toISOString().slice(0,10),
             maxDate: new Date(dateRange[1]).toISOString().slice(0,10),
             sort,
             order: order.toUpperCase(),
           }
         );
         setProducts(pageItems);
         setPagination(pagination);

      } catch (err) {
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    }, 250),
    [query, pageSize, priceRange, dateRange, sortValue]
  );

  // validate & trigger initial fetch
  useEffect(() => {
    if (!query) return setProducts([]);

    const invalid =
      query.length < 3 ||
      query.length > 30 ||
      !/^[a-zA-Z0-9 ]+$/.test(query) ||
      (zalgoRegex && zalgoRegex.test(query));

    if (invalid) {
      toast.error("Invalid search term");
      navigate("*");
    } else {
      fetchResults(1);
    }

    return () => fetchResults.cancel();
  }, [query, zalgoRegex, fetchResults, navigate]);

  // on page change
  useEffect(() => {
    fetchResults(pagination.currentPage);
  }, [pagination.currentPage, fetchResults]);

  // UI handlers
  const handlePageChange = (n) =>
    setPagination((p) => ({ ...p, currentPage: n }));

  const handlePageSizeChange = (e) => {
    setPageSize(+e.target.value);
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };
  const handleSortChange = (val) => {
    setSortValue(val);
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setDateRange([
      new Date("2024-01-01").getTime(),
      new Date().getTime(),
    ]);
    setSortValue("timestamp-asc");
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };


  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
      ),
    [products, priceRange]
  );


  useEffect(() => {
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
    localStorage.setItem('dateRange', JSON.stringify(dateRange));
    localStorage.setItem('sortValue', sortValue);
}, [priceRange, dateRange, sortValue]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for “{query}”
      </h1>

      <Tools
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        // setPriceRange = {handlePriceRangeChange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        minDate={new Date("2024-01-01").getTime()}
        maxDate={new Date().getTime()}
        onSortChange={handleSortChange}
        sortValue={sortValue}
        resetFilters={resetFilters}
      />

      <div className="mb-4 flex items-center space-x-4">
        <label>Products per page:</label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="p-2 border rounded"
        >
          {[6, 12, 18, 24, 30].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                avgRating={p.avgRating}
                ratingCount={p.ratingCount}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        !loading && <p>No products match your filters.</p>
      )}

      <BackToTopButton />
    </div>
  );
}

