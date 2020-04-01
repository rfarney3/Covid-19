import React, { useEffect, useState } from 'react';
import { Grid, Header, Segment, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { News } from './News';
import { fetchSummary, summarySelector } from '../../slices/summarySlice';
import * as CSS from './Layout.css.js';

export const Summary = () => {
    const dispatch = useDispatch();
    const [filteredSumm, setSummary] = useState([]);
    const [query, setQuery] = useState();
    const { summary, loading, hasErrors } = useSelector(summarySelector);

    useEffect(() => {
        dispatch(fetchSummary());
    }, [dispatch]);

    const renderList = summ => {
        if (loading) return <p>Loading countries...</p>;
        if (hasErrors) return <p>Unable to display list of countries.</p>;

        return summ.map(country => (
            <div class="ui segment">
                <CSS.StyledLink to={`/country/${country.Country}`}>
                    <CSS.StyledListItem button key={country.Country}>
                        {country.Country}: {country.TotalConfirmed} Confirmed
                        Cases
                    </CSS.StyledListItem>
                </CSS.StyledLink>
            </div>
        ));
    };

    const handleChange = event => {
        setQuery(event.target.value.toLowerCase());
        let newSumm = summary.filter(country =>
            country.Country.toLowerCase().includes(query)
        );
        setSummary(newSumm);
    };

    return (
        <>
            <div style={{ marginTop: '-10px' }} class="ui placeholder segment">
                <div class="ui two column stackable center aligned grid">
                    <div class="middle aligned row">
                        <div class="column">
                            <div class="ui icon header">
                                <i class="search icon"></i>
                                Find Total Confirmed Cases by Country
                            </div>
                            <div class="field">
                                <div class="ui search">
                                    <div class="ui icon input">
                                        <input
                                            onChange={handleChange}
                                            class="prompt"
                                            type="text"
                                            placeholder="Search countries..."
                                        />
                                        <i class="search icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {query ? (
                <CSS.ResultsContainer>
                    {renderList(filteredSumm)}
                </CSS.ResultsContainer>
            ) : (
                <HomepageLayout />
            )}
        </>
    );
};

const HomepageLayout = () => (
    <>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            COVID-19 Recent News
                        </Header>
                        <News />
                    </Grid.Column>
                    <Grid.Column floated="right" width={8}>
                        <Image
                            rounded
                            src="https://api.wbez.org/v2/images/84144292-9cd6-4c51-87ed-cc190b993fd2.jpg?width=640&height=312&mode=FILL&threshold=0"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </>
);
