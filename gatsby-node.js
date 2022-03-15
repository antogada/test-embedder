const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

/**
 *  Called when a new GraphQL node is created.
 *  Transform MarkdownRemark nodes by adding them additional fields. 
*/
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if(node.internal.type === 'MarkdownRemark') {

    const slug = path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

/**
 * Creates pages dynamically from md GraphQL nodes
*/
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const articleTemaplate = path.resolve('./src/templates/article-template/ArticleTemplate.js');

  const results = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter:{draft: {eq: false}}}) {
        edges {
          node {
            fields{
              slug
            }
          }
        }
      }
    }
  `);

  results.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: articleTemaplate,
      path: `/statii/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    });
  });
};

module.exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, "umd " + request)
        }
        callback()
      }),
    })
  }
}

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new NodePolyfillPlugin()
    ]
  })
}