import { configureStore } from '@reduxjs/toolkit';
import confirmedReducer from '../slices/confirmedSlice';
import liveReducer from '../slices/liveSlice';
import summaryReducer from '../slices/summarySlice';

export default configureStore({
    reducer: {
        confirmed: confirmedReducer,
        live: liveReducer,
        summary: summaryReducer
    }
});
