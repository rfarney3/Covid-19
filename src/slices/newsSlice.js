import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    hasErrors: false,
    articles: []
};

const newsSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        getArticles: state => {
            state.loading = true;
        },
        getArticlesSuccess: (state, { payload }) => {
            state.articles = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getArticlesFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

// Three actions generated from the slice
export const {
    getArticles,
    getArticlesSuccess,
    getArticlesFailure
} = newsSlice.actions;

// A selector
export const articlesSelector = state => state.articles;

// The reducer
export default newsSlice.reducer;

// Asynchronous thunk action
export function fetchArticles() {
    return async dispatch => {
        dispatch(getArticles());

        try {
            const response = await fetch(
                `http://newsapi.org/v2/everything?q=coronavirus&from=2020-02-29&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
            );
            const data = await response.json();

            dispatch(getArticlesSuccess(data));
        } catch (error) {
            dispatch(getArticlesFailure());
        }
    };
}
