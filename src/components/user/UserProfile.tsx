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
                    <EventList filters={{hostUserId: "userA"}}/>
                </FormGroup>
                
                <FormGroup>
                    <ControlLabel >Past Hosted</ControlLabel>
                    <EventList filters={{hostUserId: "userA"}}/>
                </FormGroup>
                
                <FormGroup>
                    <ControlLabel>Past Attended</ControlLabel>
                    <EventList filters={{attendeeUserId: "userA"}}/>
                </FormGroup>
            </div>
        )
    }
}