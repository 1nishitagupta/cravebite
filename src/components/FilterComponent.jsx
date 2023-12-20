/* eslint-disable react/prop-types */
const FilterComponent = ({ onFilterChange }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <label className="mr-2 whitespace-nowrap">Sort By:</label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="default">Default</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        {/* Add more sorting options as needed */}
      </select>
    </div>
  );
};

export default FilterComponent;
