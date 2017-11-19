import * as React from "react";
import { Popover, OverlayTrigger, Button, ListGroup, ListGroupItem, Well, Panel, Badge, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { EventItem } from "./EventItem";
import { RateEvent } from "./RateEvent";
import { EventService, EventCategoryName } from "../../services/events";
import { EventListFilterSetting } from "./EventListFilterSetting";
import axios from "axios";
import { UserItem } from "../../services/user";
import { AuthenticationState } from "../../common/state/Auth";


interface State {
    expandedEventId: string;
    eventList: EventItem[];
}

interface Props {
    authState?: AuthenticationState
    filters?: EventListFilterSetting
    history?: { push(path: string): any }
}

export class EventListPresentation extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { expandedEventId: null, eventList: [] }
    }

    componentDidMount() {
        this.fetchEventList(this.props);
    }

    fetchEventList(props: Props) {
        EventService.getAllEventItems(props.filters).then(
            (events: EventItem[]) => {
                this.setState({ eventList: events })
            }
        )
    }

    handleListGroupItemClick(key: string) {
        if (this.state.expandedEventId === key) {
            // If this item is already expanded, collapse it.
            this.setState({ expandedEventId: null });
        } else {
            this.setState({ expandedEventId: key })
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.filters != this.props.filters) {
            this.fetchEventList(props)
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

    // Returns a user's name formatted for display in the event list
    getUserName(user: UserItem): string {
        return user == null ? "" : user.firstName + " " + user.lastName
    }

    getLoggedInUserId(): string {
        return this.props.authState.loggedIn ? this.props.authState.user_id : ""        
    }

    getListGroupItem(key: string, eventItem: EventItem) {
        if (this.applyFilter(eventItem)) {
            let isHostedByCurrentUser = eventItem.hostId === this.getLoggedInUserId();
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
                                    <Badge>{eventItem.interestRating}</Badge>
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
                            <div>Host: <Link to="/users/profile">{this.getUserName(eventItem.host)}</Link></div>
                            <div>{eventItem.description}</div>
                            <div>Category: {EventCategoryName.get(eventItem.category)}</div>
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