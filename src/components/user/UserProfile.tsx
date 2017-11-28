import * as React from "react";
import { FormGroup, ControlLabel, Button } from "react-bootstrap"
import { EventList } from "../events/EventList"
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { connect } from "react-redux";
import { AuthenticationState } from "../../common/state/Auth";

interface Props {
    authState?: AuthenticationState
}

export class UserProfilePresentation extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    getLoggedInUserId(): string {
        return this.props.authState.loggedIn ? this.props.authState.user_id : ""
    }

    render() {
        return (
            <div>
                <h1>{this.props.authState.first_name}'s Profile</h1>

                <div>
                    <h2>Hosted Events</h2>
                    <EventList showFilterButton={false} filters={{ hostUserId: this.getLoggedInUserId() }} />
                </div>
                <br/>
                <div>
                    <h2>Attended Events</h2>
                    <EventList showFilterButton={false} filters={{ attendeeUserId: this.getLoggedInUserId() }} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState
    }
}

export const UserProfile = connect(mapStateToProps, null)(UserProfilePresentation);