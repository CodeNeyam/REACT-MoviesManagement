import "./MoviesManagement.css";
const Pagination = ({
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
    <tfoot>
      <tr>
        <td colSpan="3">
          <div className="pagination-container">
            {pageNumbers.map((number) => (
              <button
                key={number}
                className="pagination-link btn-pagination"
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default Pagination;
