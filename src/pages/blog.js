import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import ArticlePreview from '../components/article-preview'
import Categories from '../components/categories'
import Layout from '../components/layout'
import Logo from '../components/logo'
import Navigation from '../components/navigation'
import getCategories from '../selectors/getCategories'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const nodes = get(this, 'props.data.allContentfulBlogPost.nodes')
    const categories = getCategories(nodes);

    return (
      <Layout location={this.props.location}>
        <div className="bg-white">
          <Helmet title={siteTitle} />
          <Navigation className="text-white" />
          <Logo />
          <div className="flex flex-col sm:flex-row">
            <Categories className="px-16" data={categories} />
            <div className="wrapper pt-0 px-4">
              <h2 className="section-headline">Blog</h2>
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
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
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
      nodes {
        tags
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
