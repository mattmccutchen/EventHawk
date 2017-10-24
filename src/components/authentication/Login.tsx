import * as React from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

const mapStateToProps = (state: React.ComponentState) => ({
    state: state
});

export interface loginState { email: string, password: string };

export class Login extends React.Component<{}, loginState> {
    constructor() {
        super();
        this.state = { email: "", password: "" };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        UserService.performLogin(this.state.email, this.state.password);
    }

    render() {
        return <div className="auth-form">
            <h2>Sign In</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <label> Email: 
                    <input type="text" ref="login-email" placeholder="email" onChange={e => this.setState({email: e.target.value})} />
                </label>
                <label> Password:
                    <input type="password" className="login-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    }
}