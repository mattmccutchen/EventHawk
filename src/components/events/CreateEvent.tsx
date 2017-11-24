import * as React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap"
import CategoryPicker from "./CategoryPicker";
import { EventCategory } from "../../services/events";
import * as Datetime from 'react-datetime';
import * as moment from "moment";
import { EventItem } from "./EventItem";

interface Props {
    //history: { push(path: string): any }
}

interface State {
    category: EventCategory,
    eventTitle: string,
    eventDescription: string,
    eventDateTime: moment.Moment,
    eventLocation: string,
    eventCapacity: number,
    [key: string]: any // Have to specify type signature so typescript won't complain when we access properties by string index
}

export class CreateEvent extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            category: EventCategory.ALL,
            eventTitle: null,
            eventDescription: null,
            eventDateTime: moment(),
            eventLocation: null,
            eventCapacity: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    }


    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (this.isValid(event.name, event.value)) {
            this.setState({
                [name]: value
            });
        }
    }

    isValid(fieldName: string, value: any) {
        if (fieldName == "eventCapacity") {
            let capacity = parseInt(value)
            if (capacity) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }

    getValidationState(fieldName: string): "success" | "warning" | "error" {
        return this.isValid(fieldName, this.state[fieldName]) ? "success" : "error";
    }

    handleDatetimeChange(value: moment.Moment | string) {
        if (value instanceof moment) {
            // User entered a valid date time
            this.setState({
                eventDateTime: value as moment.Moment
            });
        }
    }

    handleCreateEvent() {
        let newEvent: EventItem = {
            name: this.state.eventTitle,
            description: this.state.eventDescription,
            time: this.state.eventDateTime.toISOString(),
            location: this.state.eventLocation,
            totalCapacity: this.state.eventCapacity,
            category: this.state.category
        }

        //this.props.history.push("/");
    }

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl name="eventTitle" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl name="eventDescription" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <Datetime value={this.state.eventDateTime} onChange={this.handleDatetimeChange} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Location</ControlLabel>
                    <FormControl name="eventLocation" type="text" />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("eventCapacity")}>
                    <ControlLabel>Capacity</ControlLabel>
                    <FormControl onChange={this.handleInputChange} name="eventCapacity" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Category</ControlLabel>
                    <CategoryPicker handleInputChange={this.handleInputChange} selectedCategory={this.state.category} />
                </FormGroup>
                <Button onClick={this.handleCreateEvent}>Create</Button>
            </form>
        )
    }
}