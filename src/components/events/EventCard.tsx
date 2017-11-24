import * as React from "react";
import { EventCategory, EventCategoryName } from "../../services/events";

export interface EventCardProps { 
    title: string,
    description: string,
    host: string,
    interest: number,
    time: number,
    category: string,
    capacity: number,
    currentCapacity: number,
    vote: number,
    handleUpvote: () => void,
    handleDownvote: () => void
}

export class EventCard extends React.Component<EventCardProps, {}> {

    constructor(props: EventCardProps) {
        super(props);
    }

    render() {
        let spotsLeft: number = (this.props.capacity - this.props.currentCapacity);
        return <div className="event-item-container">
            <div className="event-options-panel">
                <span className="event-upvote" style={this.props.vote == 1 ? {color: "green"} : null} onClick={this.props.handleUpvote}><i className="fa fa-arrow-up"></i></span>
                <span className="event-votes">{this.props.interest}</span>
                <span className="event-downvote" style={this.props.vote == -1 ? {color: "green"} : null} onClick={this.props.handleDownvote}><i className="fa fa-arrow-down"></i></span>
            </div>
            <div className="event-content-panel">
                <div className="event-info">
                    <div className="event-title">{this.props.title}</div>
                    <div className="event-category">{this.props.category}</div>
                </div>
                <div className="event-host">{this.props.host}</div>
                <div className="event-description">{this.props.description}</div>
                <div className="event-stats">
                    <span className="event-time">Saturday at 12:39 PM</span>
                    <span className="event-going"><strong>{spotsLeft}</strong> spots left</span>
                </div>
            </div>
        </div>;
    }
}