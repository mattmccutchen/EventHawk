import * as React from "react";
import { withRouter, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../../common/state/Auth";

interface AppRouteProps extends RouteProps { 
    key: number, 
    auth: number,
    authState?: AuthenticationState,
    history?: { push(path: string): any }
}

class AppRouteComponent extends React.Component<AppRouteProps, {}> {

    /**
     * auth 0   Component does not require user to be logged in, can be viewed by anyone
     *      1   Component requires user to be logged in
     *      2   Component is a guest-only view, can be viewed only by users not logged-in
     */
    render() {
        let el: JSX.Element = <Route key={this.props.key} path={this.props.path} 
            exact={this.props.exact} component={this.props.component} />

        if (this.props.auth === 0 || 
            (this.props.auth === 1 && this.props.authState.loggedIn) || 
            (this.props.auth === 2 && !this.props.authState.loggedIn)) {
            return el;
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState
    }
}

export const AppRoute = withRouter(connect(mapStateToProps, null)(AppRouteComponent));