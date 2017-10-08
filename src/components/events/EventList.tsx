import * as React from "react";
import { Button, ListGroup, ListGroupItem, Well, Panel, Badge, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom";
import { EventItem } from "./EventItem";


interface State {
    expandedEventId: string;
    loggedInUserId: string
}

interface Props {
    filters?: EventListFilters
}

interface EventListFilters {
    hostUserId?: string; // Only include items hosted by this user
    attendeeUserId?: string; // Only include items attended by this user
}

export class EventList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        
        this.state = { expandedEventId: null, loggedInUserId: "userA" }
    }

    handleListGroupItemClick(key: string) {
        if (this.state.expandedEventId === key) {
            // If this item is already expanded, collapse it.
            this.setState({ expandedEventId: null });
        } else {
            this.setState({ expandedEventId: key })
        }
    }

    applyFilter(eventItem: EventItem) {
        if (!this.props.filters) {
            return true;
        }

        let filters = this.props.filters;

        return (
                (!filters.hostUserId || filters.hostUserId === eventItem.userId) &&
                (!filters.attendeeUserId || eventItem.attendeeIds.indexOf(filters.attendeeUserId) != -1)
            );
    }

    getListGroupItem(key: string, eventItem: EventItem) {
        if (this.applyFilter(eventItem)) {
            return (
                <div>
                    <ListGroupItem key={key} onClick={() => this.handleListGroupItemClick(key)}>
                        <Grid>
                            <Row>
                                <Col xs={1}>
                                    <Badge>13</Badge>
                                </Col>
                                <Col xs={8}>
                                    My Baseball Event
                            </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="arrow-up" />
                                    <Glyphicon glyph="arrow-down" />
                                </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="ok-circle" />
                                </Col>
                                <Col xs={1} hidden={!(eventItem.userId === this.state.loggedInUserId)}>
                                    <Button>Edit</Button>
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
        } else {
            return;
        }
    }

    render() {
        return (
            <div>
                <ListGroup>
                    {this.getListGroupItem("a", new EventItem("userA", ["userA"]))}
                    {this.getListGroupItem("b", new EventItem("userB", ["userA"]))}
                    {this.getListGroupItem("c", new EventItem("userC", ["userA"]))}
                    {this.getListGroupItem("d", new EventItem("userD", null))}
                    {this.getListGroupItem("e", new EventItem("userE", null))}
                </ListGroup>
            </div>
        );
    }
}