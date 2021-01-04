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

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const nodes = get(this, 'props.data.allContentfulBlogPost.nodes')

    const categories = getCategories(nodes);

    const trendingArticles = posts.filter(({ node }) => node.tags.includes('featured'));

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Navigation className="text-white" />
        <Logo />
        <div className="bg-white flex px-10 flex-col items-center sm:flex-row sm:justify-between sm:items-start">
          <Categories data={categories} />
          <div className="flex flex-col w-full sm:w-9/12 sm:mr-8">
            {trendingArticles.map(({ node }) => {
              return <ArticlePreview key={node.name} article={node} className="mb-4 w-full" />
            })}
          </div>
          <div className="flex flex-row flex-wrap justify-center sm:flex-col sm:w-2/12">
            <div className="p-8 mt-4 mb-10 sm:p-4 sm:m-0 text-black sm:mb-4 w-full" style={{ backgroundColor: "#ffcb69" }}>
              <div className="mb-2 uppercase font-bold text-sm">
                Join the Newsletter
              </div>
              <input className="px-2 py-1 rounded text-sm w-full" placeholder="email address" type="text" />
            </div>
            {posts.slice(0, 5).map(({ node }) => {
              return <ArticlePreview article={node} className="mb-4 w-full" withDescription={false} />
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
