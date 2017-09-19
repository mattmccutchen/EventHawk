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
        return <div>
            <form onSubmit={e => this.onSubmit(e)}>
                <input type="text" placeholder="email" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    }
}