import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout } from "../components/common";

import AuthorCard from "../components/AuthorCard";

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
const Writers = ({ data }) => {
  //console.log(data.allGhostAuthor.edges);
  var authors = data.allGhostAuthor.edges;
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="w-100 md:w-3/4">
            <div className="flex flex-col justify-center mb-5 text-center m-4 font-bold text-4xl">
              Writers
            </div>
            {authors.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <AuthorCard key={node.id} author={node} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

Writers.propTypes = {
  data: PropTypes.shape({
    allGhostAuthor: PropTypes.shape({
      edges: PropTypes.object.isRequired,
    }),
  }).isRequired,
};

export default Writers;

export const pageQuery = graphql`
  query MyQuery {
    allGhostAuthor(
      sort: { order: DESC, fields: postCount }
      filter: { slug: { ne: "reelopinions" } }
    ) {
      edges {
        node {
          id
          bio
          facebook
          location
          name
          profile_image
          slug
          twitter
          url
          website
        }
      }
    }
  }
`;
