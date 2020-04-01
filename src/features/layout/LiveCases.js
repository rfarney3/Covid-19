import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLive, liveSelector } from '../../slices/liveSlice';
import GoogleMapReact from 'google-map-react';
import * as CSS from './Layout.css';

export const LiveCases = ({ country }) => {
    const dispatch = useDispatch();
    const { live } = useSelector(liveSelector);

    useEffect(() => {
        dispatch(fetchLive(country));
    }, [dispatch]);

    const getCoords = () => {
        return live.map(({ Lat, Lon }) => ({ lat: Lat, lng: Lon }));
    };

    return (
        <div>
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
