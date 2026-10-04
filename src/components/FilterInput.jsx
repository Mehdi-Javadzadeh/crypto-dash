const FilterInput = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        placeholder="Filter Coins by Name or Symbol"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
