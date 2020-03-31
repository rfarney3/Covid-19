import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSummary, summarySelector } from '../../slices/summarySlice';
import * as CSS from './Layout.css.js';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

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
            <div class="ui placeholder segment">
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
            <div class="results">{query ? renderList(filteredSumm) : null}</div>
        </>
    );
};
