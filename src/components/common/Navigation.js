import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Navigation = ({ data, navClass }) => (
  <>
    {data.map((navItem, i) => {
      if (navItem.url.match(/^\s?http(s?)/gi)) {
        return (
          <div className="px-2 topLink" key={i}>
            <a
              className={navClass}
              href={navItem.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          </div>
        );
      } else {
        return (
          <div className="px-0 md:px-2 topLink" key={i}>
            <Link className={navClass} to={navItem.url}>
              {navItem.label}
            </Link>
          </div>
        );
      }
    })}
  </>
);

Navigation.defaultProps = {
  navClass: `site-nav-item`,
};

Navigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  navClass: PropTypes.string,
};

export default Navigation;
