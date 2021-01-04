const Promise = require('bluebird')
const path = require('path')

const getCategories = require('./src/selectors/getCategories');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  tags
                }
              }
              nodes {
                tags
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              category: post.node.tags,
              slug: post.node.slug,
            },
          })
        })
        
        const { nodes } = result.data.allContentfulBlogPost
        const categories = getCategories(nodes)
        categories.forEach(category => {
          createPage({
            path: `/blog/categories/${category.toLowerCase()}/`,
            component: categoryTemplate,
            context: {
              category: category.toLowerCase(),
            },
          })
        })
      })
    )
  })
}
