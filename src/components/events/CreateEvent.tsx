import * as React from "react";
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from "react-bootstrap"
import CategoryPicker from "./CategoryPicker";
import { EventCategory, EventService, CreateEventItem } from "../../services/events";
import * as Datetime from 'react-datetime';
import * as moment from "moment";
import { EventItem } from "./EventItem";
import { withRouter } from "react-router";

interface Props {
    history?: { push(path: string): any }
}

interface State {
    category: EventCategory,
    eventTitle: string,
    eventDescription: string,
    eventDateTime: moment.Moment,
    eventLocation: string,
    eventCapacity: number,
    createResultMessage: string,
    validationState: { [key: string]: boolean }
}

class CreateEventPresentation extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            category: EventCategory.ART,
            eventTitle: null,
            eventDescription: null,
            eventDateTime: moment().add(7, 'days'),
            eventLocation: null,
            eventCapacity: 5,
            createResultMessage: null,
            validationState: {},
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const fieldValue = target.value.trim();
        const fieldName = target.name;

        //TODO: Use immutability-helpers
        let validationState = Object.assign({}, this.state.validationState);

        switch (fieldName) {
            case "eventCapacity":
                // Capcity must be an integer >= 5 and <= 50
                validationState[fieldName] = (/^\d+$/.test(fieldValue) && parseInt(fieldValue) >= 5 && parseInt(fieldValue) <= 50)
                break;
            default:
                validationState[fieldName] = true;
        }

        if (validationState[fieldName]) {
            this.setState({ [fieldName]: fieldValue } as any);
        }

        this.setState({
            validationState: validationState
        });

    }

    getValidationState(fieldName: string): "success" | "warning" | "error" {
        if (fieldName in this.state.validationState) {
            return this.state.validationState[fieldName] ? "success" : "error";
        }
        return null;
    }

    handleDatetimeChange(value: moment.Moment | string) {
        let validationState = Object.assign({}, this.state.validationState);

        if (value instanceof moment && (value as moment.Moment).isAfter(Date.now())) {
            validationState.eventDateTime = true;
            this.setState({
                eventDateTime: value as moment.Moment
            });
        } else {
            //Datetime picker sets value to instanceof string if it's not a valid date time
            validationState.eventDateTime = false;
        }

        this.setState({
            validationState: validationState
        });
    }

    isSelectableDate(current: moment.Moment) {
        return current.isAfter(moment().subtract(1, 'day'));
    };

    handleCreateEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let newEvent: CreateEventItem = {
            name: this.state.eventTitle,
            description: this.state.eventDescription,
            time: this.state.eventDateTime,
            location: this.state.eventLocation,
            totalCapacity: this.state.eventCapacity,
            category: this.state.category
        }

        EventService.createEvent(newEvent).then(
            (result: { succeeded: boolean, message: string }) => {
                let validationState = Object.assign({}, this.state.validationState);
                validationState["createResult"] = result.succeeded;

                this.setState({
                    createResultMessage: result.message,
                    validationState: validationState
                })

                if (result.succeeded) {
                    setTimeout(function() { this.props.history.push("/"); }.bind(this), 2000);   
                }
            }
        );
    }

    reportResult(result: string) {

    }

    render() {
        return (
            <div className="event-form">
                <h2>New Event</h2>
                <span>To create an event, enter the following information:</span>
                <form onSubmit={e => this.handleCreateEvent(e)}>
                    <input type="text" placeholder="Title" onChange={this.handleInputChange} name="eventTitle" />
                    <input type="text" placeholder="Description" onChange={this.handleInputChange} name="eventDescription" />
                    <div className="create-event-date-location">
                        <Datetime isValidDate={this.isSelectableDate} value={this.state.eventDateTime} onChange={this.handleDatetimeChange} />
                        <input type="text" placeholder="Location" onChange={this.handleInputChange} name="eventLocation" />
                    </div>
                    <input type="number" placeholder="Capacity" min="0" step="1" onChange={this.handleInputChange} defaultValue={this.state.eventCapacity.toString()} name="eventCapacity" />
                    <CategoryPicker renderAs="dropdown" allowAll={false} handleInputChange={this.handleInputChange} filters={null} selectedCategory={this.state.category} />
                    <input type="submit" value="Create Event" />
                </form>
            </div>
        )
    }
}

export const CreateEvent = withRouter(CreateEventPresentation)