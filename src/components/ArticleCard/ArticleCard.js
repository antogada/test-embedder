import React from 'react';
import { Link } from 'gatsby';

import * as articleCardStyles from './article-card.module.scss';
import { getDate } from '../../utils/utils';

const ArticleCard = ({ article, slug, classes}) => {

  return (
    <Link to={`/statii/${slug}`} title={article.title} className={articleCardStyles.link}>
      <div className={`${articleCardStyles.container} ${classes?.container ? classes.container : ''}`}>
        <div
          className={articleCardStyles.image}
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className={articleCardStyles.categoryContainer}>
            <span className={`${articleCardStyles.category} subtitle`}>{article.category}</span>
          </div>
        </div>
        <div className={articleCardStyles.info}>
          <h2 className="heading-3">{article.title}</h2>
          <span className={`text-special ${articleCardStyles.date}`}>{getDate(article.date)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;