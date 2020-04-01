import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    hasErrors: false,
    tests: []
};

const testsSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        getTests: state => {
            state.loading = true;
        },
        getTestsSuccess: (state, { payload }) => {
            state.tests = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getTestsFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

// Three actions generated from the slice
export const {
    getTests,
    getTestsSuccess,
    getTestsFailure
} = testsSlice.actions;

// A selector
export const testsSelector = state => state.tests;

// The reducer
export default testsSlice.reducer;

// Asynchronous thunk action
export function fetchTests() {
    return async dispatch => {
        dispatch(getTests());

        try {
            const response = await fetch(
                'https://covidtracking.com/api/states'
            );
            const data = await response.json();

            dispatch(getTestsSuccess(data));
        } catch (error) {
            dispatch(getTestsFailure());
        }
    };
}
