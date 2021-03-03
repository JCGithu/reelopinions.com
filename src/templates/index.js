import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  const posts = data.post.edges;
  const features = data.featured.edges;
  const website = data.site.edges[0].node;
  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="flex flex-col items-center ">
          {pageContext.pageNumber === 0 && (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex justify-center z-10">
                <img
                  className="h-14 m-4"
                  src={website.logo}
                  alt="Reel Opinions"
                />
              </div>
              <div className="lg:w-3/4 w-10/12 pb-4 pt-2 z-10">
                {features.map(({ node }, index) => (
                  // The tag below includes the markup for each post - components/common/PostCard.js
                  <PostCard
                    key={node.id}
                    feature={true}
                    banner={true}
                    post={node}
                    index={index}
                  />
                ))}
              </div>
              <img
                src="/images/icons/blob.svg"
                className="absolute z-0 blob w-full top-0 slide-bottom pointer-events-none "
              ></img>
            </div>
          )}
          {pageContext.pageNumber === 0 && (
            <div className="lg:w-3/4 w-10/12 justify-center">
              <h1
                id="latest"
                className="font-bold text-ro text-3xl font-quote pb-3 pt-4 text-center"
              >
                Latest Articles
              </h1>
              <hr className="h-1 bg-ro-black"></hr>
            </div>
          )}

          <section className="lg:w-3/4 w-10/12 grid grid-cols-1 grid-rows-9 md:grid-cols-12 md:grid-rows-8">
            {posts.map(({ node }, index) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostCard
                key={node.id}
                feature={true}
                post={node}
                index={index}
              />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.object.isRequired,
    featured: PropTypes.object.isRequired,
    site: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.object,
        })
      ),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    post: allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          primary_tag {
            slug
            name
          }
          title
          url
          custom_excerpt
          excerpt
          feature_image
          featured
          slug
        }
      }
    }
    featured: allGhostPost(
      limit: 1
      filter: { featured: { eq: true } }
      sort: { order: DESC, fields: [published_at] }
    ) {
      edges {
        node {
          id
          primary_tag {
            slug
            name
          }
          title
          url
          custom_excerpt
          excerpt
          feature_image
          featured
          slug
        }
      }
    }
    site: allGhostSettings {
      edges {
        node {
          logo
          cover_image
        }
      }
    }
  }
`;
