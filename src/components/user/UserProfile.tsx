import * as React from "react";
import { FormGroup, ControlLabel, Button } from "react-bootstrap"
import { EventList } from "../events/EventList"

export class UserProfile extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>John A. Student's Profile</h1>
                <Button>Change password</Button>

                <FormGroup>
                    <ControlLabel>Planned Events</ControlLabel>
                    <EventList/>
                </FormGroup>
                
                <FormGroup>
                    <ControlLabel>Past Hosted</ControlLabel>
                    <EventList/>
                </FormGroup>
                
                <FormGroup>
                    <ControlLabel>Past Attended</ControlLabel>
                    <EventList/>
                </FormGroup>
            </div>
        )
    }
}