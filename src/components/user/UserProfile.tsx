import * as React from "react";
import { connect } from "react-redux";
import { match } from "react-router";
import { EventList } from "../events/EventList";
import { UserService, UserItem } from "../../services/user";
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../../common/state/Auth";

interface IUserProfileProps {
    authState?: AuthenticationState,
    match: match<{ id: string }>;
}

interface IUserProfileState {
    id: string,
    user: UserItem
}

class UserProfilePresentation extends React.Component<IUserProfileProps, IUserProfileState> {

    constructor(props: IUserProfileProps) {
        super(props);
        this.state = {
            id: "",
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: ""
            }
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ id: id });
        UserService.getUser(id).then(res => {
            this.setState({ user: res });
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Hosted hosted by {this.state.user.firstName}</h2>
                    {<EventList showFilterButton={false} filters={{ hostUserId: this.state.id }} />} 
                </div>
                <br/>
                <div>
                    <h2>Events attended by {this.state.user.firstName}</h2>
                    <EventList showFilterButton={false} filters={{ attendeeUserId: this.state.id }} />
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