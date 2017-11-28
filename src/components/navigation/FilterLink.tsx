import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { EventListFilterSetting } from "../events/EventListFilterSetting";
import { EventCategory } from "../../services/events";

interface FilterLinkProps extends LinkProps {
    filter: number,
    filterSetting: EventListFilterSetting,
    onFilterApplied(newFilter: EventListFilterSetting): any
};

interface FilterState {
    active: string,
    category: EventCategory
};

export class FilterLink extends React.Component<FilterLinkProps, FilterState> {

    constructor(props: FilterLinkProps) {
        super(props);
        this.state = {
            active: "",
            category: null
        };

        this.onclick = this.onclick.bind(this);
        this.mousedown = this.mousedown.bind(this);
    }

    componentWillMount() {
        if (this.props.filterSetting && this.props.filter === this.props.filterSetting.category) {
            this.setState({ active: "active" });
            document.addEventListener("mousedown", this.mousedown);
        }
    }

    mousedown(e: MouseEvent) {
        if (document.getElementById("sidebar_filter_links") !== null) {
            if (document.getElementById("sidebar_filter_links").contains(e.toElement)) {
                this.setState({ active: "" });
                document.removeEventListener("mousedown", this.mousedown);
            }
        }
    }

    onclick(e: React.MouseEvent<HTMLAnchorElement>) {
        document.getElementById("app_context").classList.add("loading");
        let newFilter: EventListFilterSetting = {
            category: this.props.filter,
            sort: this.props.filterSetting.sort
        }
        this.props.onFilterApplied(newFilter);

        this.setState({ active: "active" });
        document.addEventListener("mousedown", this.mousedown);
        document.getElementById("app_context").classList.remove("loading");
    }

    render() {
        return <Link to={""} className={this.state.active} onClick={e => this.onclick(e)}>{this.props.children}</Link>;
    }
}