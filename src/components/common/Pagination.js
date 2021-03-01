import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext;

  return (
    <nav
      className="pagination grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 items-center rounded p-2 my-2 text-sm"
      role="navigation"
    >
      <div>
        {previousPagePath && (
          <Link
            to={previousPagePath}
            rel="prev"
            className="bg-ro-black text-ro-white text-center items-center hover:bg-ro duration-300 rounded py-1 px-3 m-2"
          >
            Previous
          </Link>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className="pagination-location font-bold py-1 text-center">
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div>
        {nextPagePath && (
          <Link
            to={nextPagePath}
            rel="next"
            className="bg-ro-black text-ro-white rounded text-center items-center py-1 px-3 m-2 hover:bg-ro duration-300"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Pagination;
