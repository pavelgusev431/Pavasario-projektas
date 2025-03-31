import { useState } from "react";

const Sort = () => {
  const [showTools, setShowTools] = useState(false);
  const [sortValue, setSortValue] = useState("");

  const handleSort = async (sort, order) => {
    try {
      const query = new URLSearchParams({ sort, order }).toString();
      const response = await fetch(`http://localhost:3000/products/sorted?${query}`);
      const data = await response.json();

      if (!Array.isArray(data.products)) {
        throw new Error("❌ Serverio atsakyme nėra produktų masyvo");
      }

      window.dispatchEvent(
        new CustomEvent("sortedProducts", {
          detail: data.products,
        })
      );
    } catch (err) {
      console.error("❌ Rūšiavimo klaida:", err.message);
    }
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    setSortValue(selected);

    const [field, order] = selected.split("-");
    handleSort(field, order);
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
        <div className="mt-3 border border-gray-800 bg-[#181C25] rounded p-4 text-white w-[8cm]">
          <div className="flex items-center justify-between gap-4 max-w-0">
            <p className="text-sm font-semibold">Rūšiuoti:</p>
            <select
              value={sortValue}
              onChange={handleChange}
              className="bg-[#1f2937] text-white border border-gray-600 rounded px-3 py-2 w-[5cm]"
            >
              <option value="" disabled>Pasirinkite rūšiavimą</option>
              <option value="price-asc">Kaina ↑</option>
              <option value="price-desc">Kaina ↓</option>
              <option value="createdAt-desc">Naujausi produktai</option>
              <option value="createdAt-asc">Seniausi produktai</option>
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
