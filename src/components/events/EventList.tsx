import * as React from "react";
import { Button, ListGroup, ListGroupItem, Well, Panel, Badge, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom";


interface State {
    expandedEventId: string;
}

export class EventList extends React.Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = { expandedEventId: null }
    }

    handleListGroupItemClick(key: string) {
        if (this.state.expandedEventId === key) {
            // If this item is already expanded, collapse it.
            this.setState({ expandedEventId: null });
        } else {
            this.setState({ expandedEventId: key })
        }
    }

    createListGroupItem(key: string) {
        return (
            <div>
                <ListGroupItem key={key} onClick={() => this.handleListGroupItemClick(key)}>
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

                <Panel collapsible expanded={this.state.expandedEventId === key}>
                    <Well>
                        <div>Host: <Link to="/users/profile">John A. Student</Link></div>
                        <div>Description: Leeeetttttssss play ball!</div>
                    </Well>
                </Panel>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ListGroup>
                    {this.createListGroupItem("a")}
                    {this.createListGroupItem("b")}
                    {this.createListGroupItem("c")}
                    {this.createListGroupItem("d")}
                    {this.createListGroupItem("e")}
                </ListGroup>
            </div>
        );
    }
}