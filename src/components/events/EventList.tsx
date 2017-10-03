import * as React from "react";
import { Button, ListGroup, ListGroupItem, Well, Panel, Badge, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom";


interface State {
    isEventExpanded: boolean;
}

export class EventList extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = { isEventExpanded: true };
    }

    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem onClick={() => this.setState({ isEventExpanded: !this.state.isEventExpanded })}>
                        <Grid>
                            <Row>
                                <Col xs={1}>
                                    <Badge>13</Badge>
                                </Col>
                                <Col xs={2}>
                                    My Baseball Event
                                </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="arrow-up" />
                                    <Glyphicon glyph="arrow-down" />
                                </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="ok-circle" />
                                </Col>
                            </Row>
                        </Grid>
                    </ListGroupItem>
                    <Panel collapsible expanded={this.state.isEventExpanded}>
                        <Well>
                            <div>Host: <Link to="/users/profile">John A. Student</Link></div>
                            <div>Description: Leeeetttttssss play ball!</div>
                        </Well>
                    </Panel>
                    <ListGroupItem>
                        Event 2
                    </ListGroupItem>
                    <ListGroupItem>
                        Event 3
                    </ListGroupItem>

                    <LinkContainer to="/events/create">
                        <ListGroupItem>Create Event</ListGroupItem>
                    </LinkContainer>
                </ListGroup>
            </div>
        );
    }
}