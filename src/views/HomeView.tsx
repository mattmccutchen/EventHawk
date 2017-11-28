import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EventList } from "../components/events/EventList";
import { UserService } from "../services/user";
import { EventHawkAppState } from "../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../common/state/Auth";

interface HomeProps {
    authState?: AuthenticationState
    history?: { push(path: string): any }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState
    }
}

class HomeViewComponent extends React.Component<HomeProps, {}> {

    constructor(props: HomeProps) {
        super(props);
    }

    componentWillMount() {
        if (!UserService.isLoggedIn()) {
            this.props.history.push("/login");
        }
    }

    render() {
        return <div>
            <h1>Upcoming Events</h1>
            { UserService.isLoggedIn() && <EventList showFilterButton={true} /> }
        </div>
    }
}

export const HomeView = withRouter(connect(mapStateToProps, null)(HomeViewComponent));