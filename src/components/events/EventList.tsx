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
import { withRouter } from 'react-router-dom'



interface State {
    expandedEventId: string;
    loggedInUserId: string;
    eventList: EventItem[];
}

interface Props {
    filters?: EventListFilterSetting
    history?: { push(path: string): any }
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
        EventService.indexEvents().then((res) => {
            // We're reloading the event list, so initialize it to an empty list
            this.setState({ eventList: [] })
            for (let eventId of res.data) {
                EventService.showEvent(eventId).then((res) => {
                    let list = this.state.eventList
                    // Assume showEvent returns an array of events with exactly 0 or 1 item
                    if (res.data.length == 1) {
                        let event = res.data[0]
                        let newEventItem: EventItem = {
                            name: event.name,
                            description: event.description,
                            time: event.time,
                            location: event.location,
                            currentCapacity: event.current_capacity,
                            totalCapacity: event.total_capacity,
                            interestRating: event.interest_rating,
                            category: event.category,
                            hostId: event.host_id
                        }
                        list.push(newEventItem);
                        // TODO: Currently, we re-render the entire list for each event item. Could optimize
                        //  to only re-render the single event item.
                        this.setState({ eventList: list });
                    }
                })
            }
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
            (!filters.hostUserId || filters.hostUserId === eventItem.hostId)
        );
    }

    getListGroupItem(key: string, eventItem: EventItem) {
        if (this.applyFilter(eventItem)) {
            let isHostedByCurrentUser = eventItem.hostId === this.state.loggedInUserId;
            // TODO: Assume the logged in user can rate every event, until API filters let us find
            // the actual events the user attended
            let isAttendedByCurrentUser = true

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
                                <Col xs={descriptionWidth}>{eventItem.name}</Col>
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

export const EventList = withRouter(connect(mapStateToProps, null)(EventListPresentation));