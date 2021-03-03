import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostCard = ({ post, feature, banner, index }) => {
  const url = `/${post.slug}/`;
  var settings = [];
  let bannerPic = "";
  let bannerBox = "";
  if (banner) {
    bannerPic = "overflow-hidden xl:w-screen 2xl:h-120 lg:rounded-xl";
    bannerBox = "lg:rounded-xl overflow-hidden card-effect";
  }
  var placeSet = "";
  if (feature) {
    settings = [
      "md:col-span-8 md:row-span-1",
      "md:col-span-4 md:row-span-1 md:col-start-9 md:row-start-1",
      "md:col-span-4 md:row-span-1 md:col-start-1 md:row-start-2",
      "md:col-span-4 md:col-start-5 md:row-start-2",
      "md:col-span-4 md:col-start-9 md:row-start-2",
      "md:col-span-3 md:col-start-1 md:row-start-3",
      "md:col-span-3 md:col-start-4 md:row-start-3",
      "md:col-span-3 md:col-start-7 md:row-start-3",
      "md:col-span-3 md:col-start-10 md:row-start-3",
      "md:col-span-6 md:col-start-1 md:row-start-4",
      "md:col-span-6 md:col-start-7 md:row-start-4",
      "md:col-span-12 md:col-start-1 md:row-start-5",
      "md:col-span-4 md:col-start-1 md:row-start-6",
      "md:col-span-4 md:col-start-5 md:row-start-6",
      "md:col-span-4 md:col-start-9 md:row-start-6",
    ];
    placeSet = settings[index];
    return (
      <div
        className={`col-span-1 row-span-1 col-start-1 row-start-${
          index + 1
        } ${placeSet} ${
          index === 11 && "flex items-center justify-center"
        } ${bannerBox}`}
      >
        <div
          className={`p-2 relative ${
            index === 11 &&
            "grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 md:w-4/6 w-full bg-gray-200 md:rounded-xl rounded-none"
          }`}
        >
          <header>
            <div className="w-full items-center relative flex rounded object-cover">
              <Link to={url}>
                <img
                  className={`object-cover h-48 w-full min-w-full rounded ${
                    index <= 1 && "md:h-96"
                  } ${index === 0 && `${bannerPic}`}`}
                  src={`${post.feature_image}`}
                ></img>
              </Link>
              {index <= 1 && (
                <div className="absolute w-full rounded bottom-0 bg-gradient-to-t from-ro-black">
                  <div className="px-5 md:px-3 flex flex-row py-1">
                    {post.featured && (
                      <div className="text-xs text-ro-white bg-ro-red text-center font-bold rounded-md w-100 px-2">
                        Featured
                      </div>
                    )}
                  </div>
                  <Link to={url}>
                    {index === 0 ? (
                      <h1 className="pb-1 px-5 md:px-3 h-100 w-full text-ro-white font-bold xl:text-4xl text-2xl leading-snug">
                        {post.title}
                      </h1>
                    ) : (
                      <h1 className="pb-1 px-5 md:px-3 h-100 w-full text-ro-white font-bold xl:text-xl text-md leading-snug">
                        {post.title}
                      </h1>
                    )}
                    <section className="pb-3 px-5 md:px-3 text-sm text-ro-white pb-2">
                      {post.excerpt}
                    </section>
                  </Link>
                </div>
              )}
            </div>
          </header>
          <div>
            {index > 1 && (
              <div className={`${index === 11 && "mx-3"}`}>
                <div className="flex flex-row py-1">
                  {post.primary_tag && (
                    <div className="text-xs text-ro-lblue font-bold rounded-md w-100 pr-2 mr-1">
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
                <Link to={url}>
                  <h2 id="ignore" className="font-bold text-xl">
                    {post.title}
                  </h2>
                  <section className="text-sm pb-2">{post.excerpt}</section>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    settings = [
      "md:col-span-4 md:col-start-1 md:row-start-1",
      "md:col-span-4 md:col-start-5 md:row-start-1",
      "md:col-span-4 md:col-start-9 md:row-start-1",
      "md:col-span-4 md:col-start-1 md:row-start-2",
      "md:col-span-4 md:col-start-5 md:row-start-2",
      "md:col-span-4 md:col-start-9 md:row-start-2",
      "md:col-span-4 md:col-start-1 md:row-start-3",
      "md:col-span-4 md:col-start-5 md:row-start-3",
      "md:col-span-4 md:col-start-9 md:row-start-3",
      "md:col-span-4 md:col-start-1 md:row-start-4",
      "md:col-span-4 md:col-start-5 md:row-start-4",
      "md:col-span-4 md:col-start-9 md:row-start-4",
      "md:col-span-4 md:col-start-1 md:row-start-5",
      "md:col-span-4 md:col-start-5 md:row-start-5",
      "md:col-span-4 md:col-start-9 md:row-start-5",
    ];
    placeSet = settings[index];
    return (
      <div
        className={`col-span-1 row-span-1 col-start-1 row-start-${
          index + 1
        } ${placeSet}`}
      >
        <div className="p-2 relative">
          <Link to={url}>
            <header>
              <div className="w-full items-center relative flex rounded object-cover">
                <img
                  className="object-cover h-48 w-full rounded"
                  src={`${post.feature_image}`}
                ></img>
              </div>
            </header>
          </Link>
          <div>
            <div>
              <div className="flex flex-row py-1">
                {post.primary_tag && (
                  <div className="text-xs text-ro-lblue font-bold rounded-md w-100 pr-2 mr-1">
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
              <Link to={url}>
                <h2 id="ignore" className="font-bold text-xl">
                  {post.title}
                </h2>
                <section className="text-sm pb-2">{post.excerpt}</section>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
  }).isRequired,
  feature: PropTypes.bool,
  index: PropTypes.number,
};

export default PostCard;
