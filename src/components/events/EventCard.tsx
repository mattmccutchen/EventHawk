import * as React from "react";
import { EventCategory, EventCategoryName } from "../../services/events";
import * as moment from "moment";
import { Glyphicon, OverlayTrigger, Tooltip, Label } from "react-bootstrap";
import { Dropdown, dropdownItem } from "../navigation/Dropdown";
import { Link } from "react-router-dom";

export interface EventCardProps {
    eventid: string,
    title: string,
    description: string,
    host: string,
    interest: number,
    time: moment.Moment,
    category: string,
    capacity: number,
    currentCapacity: number,
    vote: number,
    location: string,
    reviewMatchedDesc: number,
    reviewWouldReturn: number,
    reviewHostPrep: number,
    handleUpvote: () => void,
    handleDownvote: () => void,
    isHostedByCurrentUser: boolean, // Is this event hosted by the logged in user
    isAttendedByCurrentUser: boolean, // Is this event attended by the logged in user
    handleAttendingClick: () => void,
    handleRateClick?: () => void,
}

export class EventCard extends React.Component<EventCardProps, {}> {

    constructor(props: EventCardProps) {
        super(props);
    }

    renderVoteButtons() {
        // Event hosts cannot vote on their own events, so hide the voting buttons for events hosted
        // by the logged in user
        if (this.props.isHostedByCurrentUser) {
            return (
                <div className="event-options-panel">
                    <span className="event-votes">{this.props.interest}</span>
                </div>
            )
        }

        return (
            <div className="event-options-panel">
                <span className="event-upvote" style={this.props.vote == 1 ? { color: "green" } : null} onClick={this.props.handleUpvote}><i className="fa fa-arrow-up"></i></span>
                <span className="event-votes">{this.props.interest}</span>
                <span className="event-downvote" style={this.props.vote == -1 ? { color: "green" } : null} onClick={this.props.handleDownvote}><i className="fa fa-arrow-down"></i></span>
            </div>
        )
    }

    renderAttending() {
        let spotsLeft: number = (this.props.capacity - this.props.currentCapacity);
        if (this.props.isHostedByCurrentUser) {
            // Don't display the sign up button for events hosted by the logged in user
            return;
        }
        if (this.props.isAttendedByCurrentUser) {
            return (
                <span>
                    <a className="event-user-attending attending" onClick={this.props.handleAttendingClick}>
                        <i className="fa fa-check" style={{ color: "green" }}></i> I'm attending!
                    </a>
                    {this.renderRateButton()}
                </span>
            )
        } else if (spotsLeft > 0) {
            return (
                <a className="event-user-attending signup" onClick={this.props.handleAttendingClick}>Sign me up!</a>
            )
        } else {
            return (
                <span className="event-user-attending full">
                    <i className="fa fa-exclamation"></i> This event is full!
                </span>
            )
        }
    }

    renderRateButton() {
        if (this.props.isAttendedByCurrentUser && this.props.handleRateClick) {
            return <a onClick={this.props.handleRateClick}> Rate</a>
        }
    }

    renderReviews() {
        const hostPrepTooltip = (
            <Tooltip id="hostPrepTooltip"><div><strong>Host preparedness</strong></div> Was the host prepared? From 1 (worst) to 5 (best)</Tooltip>
        );
        const matchedDescTooltip = (
            <Tooltip id="matchedDescTooltip"><div><strong>Matched description</strong></div> Did the event match the description? From 1 (worst) to 5 (best)</Tooltip>
        );
        const wouldReturnTooltip = (
            <Tooltip id="wouldReturnTooltip"><div><strong>Would return</strong></div> Would you participate in this event again? From 1 (worst) to 5 (best)</Tooltip>
        );

        return (
            <div>
                Reviews:
                <OverlayTrigger placement="top" overlay={hostPrepTooltip}>
                    <Label>{this.props.reviewHostPrep}</Label>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={matchedDescTooltip}>
                    <Label>{this.props.reviewMatchedDesc}</Label>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={wouldReturnTooltip}>
                    <Label>{this.props.reviewWouldReturn}</Label>
                </OverlayTrigger>
            </div>
        )
    }

    render() {
        let items: dropdownItem[] =
            [{
                label: "Statistics", link: "/event/" + this.props.eventid + "/statistics"
            }];

        let spotsLeft: number = (this.props.capacity - this.props.currentCapacity);
        return <div className="event-item-container">
            {this.renderVoteButtons()}
            <div className="event-content-panel">
                <div className="event-info">
                    <div className="event-title">{this.props.title}</div>
                    <div className="event-category">{this.props.category}</div>
                    <div className="event-misc">
                        <Dropdown className="" items={items}><i className="fa fa-angle-down"></i></Dropdown>
                    </div>
                </div>
                <div className="event-host">{this.props.host}{this.renderReviews()}</div>
                <div className="event-description">{this.props.description}</div>
                <div className="event-location-attend">
                    <div className="event-location">Location: {this.props.location}</div>
                    {this.renderAttending()}
                </div>
                <div className="event-stats">
                    <span className="event-time">{this.props.time.format("dddd, MMM Do YYYY, h:mm A")}</span>
                    <span className="event-going"><strong>{spotsLeft}</strong> spots left</span>
                </div>
            </div>
        </div>;
    }
}