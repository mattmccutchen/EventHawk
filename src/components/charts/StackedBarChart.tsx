import * as React from "react";
import * as d3 from "d3";

interface IStackedBarChartProps {
    data: any[]
}

interface Margin {
    left: number,
    top: number,
    right: number,
    bottom: number
}

interface IStackedBarChartState {
    margin: Margin,
    width: number,
    height: number,
}

export class StackedBarChart extends React.Component<IStackedBarChartProps, IStackedBarChartState> {

    private barchart: any;
    private x: any;
    private y: any;
    private z: any;
    private g: any;

    constructor(props: IStackedBarChartProps) {
        super(props);
        this.getBarChart = this.getBarChart.bind(this);
        this.drawChart = this.drawChart.bind(this);
        this.state = {
            margin: { left: 40, top: 20, right: 20, bottom: 30 },
            width: 500,
            height: 500
        }
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.getBarChart();
            this.drawChart();
        }
    }

    getBarChart() {
        this.barchart = d3.select('svg');
        this.setState({
            width: +this.barchart.attr('width') - this.state.margin.left - this.state.margin.right,
            height: +this.barchart.attr('height') - this.state.margin.top - this.state.margin.bottom,
        });
        this.g = this.barchart.append("g").attr("transform", "translate(" + this.state.margin.left + "," + this.state.margin.top + ")"),
        this.x = d3.scaleBand().rangeRound([0, this.state.width]).paddingInner(0.05).align(0.1),
        this.y = d3.scaleLinear().rangeRound([this.state.height, 0]),
        this.z = d3.scaleOrdinal().range(["#98abc5", "#8a89a6"])
    }

    private drawChart() {
        let data = this.props.data;
        let keys = Object.getOwnPropertyNames(data[0]).slice(1);

        data = data.map(v => {
            v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
            return v;
        });
        data.sort((a: any, b: any) => b.total - a.total);
        console.log(this.state);
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
            .attr("x", 160)
            .attr("y", (d: any) => this.y(d[1]))
            .attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
            .attr("width", 100);

        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.state.height + ")")
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

        let legend = this.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d: any, i:any) => "translate(0," + i * 20 + ")");

        legend.append("rect")
            .attr("x", this.state.width + 9)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z);

        legend.append("text")
            .attr("x", this.state.width)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text((d:any) => d);
    }

    render() {
        return <svg className="container" ref={(ref: SVGSVGElement) => this.barchart = ref}
            width="500" height="500"></svg>
    }
}