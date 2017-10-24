import * as React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap"

export class CreateEvent extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email address</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Event name</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Location</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Time</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Capacity</ControlLabel>
                    <FormControl type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Category</ControlLabel>
                    <FormControl componentClass="select">
                        <option value="select">Basketball</option>
                        <option value="other">Baseball</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" />
                </FormGroup>
            </form>
        )
    }
}