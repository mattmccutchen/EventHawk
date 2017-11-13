import * as React from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

interface registerProps {}

export interface registerState { firstName: string, lastName: string, email: string, password: string };

export class Register extends React.Component<{}, registerState> {
    constructor(props: registerProps) {
        super(props);
        this.state = { firstName: "", lastName: "", email: "", password: "" };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //UserService.performLogin(this.state.email, this.state.password);
    }

    render() {
        return <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <label> First Name: 
                    <input type="text" ref="register-first-name" placeholder="First Name" onChange={e => this.setState({firstName: e.target.value})} />
                </label>
                <label> Last Name: 
                    <input type="text" ref="register-last-name" placeholder="Last Name" onChange={e => this.setState({lastName: e.target.value})} />
                </label>
                <label> Email: 
                    <input type="text" ref="register-email" placeholder="Email" onChange={e => this.setState({email: e.target.value})} />
                </label>
                <label> Password:
                    <input type="password" className="register-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                </label>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    }
}