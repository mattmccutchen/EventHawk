import * as React from "react";
import { FormGroup, ControlLabel, FormControl, } from "react-bootstrap"

export class MyEventsView extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>You have no events scheduled.</div>
        )
    }
}