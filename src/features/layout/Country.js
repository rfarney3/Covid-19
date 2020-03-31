import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CountryDetailsChart } from '../charts/CountryDetailsChart';
import { LiveCases } from './LiveCases';
import { ConfirmedCases } from './ConfirmedCases';
import { dateConverter } from '../../utils/utils';
import * as CSS from './Layout.css';

const GET_CASES = gql`
    query($country: String!) {
        # time series data
        results(countries: [$country]) {
            country {
                name
            }
            date
            confirmed
            deaths
            recovered
            growthRate
        }
    }
`;

export const Country = () => {
    const { country } = useParams();
    const [map, setMap] = useState('confirmed');
    const { data, loading } = useQuery(GET_CASES, {
        variables: { country }
    });
    const currentData = !loading && data.results[data.results.length - 1];

    return (
        <CSS.CountryContainer>
            {loading ? (
                <CSS.Spinner />
            ) : (
                <div>
                    <h1>{country} Covid-19 Data</h1>
                    <CountryDetailsChart data={data} />
                    <div>
                        <h2>
                            Current Statistics as of{' '}
                            {dateConverter(currentData.date)}
                        </h2>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>
                                    Active Cases:
                                </span>{' '}
                                {currentData.confirmed -
                                    (currentData.recovered +
                                        currentData.deaths)}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>
                                    Confirmed Cases:
                                </span>{' '}
                                {currentData.confirmed}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>
                                    Recovered:
                                </span>{' '}
                                {currentData.recovered}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>
                                    Deaths:
                                </span>{' '}
                                {currentData.deaths}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>
                                    Growth Rate:
                                </span>{' '}
                                {(currentData.growthRate * 100).toFixed(2)}%
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setMap('confirmed')}
                        class="ui left attached button"
                    >
                        Confirmed Cases
                    </button>
                    <button
                        onClick={() => setMap('live')}
                        class="right attached ui button"
                    >
                        Live Cases
                    </button>
                    <CSS.MapContainer>
                        {map === 'live' && <LiveCases country={country} />}
                        {map === 'confirmed' && (
                            <ConfirmedCases country={country} />
                        )}
                    </CSS.MapContainer>
                </div>
            )}
        </CSS.CountryContainer>
    );
};
