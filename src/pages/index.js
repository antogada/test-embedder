import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';


import './../styles/common.scss';
import './../styles/normalize.scss';

import ArticleCard from './../components/ArticleCard/ArticleCard';

import { mapArticlesData } from '../utils/articles';


const articlesQuery = graphql`
  query HomePageArticlesQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 5) {
      edges {
        node {
          id
          frontmatter {
            author
            image
            title
            date
            timeToRead
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  const articlesData = useStaticQuery(articlesQuery);
  const articles = mapArticlesData(articlesData);

  const articlesCards = articles.map((article) => {
    return (  
      <ArticleCard
        article={article}
        slug={article.slug}
        key={article.id}
      />
    );
  });


  return (
    <main>
      {articlesCards}
    </main>
  );
}

export default IndexPage;