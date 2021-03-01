import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

import "@fontsource/newsreader/400.css";
import AuthorCard from "../components/AuthorCard";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost;
  console.log(post.primary_author);

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
                  <div className="font-quote text-3xl m-2 py-2 px-1 text-ro-dark">
                    <p>{post.excerpt}</p>
                  </div>
                )}
                <div className="w-full h-1 bg-ro-dark my-3"></div>
                <div className="flex flex-row items-center">
                  <p className="text-ro-red">
                    By{" "}
                    <Link
                      to={`/author/${post.primary_author.slug}`}
                      rel={post.primary_author.name}
                    >
                      <b>{post.primary_author.name}</b>{" "}
                    </Link>
                    <i className="text-xs">{post.updated_at_pretty}</i>
                  </p>
                </div>
                {/* The main post content */}
                <section
                  className="load-external-scripts py-8 youtube-embed"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {/* Author Card */}
                <AuthorCard post={post} />
              </div>
            </section>
          </article>
        </div>
        <div className="w-100 bg-ro-black h-24 p-4 text-ro-white flex justify-center">
          <div className="w-3/4">More articles in {post.primary_tag.name}</div>
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
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;