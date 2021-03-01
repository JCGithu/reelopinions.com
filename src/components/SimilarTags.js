import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import PostCard from "./common/PostCard";

const SimilarTags = ({ tag }) => {
  console.log("Similar Tag Module loaded");
  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-3 md:grid-cols-12 md:grid-rows-1">
      {tag.map(({ node }, index) => (
        // The tag below includes the markup for each post - components/common/PostCard.js
        <PostCard key={node.id} feature={false} post={node} index={index} />
      ))}
    </div>
  );
};

SimilarTags.propTypes = {
  tag: PropTypes.array,
};

export default SimilarTags;
