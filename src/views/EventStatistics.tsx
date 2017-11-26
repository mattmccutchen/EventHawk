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

interface Margin {
    left: number,
    top: number,
    right: number,
    bottom: number
}

export class EventStatistics extends React.Component<IEventStatisticsProps, IEventStatisticsState> {

    private barchart: any;
    private margin: Margin;
    
    private width: number;
    private height: number;
    
    private x: any;
    private y: any;
    private z: any;
    private g: any;

    constructor(props: IEventStatisticsProps) {
        super(props);
        this.state = {
            event: [],
            loading: true
        }
        this.getBarChart = this.getBarChart.bind(this);
        this.drawChart = this.drawChart.bind(this);
    }

    async componentWillMount() {
        this.setState({ loading: true });
        let { id } = this.props.match.params;
        let eventArr: EventItem[];
        EventService.getEventItem(id).then((res: EventItem) => {
            eventArr = [res];
            this.setState({ event: eventArr });
            this.setState({ loading: false });

            this.getBarChart();
            this.drawChart();
        })
    }

    getBarChart() {
        this.margin = { left: 40, top: 20, right: 20, bottom: 30 };

        this.barchart = d3.select('svg');
        
        this.width = +this.barchart.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.barchart.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.barchart.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleBand()
                    .rangeRound([0, this.width])
                    .paddingInner(0.05)
                    .align(0.1);
                this.y = d3.scaleLinear()
                    .rangeRound([this.height, 0]);
                this.z = d3.scaleOrdinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    }

    private drawChart() {
        let data: any[] = [{Event: "AL", 'Going': this.state.event[0].currentCapacity, 'Capacity': this.state.event[0].totalCapacity}];
        let keys = Object.getOwnPropertyNames(data[0]).slice(1);

        data = data.map(v => {
            v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
            return v;
        });
        data.sort((a: any, b: any) => b.total - a.total);

        this.x.domain(data.map((d: any) => d.State));
        this.y.domain([0, d3.max(data, (d: any) => d.total)]).nice();
        this.z.domain(keys);

        this.g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", (d: any) => this.z(d.key))
            .selectAll("rect")
            .data((d: any) => d)
            .enter().append("rect")
            .attr("x", (d: any) => this.x(d.data.State))
            .attr("y", (d: any) => this.y(d[1]))
            .attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
            .attr("width", this.x.bandwidth());

        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(this.y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", this.y(this.y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population");

        let legend = this.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d: any, i:any) => "translate(0," + i * 20 + ")");

        legend.append("rect")
            .attr("x", this.width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z);

        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text((d:any) => d);
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
                <svg className="container" ref={(ref: SVGSVGElement) => this.barchart = ref}
                    width="500" height="500">
                </svg>
            </div>
        </div>
    }
}