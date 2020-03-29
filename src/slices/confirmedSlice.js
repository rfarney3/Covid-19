import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    hasErrors: false,
    confirmed: []
};

const confirmedSlice = createSlice({
    name: 'confirmed',
    initialState,
    reducers: {
        getConfirmed: state => {
            state.loading = true;
        },
        getConfirmedSuccess: (state, { payload }) => {
            state.confirmed = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getConfirmedFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

// Three actions generated from the slice
export const {
    getConfirmed,
    getConfirmedSuccess,
    getConfirmedFailure
} = confirmedSlice.actions;

// A selector
export const confirmedSelector = state => state.confirmed;

// The reducer
export default confirmedSlice.reducer;

// Asynchronous thunk action
export function fetchConfirmed() {
    return async dispatch => {
        dispatch(getConfirmed());

        try {
            const response = await fetch(
                'https://api.covid19api.com/country/us/status/confirmed'
            );
            const data = await response.json();
            const locationData = data.slice(400);
            dispatch(getConfirmedSuccess(locationData));
        } catch (error) {
            dispatch(getConfirmedFailure());
        }
    };
}
