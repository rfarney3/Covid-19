import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { dateConverter } from '../../utils/utils';
import * as CSS from '../layout/Layout.css';

const convertData = data => {
    let chartReadyData = [];
    data.forEach(day => {
        chartReadyData.push({
            date: dateConverter(day.date),
            confirmed: day.confirmed,
            deaths: day.deaths,
            recovered: day.recovered
        });
    });

    return chartReadyData;
};

export const CountryDetailsChart = props => {
    const data = convertData(props.data.results);

    return (
        <CSS.MapContainer>
            <LineChart
                width={800}
                height={300}
                data={data}
                margin={{ top: 20, right: 10, bottom: 20, left: 45 }}
            >
                <Line type="monotone" dataKey="confirmed" stroke="blue" />
                <Line type="monotone" dataKey="deaths" stroke="red" />
                <Line type="monotone" dataKey="recovered" stroke="green" />

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </CSS.MapContainer>
    );
};
