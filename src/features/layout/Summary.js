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
    const { summary, loading, hasErrors } = useSelector(summarySelector);
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchSummary());
    }, [dispatch]);

    const renderList = summ => {
        if (loading) return <p>Loading countries...</p>;
        if (hasErrors) return <p>Unable to display list of countries.</p>;

        return summ.map(country => (
            <CSS.StyledLink to={`/country/${country.Country}`}>
                <CSS.StyledListItem button key={country.Country}>
                    {country.Country}: {country.TotalConfirmed}
                </CSS.StyledListItem>
            </CSS.StyledLink>
        ));
    };

    const handleChange = event => {
        let newSumm = summary.filter(country =>
            country.Country.toLowerCase().includes(
                event.target.value.toLowerCase()
            )
        );
        setSummary(newSumm);
    };

    console.log('summary', filteredSumm);
    return (
        <CSS.TotalsContainer className={classes.root}>
            Total Confirmed Cases
            <input onChange={handleChange} placeholder="filter countries" />
            <CSS.StyledList>
                {filteredSumm.length
                    ? renderList(filteredSumm)
                    : renderList(summary)}
            </CSS.StyledList>
        </CSS.TotalsContainer>
    );
};
