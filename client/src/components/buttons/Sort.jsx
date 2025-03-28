import { useState } from "react";

const Sort = () => {
  const [showTools, setShowTools] = useState(false);

  const handleSort = async (sort, order) => {
    try {
      const query = new URLSearchParams({ sort, order }).toString();
      const response = await fetch(
        `http://localhost:3000/products/sorted?${query}`
      );
      const data = await response.json();

      window.dispatchEvent(
        new CustomEvent("sortedProducts", {
          detail: data.products || [],
        })
      );
    } catch (err) {
      console.error("Klaida gaunant produktus:", err);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowTools(!showTools)}
        className="px-3 py-1 bg-blue-800 hover:bg-blue-900 text-white rounded"
      >
        Tools
      </button>

      {showTools && (
        <div className="mt-3 border border-gray-800 bg-[#181C25] rounded p-4 text-white w-[7cm]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold">Rūšiuoti:</p>
            <select
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                handleSort(field, order);
              }}
              className="bg-[#1f2937] text-white border border-gray-600 rounded px-3 py-2 w-[4cm]"
            >
              <option disabled selected>
                Pasirinkite rūšiavimą
              </option>
              <option value="price-asc">Kaina ↑</option>
              <option value="price-desc">Kaina ↓</option>
              <option value="createdAt-asc">Naujausi produktai</option>
              <option value="createdAt-desc">Seniausi produktai</option>
              <option value="avgRating-desc">Reitingas ↓</option>
              <option value="avgRating-asc">Reitingas ↑</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
