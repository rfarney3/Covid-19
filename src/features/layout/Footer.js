import React from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';

export const Footer = () => {
    return (
        <Segment
            inverted
            vertical
            style={{
                padding: '5em 0em',
                position: 'fixed',
                width: '100%',
                bottom: '0'
            }}
        >
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as="h4" content="About" />
                            <List link inverted>
                                <List.Item>X</List.Item>
                                <List.Item>X</List.Item>
                                <List.Item>X</List.Item>
                                <List.Item>X</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as="h4" content="Resources" />
                            <List link inverted>
                                <List.Item>
                                    <a href="https://newsapi.org/">News API</a>
                                </List.Item>
                                <List.Item>
                                    <a href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest">
                                        Postman Covid-19 Data
                                    </a>
                                </List.Item>
                                <List.Item>
                                    <a href="https://github.com/rlindskog/covid19-graphql">
                                        GraphQL Covid-19 API
                                    </a>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h4" inverted>
                                Take Action
                            </Header>
                            <p>
                                We encourage you to stay indoors to prevent the
                                spread of the virus. Seek medical help
                                immediately if you are experiencing symptoms.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
};
