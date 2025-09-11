import React from "react";

type FiltersProps = {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string[];
    category?: string;
  }) => void;
};

// Sample tags and categories - adjust as needed or fetch dynamically
const availableTags = ["New", "Sale", "Popular", "Limited"];
const availableCategories = [
  "All",
  "Clothing",
  "Electronics",
  "Shoes",
  "Accessories",
];

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string>("All");

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  React.useEffect(() => {
    onFilterChange({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      color: color || undefined,
      tags: tags.length > 0 ? tags : undefined,
      category: category !== "All" ? category : undefined,
    });
  }, [minPrice, maxPrice, color, tags, category, onFilterChange]);

  return (
    <aside>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          min={0}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          placeholder="0"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          placeholder="1000"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Color</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All Colors</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <p className="mb-1 font-medium text-gray-700">Tags</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 text-gray-700"
              }`}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
