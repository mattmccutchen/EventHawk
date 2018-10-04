import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";
import { AuthenticationState } from "../../common/state/Auth";
import { setUserState } from "../../actions/AuthenticationActions";

interface registerProps extends RouteComponentProps<{}> {
    loginUser(data: AuthenticationState): void
}

export interface registerState { firstName: string, lastName: string, password: string };

class RegisterComponent extends React.Component<registerProps, registerState> {

    constructor(props: registerProps) {
        super(props);
        this.state = { firstName: "", lastName: "", password: "" };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        UserService.performRegister(this.state.firstName, this.state.lastName, this.state.password).then((r_res) => {
            if (r_res.status == 201) {
                UserService.performLogin(r_res.data.email, this.state.password).then((l_res) => {
                    if (l_res.status == 201) {
                        UserService.saveToken(l_res.data.jwt);
                        this.props.loginUser({ 
                            loggedIn: true, 
                            user_id: r_res.data.user_id,
                            first_name: r_res.data.first_name,
                            last_name: r_res.data.last_name,
                            email: r_res.data.email
                        });
                    }
                }).then(() => {
                    this.props.history.push("/");
                });;
            } else {
                // TODO: Proper application-wide exception handling
            }
        })
    }

    render() {
        return <div className="auth-form signup">
            <h2>Sign Up</h2>
            <span>To join EventHawk, enter your full name and choose a password.</span>
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="auth-signup-name">
                    <input type="text" ref="register-first-name" placeholder="First Name" onChange={e => this.setState({firstName: e.target.value})} />
                    <input type="text" ref="register-last-name" placeholder="Last Name" onChange={e => this.setState({lastName: e.target.value})} />
                </div>
                <input type="password" className="register-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                <input type="submit" value="Sign Up" />
            </form>
            <span className="auth-switch">Already a member? <Link to="/login">Sign in</Link></span>
        </div>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (data: AuthenticationState) => {
            dispatch(setUserState(data))
        }
    }
}

export const Register = connect(null, mapDispatchToProps)(withRouter(RegisterComponent))