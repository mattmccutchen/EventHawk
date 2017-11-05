import * as React from "react";
import { Popover, OverlayTrigger, Button, ListGroup, ListGroupItem, Well, Panel, Badge, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom";
import { EventItem } from "./EventItem";
import { RateEvent } from "./RateEvent";
import { EventService } from "../../services/events";
import { EventListFilterSetting } from "./EventListFilterSetting";
import axios from "axios";
import { connect } from 'react-redux';
import { EventHawkAppState } from '../../reducers/EventHawkAppReducer'


interface State {
    expandedEventId: string;
    loggedInUserId: string;
    eventList: EventItem[];
}

interface Props {
    filters?: EventListFilterSetting
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        filters: state.eventListFilterSettingState
    }
}

class EventListPresentation extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { expandedEventId: null, loggedInUserId: "userA", eventList: [] }
    }

    componentWillMount() {
        var list: EventItem[] = [];
        EventService.getAll().then((res) => {
            for (let event of res.data) {
                list.push(new EventItem(event.name, event.description, "Jack", "userA", [this.state.loggedInUserId],event.category));
            }
            this.setState({ eventList: list });
        });
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
            (!filters.hostUserId || filters.hostUserId === eventItem.hostId) &&
            (!filters.attendeeUserId || eventItem.attendeeIds.indexOf(filters.attendeeUserId) != -1)
        );
    }

    getListGroupItem(key: string, eventItem: EventItem) {
        if (this.applyFilter(eventItem)) {
            let isHostedByCurrentUser = eventItem.hostId === this.state.loggedInUserId;
            let isAttendedByCurrentUser = eventItem.attendeeIds.indexOf(this.state.loggedInUserId) != -1;

            // Manually calculate column width, because react-bootstrap requires width to be specified
            let descriptionWidth = 9
            if (isHostedByCurrentUser) descriptionWidth--;
            if (isAttendedByCurrentUser) descriptionWidth--;

            return (
                <div>
                    <ListGroupItem key={key} onClick={() => this.handleListGroupItemClick(key)}>
                        <Grid>
                            <Row>
                                <Col xs={1}>
                                    <Badge>13</Badge>
                                </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="arrow-up" />
                                    <Glyphicon glyph="arrow-down" />
                                </Col>
                                <Col xs={1}>
                                    <Glyphicon glyph="ok-circle" />
                                </Col>
                                <Col xs={descriptionWidth}>{eventItem.title}</Col>
                                <Col xs={1} hidden={!isHostedByCurrentUser}>
                                    <Link to="/events/edit">Edit</Link>
                                </Col>
                                <Col xs={1} hidden={!isAttendedByCurrentUser}>
                                    <Link to="/events/rate">Rate</Link>
                                </Col>
                            </Row>
                        </Grid>
                    </ListGroupItem>

                    <Panel collapsible expanded={this.state.expandedEventId === key}>
                        <Well>
                            <div>Host: <Link to="/users/profile">John A. Student</Link></div>
                            <div>{eventItem.description}</div>
                            <div>Category: {eventItem.category}</div>
                        </Well>
                    </Panel>
                </div>
            );
        } else {
            return;
        }
    }

    render() {
        var i: number = 0;
        return (
            <div>
                <Link to="/events/filter">Filter</Link>
                <ListGroup>
                    {this.state.eventList.map((event) => (<div>{this.getListGroupItem((i++).toString(), event)}</div>))}
                </ListGroup>
            </div>
        );
    }
}

export const EventList = connect(mapStateToProps, null)(EventListPresentation);