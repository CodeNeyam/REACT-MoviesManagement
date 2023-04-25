import "./MoviesManagement.css";

const PaginationAcc = ({
  itemsPerPage,
  totalItems,
  currentPage,
  handlePageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-link btn-pagination ${
            number === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default PaginationAcc;
