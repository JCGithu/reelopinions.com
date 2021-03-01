import React from "react";
import PropTypes from "prop-types";

import { Layout } from "../components/common";

const Contact = () => {
  console.log("contact");
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="w-100 md:w-3/4">Contact</div>
        </div>
      </Layout>
    </>
  );
};

Contact.propTypes = {};

export default Contact;
