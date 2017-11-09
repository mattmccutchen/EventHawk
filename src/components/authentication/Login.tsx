import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

const mapStateToProps = (state: React.ComponentState) => ({
    state: state
});

export interface loginState { email: string, password: string, reroute: boolean };

export class Login extends React.Component<{}, loginState> {
    constructor() {
        super();
        this.state = { email: "", password: "", reroute: false };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        UserService.performLogin(this.state.email, this.state.password).then((res) => {
            if (res.status == 201) {
                UserService.saveToken(res.data.jwt);
                this.setState({ reroute: true });
            } else {

            }
        });
    }

    render() {
        return <div className="auth-form">
            <h2>Sign In</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <label> Email: 
                    <input type="text" ref="login-email" placeholder="Email" onChange={e => this.setState({email: e.target.value})} />
                </label>
                <label> Password:
                    <input type="password" className="login-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {this.state.reroute == true && <Redirect push to="/" /> }
        </div>
    }
};