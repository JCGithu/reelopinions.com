import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const AuthorCard = ({ author, left }) => {
  console.log(author);
  //const url = `/${author.slug}/`;
  if (!left) {
    left = false;
  }

  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 w-10/12 grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-2 items-center rounded self-center px-8 py-4 shadow-lg">
        <div
          className={`md:col-span-2 col-start-1 row-start-2 md:row-start-1 col-span-1 ${
            left ? "md:col-start-2" : "col-start-1 md:px-20"
          }`}
        >
          <Link to={`/author/${author.slug}`} rel={author.name}>
            <div className="flex flex-row items-end">
              <h1 className="text-2xl font-bold text-center md:text-left text-ro-black">
                {author.name}
              </h1>
              {author.location && (
                <div className="text-xs font-thin p-1">({author.location})</div>
              )}
            </div>
          </Link>
          {author.bio && (
            <div className="font-quote md:text-l text-sm text-center md:text-left text-ro-dblue">
              <p>{author.bio}</p>
            </div>
          )}
          {author.postCount && (
            <p className="text-xs">{author.postCount} Posts</p>
          )}
          <div className="flex flex-row items-center justify-center md:justify-start">
            {author.twitter && (
              <a
                className="text-sm text-white"
                href={`https://twitter.com/${author.twitter.substring(1)}`}
              >
                <img
                  className="w-5 h-5 mr-1 my-1 white-fill"
                  src="/images/icons/twitter-fill.svg"
                  alt="Twitter"
                />
              </a>
            )}
            {author.website && (
              <a href={`${author.website}`}>
                <img
                  className="w-5 h-5 mr-1 my-1 white-fill"
                  src="/images/icons/link.svg"
                  alt="Website"
                />
              </a>
            )}
          </div>
        </div>
        <div
          className={`col-span-1 col-start-1 row-start-1 flex items-center justify-center ${
            left ? "md:col-start-1" : "md:col-start-3"
          }`}
        >
          <div className="w-32 rounded-full overflow-hidden">
            <img
              src={author.profile_image}
              className="object-cover w-full h-24 md:h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AuthorCard.propTypes = {
  author: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  left: PropTypes.bool,
};

export default AuthorCard;
