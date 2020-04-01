import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
    Grid,
    Header,
    Segment,
    Image,
    List,
    TextArea
} from 'semantic-ui-react';
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
    const [map, setMap] = useState('chart');
    const { data, loading } = useQuery(GET_CASES, {
        variables: { country }
    });
    const currentData = !loading && data.results[data.results.length - 1];

    return (
        <CSS.CountryContainer>
            {loading ? (
                <CSS.Spinner />
            ) : (
                <>
                    <Grid
                        container
                        stackable
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header
                                    as="h3"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: '2em'
                                    }}
                                >
                                    {country} Covid-19 Data
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <CSS.MapContainer>
                            {map === 'live' && <LiveCases country={country} />}
                            {map === 'confirmed' && (
                                <ConfirmedCases country={country} />
                            )}
                            {map === 'chart' && (
                                <CountryDetailsChart data={data} />
                            )}
                        </CSS.MapContainer>
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <button
                            onClick={() => setMap('chart')}
                            class="ui left attached button"
                        >
                            Aggregate Data
                        </button>
                        <button
                            onClick={() => setMap('confirmed')}
                            class="ui attached button"
                        >
                            Confirmed Cases
                        </button>
                        <button
                            onClick={() => setMap('live')}
                            class="ui right attached button"
                        >
                            Live Cases
                        </button>
                    </div>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        Current Statistics as of{' '}
                        {dateConverter(currentData.date)}
                    </Header>
                    <List inverted>
                        <List.Item>
                            <span style={{ fontWeight: 'bold' }}>
                                Active Cases:
                            </span>{' '}
                            {currentData.confirmed -
                                (currentData.recovered + currentData.deaths)}
                        </List.Item>
                        <List.Item>
                            <span style={{ fontWeight: 'bold' }}>
                                Confirmed Cases:
                            </span>{' '}
                            {currentData.confirmed}
                        </List.Item>
                        <List.Item>
                            <span style={{ fontWeight: 'bold' }}>
                                Recovered:
                            </span>{' '}
                            {currentData.recovered}
                        </List.Item>
                        <List.Item>
                            <span style={{ fontWeight: 'bold' }}>Deaths:</span>{' '}
                            {currentData.deaths}
                        </List.Item>
                        <List.Item>
                            <span style={{ fontWeight: 'bold' }}>
                                Growth Rate:
                            </span>{' '}
                            {(currentData.growthRate * 100).toFixed(2)}%
                        </List.Item>
                    </List>
                </>
            )}
        </CSS.CountryContainer>
    );
};

{
    /* <>
    <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        {country} Covid-19 Data
                        <CountryDetailsChart data={data} />
                    </Header>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        Current Statistics as of{' '}
                        {dateConverter(currentData.date)}
                    </Header>
                </Grid.Column>
                <Grid.Column floated="right" width={8}></Grid.Column>
                <List link inverted>
                    <List.Item>
                        <span style={{ fontWeight: 'bold' }}>
                            Active Cases:
                        </span>{' '}
                        {currentData.confirmed -
                            (currentData.recovered + currentData.deaths)}
                    </List.Item>
                    <List.Item>
                        <span style={{ fontWeight: 'bold' }}>
                            Confirmed Cases:
                        </span>{' '}
                        {currentData.confirmed}
                    </List.Item>
                    <List.Item>
                        <span style={{ fontWeight: 'bold' }}>Recovered:</span>{' '}
                        {currentData.recovered}
                    </List.Item>
                    <List.Item>
                        <span style={{ fontWeight: 'bold' }}>Deaths:</span>{' '}
                        {currentData.deaths}
                    </List.Item>
                    <List.Item>
                        <span style={{ fontWeight: 'bold' }}>Growth Rate:</span>{' '}
                        {(currentData.growthRate * 100).toFixed(2)}%
                    </List.Item>
                </List>
            </Grid.Row>
        </Grid>
    </Segment>
</>; */
}
