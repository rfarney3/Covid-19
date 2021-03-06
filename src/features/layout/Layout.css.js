import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

export const StyledListItem = styled(ListItem)`
    border-style: solid;
`;

export const StyledList = styled.ul`
    padding: 0;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: gray;
    margin-bottom: 20px;
`;

export const CountryContainer = styled.div`
    width: 100%;
    text-align: center;
`;

export const Spinner = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    &:after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid black;
        border-color: black transparent black transparent;
        animation: lds-hourglass 1.2s infinite;
    }
    @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(1800deg);
        }
    }
`;

export const MapContainer = styled.div`
    display: flex;
    width: 75vh;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const ResultsContainer = styled.div`
    width: 100%;
    top: 25%;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 25px;
`;

export const StateContainer = styled.div`
    margin: 20px;
    border: solid;
    border-color: gray;
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
`;
