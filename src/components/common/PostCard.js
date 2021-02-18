import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const readingTime = readingTimeHelper(post);
  console.log(post);

  return (
    <Link to={url} className="post-card">
      <div className="p-2 relative h-full">
        <header className="post-card-header">
          {post.feature_image && (
            <div className="h-32 w-9/10 items-center flex rounded object-cover">
              <img
                className="object-cover w-full h-32 rounded"
                src={`${post.feature_image}`}
              ></img>
            </div>
          )}
          <div className="flex flex-row py-1">
            {post.primary_tag && (
              <div
                key={post.primary_tag.slug}
                className="text-xs text-ro-lblue font-bold rounded-md w-100 pr-2 mr-1"
              >
                <Link
                  to={`/tag/${post.primary_tag.slug}`}
                  rel={post.primary_tag.name}
                >
                  {post.primary_tag.name}
                </Link>
              </div>
            )}
            {post.featured && (
              <div className="text-xs text-ro-red font-bold rounded-md w-100 pr-2">
                Featured
              </div>
            )}
          </div>
          <h2 className="font-bold text-xl">{post.title}</h2>
        </header>
        <section className="text-sm pb-2">{post.excerpt}</section>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
