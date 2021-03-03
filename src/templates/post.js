import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

import "@fontsource/newsreader/400.css";
import AuthorCard from "../components/AuthorCard";
import SimilarTags from "../components/SimilarTags";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost;
  const tags = post.tags;
  const relTag = data.allGhostPost.edges;

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout postTitle={post.title}>
        <div className="relative aspect-w-5 aspect-h-2 overflow-hidden">
          {post.feature_image ? (
            <figure className="">
              <img
                className="object-cover w-full h-full"
                src={post.feature_image}
                alt={post.title}
              />
            </figure>
          ) : null}
          <div className="">
            <h1 className="absolute py-10 px-12 md:px-24 bottom-0 bg-gradient-to-t from-ro-black h-100 w-full text-ro-white font-bold xl:text-6xl text-3xl leading-snug shadow-md">
              {post.title}
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <article className="w-100 md:w-3/4">
            <section className="flex justify-center mb-5">
              <div className="w-3/4">
                {post.excerpt && (
                  <div className="font-quote text-3xl my-2 py-2 text-ro-black">
                    <p>{post.excerpt}</p>
                  </div>
                )}
                <div className="w-full h-1 bg-ro-black my-3"></div>
                <div className="flex flex-row items-center">
                  <p className="text-ro-black">
                    By{" "}
                    <Link
                      to={`/author/${post.primary_author.slug}`}
                      rel={post.primary_author.name}
                    >
                      <b className="hover:text-ro-red duration-300">
                        {post.primary_author.name}
                      </b>{" "}
                    </Link>
                    <i className="text-xs">{post.published_at_pretty}</i>
                  </p>
                </div>
                {/* The main post content */}
                <section
                  className="load-external-scripts py-8 youtube-embed"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {/* Author Card */}
                <AuthorCard author={post.primary_author} left={false} />
              </div>
            </section>
          </article>
        </div>
        <div className="w-100 bg-ro-black h-full p-4 text-ro-white flex flex-col justify-center items-center">
          <div className="w-100 md: w-3/4">
            More articles in{" "}
            <Link
              to={`/tag/${post.primary_tag.slug}`}
              rel={post.primary_tag.name}
            >
              {post.primary_tag.name}
            </Link>
            <SimilarTags tag={relTag}></SimilarTags>
            <div>Other tags</div>
            <div className="flex flex-row">
              {tags.map(({ tag }, index) => (
                <Link
                  to={`/tag/${tags[index].slug}`}
                  rel={tags[index].slug}
                  key={`${tags[index].slug}${index}`}
                >
                  <p className="font-bold text-ro-red hover:text-ro-white duration-500 mr-2">
                    {tags[index].name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      excerpt: PropTypes.string,
      primary_author: PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
      }),
      primary_tag: PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
      }),
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
        })
      ),
      updated_at_pretty: PropTypes.string,
      published_at_pretty: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!, $tag: String) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
    allGhostPost(
      limit: 3
      filter: { tags: { elemMatch: { slug: { eq: $tag } } } }
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
  }
`;
