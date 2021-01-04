import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import Logo from '../components/logo'
import Navigation from '../components/navigation'

class AboutIndex extends React.Component {
  render() {
    const author = get(this, "props.data.contentfulPerson");
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div className="bg-white">
          <Helmet title={`About | ${siteTitle}`} />
          <Navigation className="text-white" />
          <div className="h-full wrapper flex flex-col justify-center">
            <Logo />
            <div className="wrapper flex flex-row flex-wrap justify-center">
              <div className="flex flex-col text-black mx-8 my-2">
                <div className="text-4xl font-black">
                  Hi, I'm {author.name} 👋
                </div>
                <div className="mt-4 text-lg font-base" dangerouslySetInnerHTML={{ __html: author.shortBio.childMarkdownRemark.html }} />
              </div>
              <div className="flex flex-col mx-8 my-2">
                <Img
                  alt={author.name}
                  className="rounded-xl shadow-xl"
                  fluid={author.image.fluid}
                  style={{ height: 250, width: 167 }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutIndex;

export const pageQuery = graphql`
  query AboutIndex {
    contentfulPerson(name: {eq: "Kelly Mangialardi"}) {
      name
      image {
        fluid(maxWidth: 167, maxHeight: 250, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      shortBio {
        childMarkdownRemark {
          html
        }
      }
      title
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
