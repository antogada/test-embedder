import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Markdown from 'react-markdown';

import './../../styles/common.scss';
import * as articleTemplateStyles from './article-template.module.scss';
import { getDate } from './../../utils/utils';

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        title
        image
        content
        author
        category
        date
        timeToRead
        keywords,
        intro
      }
      fields {
        slug
      }
    }
  }
`;

const ArticleTemplate = ({ data }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const keywords = data.markdownRemark.frontmatter.keywords[0].split(' ');
  const url = `https://random.com/statii/${data.markdownRemark.fields.slug}/`;

  const toggleSnackBar = () => {
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toggleSnackBar();
  };

  return (
      <article className={articleTemplateStyles.container}>
        <img
          className={articleTemplateStyles.image}
          src={data.markdownRemark.frontmatter.image}
          title={data.markdownRemark.frontmatter.title} 
          alt={data.markdownRemark.frontmatter.title}
        />
        <div className={articleTemplateStyles.info}>
          <div className={`text ${articleTemplateStyles.about}`}>
            <span className={articleTemplateStyles.dateAndReadTime}>{getDate(data.markdownRemark.frontmatter.date)}</span>
            <span className={articleTemplateStyles.divider}>|</span>
            <span className={articleTemplateStyles.authorName}>{data.markdownRemark.frontmatter.author}</span>
            <span className={articleTemplateStyles.timeToRead}>Време за четене: {data.markdownRemark.frontmatter.timeToRead} мин</span>
          </div>
          <div className={articleTemplateStyles.socialIcons}>
          </div>
        </div>
        <h1 className={`${articleTemplateStyles.title} heading-1`}>{data.markdownRemark.frontmatter.title}</h1>
        <Markdown className={`${articleTemplateStyles.content} regular-text`} children={data.markdownRemark.frontmatter.content}></Markdown>
      </article>
  );
};

export default ArticleTemplate;