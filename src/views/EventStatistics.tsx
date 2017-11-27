import * as React from "react";
import { match } from "react-router";
import { EventCard } from "../components/events/EventCard";
import { EventItem } from "../components/events/EventItem";
import { EventCategoryName, EventService } from "../services/events";
import { UserItem } from "../services/user";
import { StackedBarChart } from "../components/charts/StackedBarChart";

interface IEventStatisticsProps {
    match?: match<{ id: string }>;
}

interface IEventStatisticsState {
    event: EventItem[],
    data: any[],
    loading: boolean,
    dataLoaded: boolean
}

interface Margin {
    left: number,
    top: number,
    right: number,
    bottom: number
}

export class EventStatistics extends React.Component<IEventStatisticsProps, IEventStatisticsState> {

    constructor(props: IEventStatisticsProps) {
        super(props);
        this.state = {
            event: [],
            data: [],
            loading: true,
            dataLoaded: false
        }
        this.renderChart = this.renderChart.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        let { id } = this.props.match.params;
        let eventArr: EventItem[];
        EventService.getEventItem(id).then((res: EventItem) => {
            eventArr = [res];
            this.setState({ 
                event: eventArr,
                loading: false,
                data: [{ 
                    Event: "AL", 
                    "Going": eventArr[0].currentCapacity, 
                    "Capacity": (eventArr[0].totalCapacity - eventArr[0].currentCapacity)
                }],
                dataLoaded: true
            });
        })
    }

    getUserName(user: UserItem): string {
        return user == null ? "" : user.firstName + " " + user.lastName;
    }

    renderChart() {
        const { data } = this.state;
        return data.length ? <StackedBarChart data={this.state.data} /> : "" 
    }

    render() {
        let loading: JSX.Element = (this.state.loading) ? <div><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div> : null;
        let { event } = this.state;
        const { data } = this.state;
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
                    reviewMatchedDesc={event.reviewMatchedDesc}
                    reviewWouldReturn={event.reviewWouldReturn}
                    reviewHostPrep={event.reviewHostPrep}
                />
            )}
            <span className="separator"></span>
            <div className="event-statistics-page-header">
                <h2>Statistics</h2>
                <span>View statistics and metrics for this event. </span>
            </div>
            <div className="event-stat-group">
                <span className="event-stat-header">Event capacity vs amount of people attending</span>
                { this.renderChart() }
            </div>
        </div>
    }
}