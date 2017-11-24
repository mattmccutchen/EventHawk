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
                <div className="event-user-attending" role="button" onClick={this.props.handleAttendingClick}>
                    <Glyphicon glyph="ok-sign" style={{ color: "green" }} /> I'm attending!
                </div>
            )
        } else if (spotsLeft > 0) {
            return (
                <div className="event-user-attending" role="button" onClick={this.props.handleAttendingClick}>
                    <Glyphicon glyph="question-sign" /> Sign me up!
                </div>
            )
        } else {
            return (
                <div className="event-user-attending">
                    <Glyphicon glyph="minus-sign" /> This event is full!
                </div>
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
                <div className="event-location">{this.props.location}</div>
                {this.renderAttending()}
                <div className="event-stats">
                    <span className="event-time">{this.props.time.format("dddd, MMMM Do YYYY, h:mm a")}</span>
                    <span className="event-going"><strong>{spotsLeft}</strong> spots left</span>
                </div>
            </div>
        </div>;
    }
}