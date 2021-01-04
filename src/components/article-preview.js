import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./article-preview.module.css";

export default ({ article, className = "", withDescription = true }) => (
  <div className={`${styles.preview} ${className}`}>
    <Link to={`/blog/${article.slug}`}>
      <div
        className="overflow-hidden"
        style={className ? {} : { maxHeight: 196, maxWidth: 350 }}
      >
        <Img
          alt={article.slug}
          className="transition-all delay-75 transform hover:scale-110 bg-fixed"
          fluid={article.heroImage.fluid}
        />
      </div>
    </Link>
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    {withDescription && (
      <>
        <small>{article.publishDate}</small>
        <p
          dangerouslySetInnerHTML={{
            __html: article.description.childMarkdownRemark.html,
          }}
        />
      </>
    )}
  </div>
);
