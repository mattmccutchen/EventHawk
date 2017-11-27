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

interface IEventCardState {
    reviewOpen: boolean
}

export class EventCard extends React.Component<EventCardProps, IEventCardState> {

    constructor(props: EventCardProps) {
        super(props);
        this.state = {
            reviewOpen: false
        }
        this.renderReview = this.renderReview.bind(this);
        this.renderReviewCard
    }

    renderReview() {
        if (!this.state.reviewOpen) {
            this.setState({ reviewOpen: !this.state.reviewOpen });
            document.addEventListener("click", this.renderReview);
        } else {
            this.setState({ reviewOpen: !this.state.reviewOpen });
            document.removeEventListener("click", this.renderReview);
        }
    }

    renderVoteButtons() {
        let spotsLeft: number = (this.props.capacity - this.props.currentCapacity);
        // Event hosts cannot vote on their own events, so hide the voting buttons for events hosted
        // by the logged in user
        if (this.props.isHostedByCurrentUser) {
            return (
                <div className="event-options-panel">
                    <span className="event-votes">{this.props.interest}</span>
                    <div className="spots">
                        <span className="spots-left">{spotsLeft}</span>
                        <span className="num-spots-label">Spots left</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="event-options-panel">
                <span className="event-upvote" style={this.props.vote == 1 ? { color: "green" } : null} onClick={this.props.handleUpvote}><i className="fa fa-arrow-up"></i></span>
                <span className="event-votes">{this.props.interest}</span>
                <span className="event-downvote" style={this.props.vote == -1 ? { color: "green" } : null} onClick={this.props.handleDownvote}><i className="fa fa-arrow-down"></i></span>
                <div className="spots">
                    <span className="num-spots-left">{spotsLeft}</span>
                    <span className="num-spots-label">Spots left</span>
                </div>
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

    renderReviewCard() {
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
            <div className="event-review-container">
                <div className="event-review-stat">
                    <span className="event-review-num">{this.props.reviewHostPrep}</span>
                    <span className="event-review-label">Host Preparedness</span>
                </div>
                <div className="event-review-stat">
                    <span className="event-review-num">{this.props.reviewMatchedDesc}</span>
                    <span className="event-review-label">Matched Description</span>
                </div>
                <div className="event-review-stat">
                    <span className="event-review-num">{this.props.reviewWouldReturn}</span>
                    <span className="event-review-label">Would Return</span>
                </div>
            </div>
        )
    }

    render() {
        let items: dropdownItem[] = [{
            label: "Statistics", link: "/event/" + this.props.eventid + "/statistics"
        }];
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
                <div className="event-host">{this.props.host}</div>
                <div className="event-description">{this.props.description}</div>
                <div className="event-location-attend">
                    <div className="event-location">Location: {this.props.location}</div>
                    {this.renderAttending()}
                </div>
                <span className="separator" />
                <div className="event-stats">
                    <span className="event-time">{this.props.time.format("dddd, MMM Do YYYY, h:mm A")}</span>
                    <span className="event-reviews" onClick={this.renderReview}>Reviews 
                        {this.state.reviewOpen ? <i className="fa fa-angle-right"></i> : 
                        <i className="fa fa-angle-down" onClick={this.renderReview}></i>}
                    </span>
                </div>
                <div className={ "event-review-content " + (this.state.reviewOpen ? "open" : "")}>
                    <span className="separator" />
                    {this.renderReviewCard()}
                </div>
            </div>
        </div>;
    }
}