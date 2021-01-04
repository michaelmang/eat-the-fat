import React from 'react'
import { graphql } from 'gatsby'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import Logo from '../components/logo'
import Navigation from '../components/navigation'

class BlogIndex extends React.Component {
  render() {
    const category = get(this, 'props.pageContext.category');
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location}>
        <div className="bg-white">
          <Helmet title={`${category} | ${siteTitle}`} />
          <Navigation className="text-white" />
          <Logo />
          <div className="wrapper">
            <h2 className="section-headline">{capitalize(category)}</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQueryByCategory($category: [String!]) {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC}, filter: {tags: {in: $category} }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 196, maxHeight: 400, resizingBehavior: SCALE) {
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
`
