import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfirmed, confirmedSelector } from '../../slices/confirmedSlice';
import GoogleMapReact from 'google-map-react';
import * as CSS from './Layout.css';

export const ConfirmedCases = ({ country }) => {
    const dispatch = useDispatch();
    const { confirmed } = useSelector(confirmedSelector);

    useEffect(() => {
        dispatch(fetchConfirmed(country));
    }, [dispatch]);

    const getCoords = () => {
        return confirmed.map(({ Lat, Lon }) => ({ lat: Lat, lng: Lon }));
    };

    return (
        <div>
            <h1>Confirmed Cases Heatmap</h1>
            <CSS.MapContainer>
                <div style={{ height: '350px', width: '500px' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: [process.env.REACT_APP_MAPS_API_KEY]
                        }}
                        heatmapLibrary={true}
                        zoom={3}
                        center={{
                            lat: 39,
                            lng: -100
                        }}
                        heatmap={{
                            positions: getCoords(),
                            options: {
                                radius: 20,
                                opacity: 0.8
                            }
                        }}
                    ></GoogleMapReact>
                </div>
            </CSS.MapContainer>
        </div>
    );
};
