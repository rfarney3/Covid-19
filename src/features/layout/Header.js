import React from 'react';
import * as CSS from './Layout.css';

export const Header = () => {
    return (
        <CSS.Header>
            <CSS.Tab>
                <a href="/">Home</a>
            </CSS.Tab>
            <CSS.Tab>
                <a href="/country">Country</a>
            </CSS.Tab>
        </CSS.Header>
    );
};
