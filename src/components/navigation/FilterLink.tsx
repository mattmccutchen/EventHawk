import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { EventListFilterSetting } from "../events/EventListFilterSetting";
import { EventCategory } from "../../services/events";

interface FilterLinkProps extends LinkProps {
    filter: number,
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

    mousedown() {
        this.setState({ active: "" });
        document.removeEventListener("mousedown", this.mousedown);
    }

    onclick(e: React.MouseEvent<HTMLAnchorElement>) {
        let newFilter: EventListFilterSetting = {
            category: this.props.filter
        }
        this.props.onFilterApplied(newFilter);
        this.setState({ active: "active" });
        document.addEventListener("mousedown", this.mousedown);
    }

    render() {
        return <Link to={""} className={this.state.active} onClick={e => this.onclick(e)}>{this.props.children}</Link>;
    }
}