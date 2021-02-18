import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const AuthorCard = ({ post }) => {
  const url = `/${post.slug}/`;

  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 w-10/12 grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-2 items-center rounded self-center px-8 py-4 shadow-lg">
        <div className="md:col-span-2 col-start-1 row-start-2 md:row-start-1 col-span-1">
          <Link
            to={`/author/${post.primary_author.slug}`}
            rel={post.primary_author.name}
          >
            <h1 className="text-2xl font-bold text-center md:text-left text-ro-black">
              {post.primary_author.name}
            </h1>
          </Link>
          {post.primary_author.bio && (
            <div className="font-quote md:text-l text-sm text-center md:text-left text-ro-dblue">
              <p>{post.primary_author.bio}</p>
            </div>
          )}
          <div className="flex flex-row items-center justify-center md:justify-start">
            {post.primary_author.twitter && (
              <a
                className="text-sm text-white"
                href={`https://twitter.com/${post.primary_author.twitter.substring(
                  1
                )}`}
              >
                <img
                  className="w-5 h-5 mr-1 my-1 white-fill"
                  src="/images/icons/twitter-fill.svg"
                  alt="Twitter"
                />
              </a>
            )}
            {post.primary_author.website && (
              <a href={`${post.primary_author.website}`}>
                <img
                  className="w-5 h-5 mr-1 my-1 white-fill"
                  src="/images/icons/link.svg"
                  alt="Website"
                />
              </a>
            )}
          </div>
        </div>
        <div className="col-span-1 md:col-start-3 col-start-1 row-start-1 flex items-center justify-center">
          <div className="w-32 rounded-full overflow-hidden">
            <img
              src={post.primary_author.profile_image}
              className="object-cover w-full h-24 md:h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AuthorCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default AuthorCard;
