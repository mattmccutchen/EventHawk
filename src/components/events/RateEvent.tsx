import * as React from "react";
import { ButtonToolbar, Button, Label, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton } from "react-bootstrap"

export class RateEvent extends React.Component {

    render() {
        return (
            <div>
                <h1>Rate</h1>

                <form>
                    <FormGroup>
                        <ControlLabel>Host preparedness</ControlLabel>
                        <ToggleButtonGroup type="radio" name="hostPreparedness" defaultValue={10}>
                            <ToggleButton value={1}>1</ToggleButton>
                            <ToggleButton value={2}>2</ToggleButton>
                            <ToggleButton value={3}>3</ToggleButton>
                            <ToggleButton value={4}>4</ToggleButton>
                            <ToggleButton value={5}>5</ToggleButton>
                            <ToggleButton value={6}>6</ToggleButton>
                            <ToggleButton value={7}>7</ToggleButton>
                            <ToggleButton value={8}>8</ToggleButton>
                            <ToggleButton value={9}>9</ToggleButton>
                            <ToggleButton value={10}>10</ToggleButton>
                        </ToggleButtonGroup>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Matched description</ControlLabel>
                        <ToggleButtonGroup type="radio" name="matchedDescription" defaultValue={10}>
                            <ToggleButton value={1}>1</ToggleButton>
                            <ToggleButton value={2}>2</ToggleButton>
                            <ToggleButton value={3}>3</ToggleButton>
                            <ToggleButton value={4}>4</ToggleButton>
                            <ToggleButton value={5}>5</ToggleButton>
                            <ToggleButton value={6}>6</ToggleButton>
                            <ToggleButton value={7}>7</ToggleButton>
                            <ToggleButton value={8}>8</ToggleButton>
                            <ToggleButton value={9}>9</ToggleButton>
                            <ToggleButton value={10}>10</ToggleButton>
                        </ToggleButtonGroup>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Would return</ControlLabel>
                        <ToggleButtonGroup type="radio" name="wouldReturn" defaultValue={"Yes"}>
                            <ToggleButton value={"Yes"}>Yes</ToggleButton>
                            <ToggleButton value={"No"}>No</ToggleButton>
                        </ToggleButtonGroup>
                    </FormGroup>
                    <Button>Submit</Button>
                </form>
            </div>
        );
    }

}