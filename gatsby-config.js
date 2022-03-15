module.exports = {
  siteMetadata: {
    title: 'FUTBOLBRO - футбол, статии, програма, класиране, мачове по тв',
    description: 'FUTBOLBRO е сайт, в който може да намерите футболна програма, мачове по тв днес, статии, класиране и много още свързано с любимия ни спорт.',
    siteUrl: 'https://random.com',
    image: 'https://firebasestorage.googleapis.com/v0/b/futbolbro-eda7a.appspot.com/o/134720025_1967579280050695_2683902369904372170_n.png?alt=media&token=600d7110-8e36-4da6-b263-60d08904b0f8',
    keywords: [
      'футбол',
      'футболни статии',
      'футболни прогнози',
      'футболни анализи',
      'футболнa програма',
      'класиране'
    ]
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/login`, `/admin/*`],
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://www.futbolbro.com',
        sitemap: 'https://www.futbolbro.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/login'] }]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {}
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },
        ],
      },
    },
  ],
}
