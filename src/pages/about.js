import React from "react";
import PropTypes from "prop-types";

import { Layout } from "../components/common";

const Contact = () => {
  console.log("contact");
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 p-5 items-center">
            <div>
              <img src="/images/logoBlack.svg" className="w-1/4 py-5"></img>
              <p className="font-quote text-xl py-1 leading-10 select-red">
                Reel Opinions is a UK based media outlet. <br />
                We cover TV, Film, and Videogames here and over on our YouTube
                channel.
                <br />
                We have two podcast series <i>
                  'The Reel Opinions Podcast'
                </i>{" "}
                and <i>'Backstory Scripts'.</i>
                <br />
                You can reach us via email at:
                <br />
                <i>
                  <b>
                    contact@reelopinions.com
                    <br />
                    editor@reelopinions.com
                  </b>
                </i>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

Contact.propTypes = {};

export default Contact;
