import * as React from "react";
import { withRouter, RouteProps } from "react-router-dom";

export class Maintenance extends React.Component<RouteProps, {}> {

    constructor(props: any) {
        super(props);
    }

    componentDidUpdate(referrer: RouteProps) {
        if (this.props.location != referrer.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        let el: JSX.Element = this.props.children as JSX.Element;
        return el;
    }
};