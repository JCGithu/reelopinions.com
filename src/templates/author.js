import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

import AuthorCard from "../components/AuthorCard";

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
const Author = ({ data, location, pageContext }) => {
  const author = data.ghostAuthor;
  const posts = data.allGhostPost.edges;
  const twitterUrl = author.twitter
    ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = author.facebook
    ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
    : null;

  return (
    <>
      <MetaData data={data} location={location} type="profile" />
      <Layout>
        <div className="flex justify-center ">
          <div className="w-100 md:w-3/4 lg:w-2/3">
            <div className="flex flex-col justify-center mb-5">
              <header className="author-header m-5">
                <AuthorCard author={author} left={false} />
              </header>
              <section className="w-full grid grid-cols-1 grid-rows-9 md:grid-cols-12 md:grid-rows-8">
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
        </div>
      </Layout>
    </>
  );
};

Author.propTypes = {
  data: PropTypes.shape({
    ghostAuthor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cover_image: PropTypes.string,
      profile_image: PropTypes.string,
      website: PropTypes.string,
      bio: PropTypes.string,
      location: PropTypes.string,
      facebook: PropTypes.string,
      twitter: PropTypes.string,
    }),
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Author;

export const pageQuery = graphql`
  query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...GhostAuthorFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
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
