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
      className="pagination grid grid-rows-1 grid-cols-2 items-center p-1 my-2 font-bold"
      role="navigation"
    >
      <div>
        {previousPagePath && (
          <Link
            to={previousPagePath}
            rel="prev"
            className="bg-ro-black text-ro-white text-center items-center hover:bg-ro-red  duration-300 rounded py-1 px-3 m-2"
          >
            {"🡄"}
          </Link>
        )}
      </div>
      <div>
        {nextPagePath && (
          <Link
            to={nextPagePath}
            rel="next"
            className="bg-ro-black text-ro-white rounded text-center items-center py-1 px-3 m-2 hover:bg-ro-red duration-300"
          >
            {"🡆"}
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
