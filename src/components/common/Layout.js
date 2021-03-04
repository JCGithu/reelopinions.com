import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome, postTitle }) => {
  const site = data.allGhostSettings.edges[0].node;
  const twitterUrl = site.twitter
    ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = site.facebook
    ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
    : null;

  const [small, setSmall] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []);

  const [width, setWidth] = useState(true);
  const breakpoint = 768;

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      let isIt = width > breakpoint;
      setWidth(isIt);
    });
  }, []);

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport min-h-screen flex flex-col">
        <header className="w-full z-20 sticky top-0 flex flex-none justify-center bg-ro-black shadow-md">
          <div className="w-all md:w-3/4 h-12 flex justify-center md:flex-row">
            <div
              id="icon"
              className="w-full flex justify-center md:w-1/3 lg:w-1/6 h-12 items-center"
            >
              <Link to="/">
                {site.logo ? (
                  <img
                    className="object-contain p-2 h-12"
                    src={site.logo}
                    alt={site.title}
                  />
                ) : (
                  <Img
                    fixed={data.file.childImageSharp.fixed}
                    alt={site.title}
                  />
                )}
              </Link>
            </div>
            <div
              id="nav"
              className="justify-self-center items-start h-12 flex flex-row text-white w-0 invisible lg:w-2/3 md:w-4/6 md:visible"
            >
              {small ? (
                <div className="flex flex-row h-0 md:h-12 items-center">
                  {postTitle ? (
                    <p className="slide-in">{postTitle}</p>
                  ) : (
                    <div>
                      {width && (
                        <nav className="flex flex-row h-0 md:h-12 items-center">
                          <Navigation data={site.navigation} />
                        </nav>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {width && (
                    <nav className="flex flex-row h-0 md:h-12 items-center">
                      <Navigation data={site.navigation} />
                    </nav>
                  )}
                </div>
              )}
            </div>
            <div
              id="socials"
              className="justify-self-end items-center w-0 lg:w-1/6 h-0 md:h-12 flex flex-row invisible lg:visible"
            >
              {site.twitter && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    className="w-5 mr-2"
                    src="/images/icons/twitter.svg"
                    alt="Twitter"
                  />
                </a>
              )}
              {site.facebook && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    className="w-5 mr-2"
                    src="/images/icons/facebook.svg"
                    alt="Facebook"
                  />
                </a>
              )}
              <a
                href="https://www.youtube.com/c/reelopinions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-5 mr-2"
                  src="/images/icons/youtube.svg"
                  alt="YouTube"
                />
              </a>
              <a
                href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-5 mr-2"
                  src="/images/icons/rss.svg"
                  alt="RSS Feed"
                />
              </a>
            </div>
          </div>
        </header>
        <div className="viewport-top flex-grow bg-ro-white2">
          {/* The main header section on top of the screen */}
          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>
        </div>
        <div className="w-full overflow-y-hidden flex-none">
          {/* The footer at the very bottom of the screen */}
          <footer className="w-full bg-ro-vibrantdark h-16 p-0 text-ro-white justify-center flex">
            <div className="w-full md:w-3/4 gap-2 grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2 items-center h-full">
              <div className="lg:justify-self-start justify-self-center flex flex-row items-center">
                <Navigation
                  data={site.navigation}
                  navClass="justify-self-center items-center m-2"
                />
              </div>
              <div className="lg:justify-self-end justify-self-center flex flex-row items-center">
                <Link to="/">{site.title} </Link>
                {" © 2021"}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  postTitle: PropTypes.string,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        file(relativePath: { eq: "ghost-icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
