import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import toUpper from 'lodash/toUpper'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Navigation from '../components/navigation'
import ArticlePreview from '../components/article-preview'

function removeDuplicates(list) {
  return [...new Set(list)];
}

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const nodes = get(this, 'props.data.allContentfulBlogPost.nodes')

    const tags = removeDuplicates(nodes.flatMap(({ tags }) => tags)).map(tag => toUpper(tag));

    const trendingArticles = posts.filter(({ node }) => node.tags.includes('featured'));

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Navigation className="text-white" />
        <div className="cursive flex flex-col items-center bg-white p-4 px-6 justify-center text-5xl font-light">
          <img className="h-20 w-40 my-2" src="https://images.ctfassets.net/9hjducs3pll2/21Gg5ZTu4waptaCY6jEiMq/77ca24ccd531978bff341e30d0520775/eat-the-fat.png" />
          Eat The Fat
        </div>
        <div className="bg-white flex px-10 flex-col items-center sm:flex-row sm:justify-between sm:items-start">
          <div className="flex flex-row w-full px-8 py-2 sm:flex-col sm:w-1/12 sm:mr-8">
            <div className="hidden text-sm font-bold uppercase sm:flex sm:mb-4">
              categories
            </div>
            <div className="flex flex-row w-full justify-between sm:flex-col">
              {tags.map(tag => (
                <div key={tag} className="cursor-pointer mb-2 mr-2 text-sm hover:underline">{tag}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-9/12 sm:mr-8">
            {trendingArticles.map(({ node }) => {
              return <ArticlePreview article={node} className="mb-4 w-full" />
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
