import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import Logo from '../components/logo'
import Navigation from '../components/navigation'

class Index404 extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div className="bg-white">
          <Helmet title={siteTitle} />
          <Navigation className="text-white" />
          <div className="h-full flex flex-col justify-center">
            <Logo />
            <p className="font-bold flex justify-center">Whoops! This page got eaten...</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index404;

export const pageQuery = graphql`
  query Index404Query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
