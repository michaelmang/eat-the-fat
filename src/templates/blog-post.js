import React from "react";
import { graphql } from "gatsby";
import { Disqus } from "gatsby-plugin-disqus";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";

import ArticlePreview from "../components/article-preview";
import heroStyles from "../components/hero.module.css";
import Layout from "../components/layout";
import Logo from "../components/logo";
import Navigation from "../components/navigation";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const relatedPosts = get(this, "props.data.allContentfulBlogPost.edges");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <Navigation className="text-white" />
          <Logo />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
          <div className="wrapper">
            <Disqus
              config={{
                url: this.props.location.href,
                identifier: post.slug,
                title: post.title,
              }}
            />
          </div>
          {!!relatedPosts.length && (
            <div className="wrapper">
              <h2 className="section-headline">You May Also Like</h2>
              <ul className="article-list">
                {relatedPosts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $category: [String!]) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      filter: { tags: { in: $category }, slug: { ne: $slug } }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
