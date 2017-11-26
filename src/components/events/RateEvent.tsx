import * as React from "react";
import { ButtonToolbar, Button, Label, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton, Form, Col } from "react-bootstrap"
import { EventItem } from "./EventItem";
import { FormEvent } from "react";

interface Props {
    handleSubmitRating: (hostPreparedness: number, matchedDescription: number, wouldReturn: boolean) => void
}

interface State {
    hostPreparedness: number,
    matchedDescription: number,
    wouldReturn: number // 1 = yes, 0 = no
}

export class RateEvent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            hostPreparedness: 5,
            matchedDescription: 5,
            wouldReturn: 1
        }
        
        this.handlePreparednessChanged = this.handlePreparednessChanged.bind(this);
        this.handleMatchedDescriptionChanged = this.handleMatchedDescriptionChanged.bind(this);
        this.handleWouldReturnChanged = this.handleWouldReturnChanged.bind(this);
    }

    handlePreparednessChanged(value: any) {
        this.setState({ hostPreparedness: value})
    }

    handleMatchedDescriptionChanged(value: any) {
        this.setState({ matchedDescription: value})
    }

    handleWouldReturnChanged(value: any) {
        this.setState({ wouldReturn: value})
    }

    handleClickSubmit() {
        const hostPreparedness = this.state.hostPreparedness;
        const matchedDescription = this.state.matchedDescription;
        const wouldReturn = this.state.wouldReturn ? true : false

        this.props.handleSubmitRating(
            hostPreparedness, matchedDescription, wouldReturn
        )
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Host preparedness</Col>
                        <Col sm={8}>
                            <ToggleButtonGroup onChange={this.handlePreparednessChanged} type = "radio" name="hostPreparedness" value={this.state.hostPreparedness}>
                                <ToggleButton value={1}>1</ToggleButton>
                                <ToggleButton value={2}>2</ToggleButton>
                                <ToggleButton value={3}>3</ToggleButton>
                                <ToggleButton value={4}>4</ToggleButton>
                                <ToggleButton value={5}>5</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Matched description</Col>
                        <Col sm={8}>
                            <ToggleButtonGroup onChange={this.handleMatchedDescriptionChanged}  type="radio" name="matchedDescription" value={this.state.matchedDescription}>
                                <ToggleButton value={1}>1</ToggleButton>
                                <ToggleButton value={2}>2</ToggleButton>
                                <ToggleButton value={3}>3</ToggleButton>
                                <ToggleButton value={4}>4</ToggleButton>
                                <ToggleButton value={5}>5</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Would return</Col>
                        <Col sm={8}>
                            <ToggleButtonGroup onChange={this.handleWouldReturnChanged}  type="radio" name="wouldReturn" value={this.state.wouldReturn}>
                                <ToggleButton value={1}>Yes</ToggleButton>
                                <ToggleButton value={0}>No</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </FormGroup>
                    <Button onClick={() => this.handleClickSubmit()}>Submit</Button>
                </Form>
            </div >
        );
    }

}