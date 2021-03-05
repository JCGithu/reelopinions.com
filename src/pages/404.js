import React from "react";
import { Link } from "gatsby";
import { Layout } from "../components/common";

const NotFoundPage = () => (
  <Layout>
    <div className="container">
      <article className="content" style={{ textAlign: `center` }}>
        <h1 className="pt-12 text-6xl font-bold text-ro-red">Error 404</h1>
        <section className="">Page not found</section>
        <section className="text-sm">
          Note to self: Insert funny film reference here.
        </section>
      </article>
    </div>
  </Layout>
);

export default NotFoundPage;
