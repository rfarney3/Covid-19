import React from 'react';
import { Summary } from './Summary';
import { LiveCases } from './LiveCases';

export const Landing = () => {
    // useEffect(() => {
    //     dispatch(fetchSummary());
    // }, [dispatch]);

    return (
        <div>
            <Summary />
            <LiveCases />
        </div>
    );
};
