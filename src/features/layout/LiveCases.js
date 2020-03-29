import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLive, liveSelector } from '../../slices/liveSlice';
import * as CSS from './Layout.css.js';

export const LiveCases = () => {
    const dispatch = useDispatch();
    const { live, loading, hasErrors } = useSelector(liveSelector);

    useEffect(() => {
        dispatch(fetchLive());
    }, [dispatch]);

    console.log('live', live);
    return (
        <div>
            <h1>Live</h1>
        </div>
    );
};
