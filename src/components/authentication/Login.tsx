import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";
import { AuthenticationState } from "../../common/state/Auth";
import { setUserState } from "../../actions/AuthenticationActions";

interface loginProps {
    loginUser(data: AuthenticationState): void
    history: { push(path: string): void }
}

interface loginState { email: string, password: string };

class LoginComponent extends React.Component<loginProps, loginState> {
    constructor(props: loginProps) {
        super(props);
        this.state = { email: "", password: "" };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        UserService.performLogin(this.state.email, this.state.password).then((res) => {
            if (res.status == 201) {
                UserService.saveToken(res.data.jwt);
                UserService.getUser(UserService.getUserId()).then(res => {
                    this.props.loginUser({ 
                        loggedIn: true, 
                        user_id: UserService.getUserId(),
                        first_name: res.firstName,
                        last_name: res.lastName,
                        email: res.email
                    });
                    this.props.history.push("/");
                });
            } else {
                // TODO: Proper application-wide exception handling
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
        </div>
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (data: AuthenticationState) => {
            dispatch(setUserState(data))
        }
    }
}

export const Login = connect(null, mapDispatchToProps)(withRouter(LoginComponent))