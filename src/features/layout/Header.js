import React, { Component } from 'react';
import {
    Container,
    Menu,
    Responsive,
    Segment,
    Visibility
} from 'semantic-ui-react';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export class Head extends Component {
    state = {};

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Responsive
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility once={false}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: 75, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size="large"
                        >
                            <Container>
                                <Menu.Item>
                                    <a href="/">Home</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/Testing">US Testing</a>
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        );
    }
}
