import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, List } from 'semantic-ui-react';
import { fetchTests, testsSelector } from '../../slices/testingSlice';
import * as CSS from './Layout.css';

export const Testing = () => {
    const dispatch = useDispatch();
    const { tests } = useSelector(testsSelector);

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    const renderStates = () => {
        return tests.map(state => (
            <div class="four wide column">
                <CSS.StateContainer>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                        {state.state}
                    </Header>
                    <List link inverted>
                        <List.Item style={{ color: 'black' }}>
                            Patients Tested Positive:{' '}
                            {((state.positive / state.total) * 100).toFixed(2)}%
                        </List.Item>
                        <List.Item style={{ color: 'black' }}>
                            Total Tested: {state.total}
                        </List.Item>
                        <List.Item style={{ color: 'black' }}>
                            Positive: {state.positive}
                        </List.Item>
                        <List.Item style={{ color: 'black' }}>
                            Negative: {state.negative}
                        </List.Item>
                        <List.Item style={{ color: 'black' }}>
                            Hospitalized: {state.hospitalized}
                        </List.Item>
                        <List.Item style={{ color: 'black' }}>
                            Overall Score: {state.grade}
                        </List.Item>
                    </List>
                </CSS.StateContainer>
            </div>
        ));
    };
    console.log(tests);
    return (
        <div style={{ marginBottom: '350px' }} class="ui grid">
            {renderStates()}
        </div>
    );
};
