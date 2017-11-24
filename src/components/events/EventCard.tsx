import * as React from "react";
import { EventCategory, EventCategoryName } from "../../services/events";
import * as moment from 'moment'
import { Glyphicon } from "react-bootstrap";

export interface EventCardProps {
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
    handleUpvote: () => void,
    handleDownvote: () => void,
    isHostedByCurrentUser: boolean, // Is this event hosted by the logged in user
    isAttendedByCurrentUser: boolean, // Is this event attended by the logged in user
    handleAttendingClick: () => void,
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
                <a className="event-user-attending attending" onClick={this.props.handleAttendingClick}>
                    <i className="fa fa-check" style={{ color: "green" }}></i> I'm attending!
                </a>
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

    render() {
        let spotsLeft: number = (this.props.capacity - this.props.currentCapacity);
        return <div className="event-item-container">
            {this.renderVoteButtons()}
            <div className="event-content-panel">
                <div className="event-info">
                    <div className="event-title">{this.props.title}</div>
                    <div className="event-category">{this.props.category}</div>
                </div>
                <div className="event-host">{this.props.host}</div>
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