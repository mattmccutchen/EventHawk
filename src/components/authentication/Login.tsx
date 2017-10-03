import * as React from "react";
import { Link } from "react-router-dom";

const mapStateToProps = (state: React.ComponentState) => ({
    state: state
});

export class Login extends React.Component {
    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {
        return <div className="auth-form">
            <h2>Sign In</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <label> Email: 
                    <input type="text" placeholder="email" />
                </label>
                <label> Password:
                    <input type="password" placeholder="Password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    }
}