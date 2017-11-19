import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { DropSidebar } from "./DropSidebar";
import { Dropdown, dropdownItem } from "./Dropdown";
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../../common/state/Auth";

interface headerProps {
    authState?: AuthenticationState
    history?: { push(path: string): any }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState
    }
}

class HeaderComponent extends React.Component<headerProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let userArea: JSX.Element;
        if (!this.props.authState.loggedIn) {
            userArea = <div><Link to="/login" className="option">Sign In</Link><Link to="/signup" className="option">Sign Up</Link></div>;
        } else {
            let items: dropdownItem[] = 
            [{
                label: "Profile", link: "/user/" + this.props.authState.user_id 
            }, {
                label: "Sign Out", link: "/user/logout"
            }];
            userArea = <Dropdown className="" text={`${this.props.authState.first_name} ${this.props.authState.last_name}`} items={items}></Dropdown>;
        }

        return <nav className="header">
            <DropSidebar />
            <Link to="/" className="navbar-brand header-logo">EventHawk</Link>
            <div className="options-container">
                <div className="links">
                    <input type="text" className="header-input search" placeholder="Search for events" />
                    <input type="submit" className="header-search-submit" value="" />
                    {userArea}
                </div>
            </div>
        </nav>
    }
}

export const Header = withRouter(connect(mapStateToProps, null)(HeaderComponent));