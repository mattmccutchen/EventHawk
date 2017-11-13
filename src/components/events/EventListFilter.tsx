import * as React from "react";
import { ButtonToolbar, Button, Label, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { EventListFilterSetting } from "./EventListFilterSetting";

interface Props {
    onFilterApplied(newFilter: EventListFilterSetting): any
    history: {push(path: string): any}
}

interface State {
    hostUserId: string;
}

export class EventListFilter extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            hostUserId: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFilterApplied = this.handleFilterApplied.bind(this)
    }

    handleFilterApplied() {
        let newFilter: EventListFilterSetting = {
            hostUserId: this.state.hostUserId
        }

        this.props.onFilterApplied(newFilter);

        this.props.history.push("/");
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h1>Filter</h1>

                <form>
                    <FormGroup>
                        <ControlLabel>Hosted by:</ControlLabel>
                        <FormControl name="hostUserId" onChange={this.handleInputChange} type="text" />
                    </FormGroup>
                    <Button onClick={this.handleFilterApplied}>Apply</Button>
                </form>
            </div>
        );
    }

}
