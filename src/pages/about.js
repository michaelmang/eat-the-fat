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
          <div className="h-full flex flex-col justify-center">
            <Logo />
            <div className="wrapper flex flex-row flex-wrap">
              <div className="my-2 px-2 w-1/2 overflow-hidden">
                <div className="flex flex-col text-black">
                  <div className="text-4xl font-black">
                    Hi, I'm {author.name} 👋
                  </div>
                  <div className="mt-4 text-lg font-base" dangerouslySetInnerHTML={{ __html: author.shortBio.childMarkdownRemark.html }} />
                </div>
              </div>
              <div className="my-2 px-2 w-1/2 overflow-hidden">
                <Img
                  alt={author.name}
                  className="rounded shadow-xl"
                  fluid={author.image.fluid}
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
        fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
