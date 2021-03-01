import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
  const tag = data.ghostTag;
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData data={data} location={location} type="series" />
      <Layout>
        <div>
          <header className="w-100 bg-gray-200 p-10 flex justify-center">
            <div className="w-3/4">
              <h1 className="text-ro-red text-4xl font-bold">{tag.name}</h1>
              {tag.description ? (
                <p className="text-ro-black">{tag.description}</p>
              ) : null}
            </div>
          </header>
          <div className="flex flex-col items-center">
            <section className="w-2/3 grid grid-cols-1 grid-rows-9 md:grid-cols-12 md:grid-rows-8">
              {posts.map(({ node }, index) => (
                // The tag below includes the markup for each post - components/common/PostCard.js
                <PostCard
                  key={node.id}
                  post={node}
                  feature={false}
                  index={index}
                />
              ))}
            </section>
            <Pagination pageContext={pageContext} />
          </div>
        </div>
      </Layout>
    </>
  );
};

Tag.propTypes = {
  data: PropTypes.shape({
    ghostTag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Tag;

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
