import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, articlesSelector } from '../../slices/newsSlice';

export const News = () => {
    const dispatch = useDispatch();
    const { articles } = useSelector(articlesSelector);
    const news = articles.status === 'ok' && articles.articles.slice(0, 3);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const renderNews = () => {
        if (news) {
            return news.map(article => (
                <div>
                    <p style={{ fontSize: '1.33em' }}>
                        <a href={`${article.url}`}>{article.title}</a>
                    </p>
                    <span style={{ fontSize: '1em' }}>
                        Published by: {article.source.name}
                    </span>
                </div>
            ));
        }
    };

    return <div>{renderNews()}</div>;
};
