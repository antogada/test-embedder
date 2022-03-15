export const mapArticlesData = (articlesData) => {
  return articlesData.allMarkdownRemark.edges.map(edge => {
    return {
      id: edge.node.id,
      title: edge.node.frontmatter.title,
      author: edge.node.frontmatter.author,
      category: edge.node.frontmatter.category,
      date: edge.node.frontmatter.date,
      image: edge.node.frontmatter.image,
      intro: edge.node.frontmatter.intro,
      slug: edge.node.fields.slug
    };
  }) 
};