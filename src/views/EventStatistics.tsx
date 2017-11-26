import * as React from "react";
import { match } from "react-router";
import { EventCard } from "../components/events/EventCard";
import { EventItem } from "../components/events/EventItem";
import { EventCategoryName, EventService } from "../services/events";
import { UserItem } from "../services/user";
import * as d3 from "d3";

interface IEventStatisticsProps {
    match?: match<{ id: string }>;
}

interface IEventStatisticsState {
    event: EventItem[],
    loading: boolean
}

export class EventStatistics extends React.Component<IEventStatisticsProps, IEventStatisticsState> {

    chart: SVGSVGElement;

    constructor(props: IEventStatisticsProps) {
        super(props);
        this.state = {
            event: [],
            loading: true
        }
    }

    async componentWillMount() {
        this.setState({ loading: true });
        let { id } = this.props.match.params;
        let eventArr: EventItem[];
        EventService.getEventItem(id).then((res: EventItem) => {
            eventArr = [res];
            this.setState({ event: eventArr });
            this.setState({ loading: false });
        })
    }

    getUserName(user: UserItem): string {
        return user == null ? "" : user.firstName + " " + user.lastName;
    }

    render() {
        let loading: JSX.Element = (this.state.loading) ? <div><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div> : null;
        let { event } = this.state;
        return <div className="event-statistics">
            {loading}
            {event.map((event) =>
                <EventCard
                    eventid={event.id}
                    title={event.name}
                    description={event.description}
                    host={this.getUserName(event.host)}
                    interest={event.interestRating}
                    time={event.time}
                    category={EventCategoryName.get(event.category)}
                    capacity={event.totalCapacity}
                    currentCapacity={event.currentCapacity}
                    vote={event.vote ? event.vote.value : 0}
                    location={event.location}
                    handleUpvote={null}
                    handleDownvote={null}
                    isHostedByCurrentUser={null}
                    isAttendedByCurrentUser={null}
                    handleAttendingClick={null}
                />
            )}
            <span className="separator"></span>
            <div className="event-statistics-page-header">
                <h2>Statistics</h2>
                <span>View statistics and metrics for this event. </span>
            </div>
        </div>
    }
}