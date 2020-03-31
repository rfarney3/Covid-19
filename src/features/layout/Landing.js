import React from 'react';
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
    Image
} from 'semantic-ui-react';
import { Summary } from './Summary';
import { News } from './News';

export const Landing = () => {
    return (
        <div>
            <Summary />
            <HomepageLayout />
        </div>
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
