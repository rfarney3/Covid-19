import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    hasErrors: false,
    live: []
};

const liveSlice = createSlice({
    name: 'live',
    initialState,
    reducers: {
        getLive: state => {
            state.loading = true;
        },
        getLiveSuccess: (state, { payload }) => {
            state.live = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getLiveFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

// Three actions generated from the slice
export const { getLive, getLiveSuccess, getLiveFailure } = liveSlice.actions;

// A selector
export const liveSelector = state => state.live;

// The reducer
export default liveSlice.reducer;

// Asynchronous thunk action
export function fetchLive() {
    return async dispatch => {
        dispatch(getLive());

        try {
            const response = await fetch(
                'https://api.covid19api.com/country/us/status/confirmed/live'
            );
            const data = await response.json();
            const locationData = data.slice(400);
            dispatch(getLiveSuccess(locationData));
        } catch (error) {
            dispatch(getLiveFailure());
        }
    };
}
