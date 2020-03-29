import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    hasErrors: false,
    summary: []
};

const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        getSummary: state => {
            state.loading = true;
        },
        getSummarySuccess: (state, { payload }) => {
            state.summary = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getSummaryFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

// Three actions generated from the slice
export const {
    getSummary,
    getSummarySuccess,
    getSummaryFailure
} = summarySlice.actions;

// A selector
export const summarySelector = state => state.summary;

// The reducer
export default summarySlice.reducer;

// Asynchronous thunk action
export function fetchSummary() {
    return async dispatch => {
        dispatch(getSummary());

        try {
            const response = await fetch('https://api.covid19api.com/summary');
            const data = await response.json();
            const sortedData = data.Countries.filter(
                country => country.TotalConfirmed !== 0
            ).sort(function(a, b) {
                return b.TotalConfirmed - a.TotalConfirmed;
            });
            dispatch(getSummarySuccess(sortedData));
        } catch (error) {
            dispatch(getSummaryFailure());
        }
    };
}
