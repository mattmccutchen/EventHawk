import * as React from "react";
import { ButtonToolbar, Button, Label, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { EventListFilterSetting } from "./EventListFilterSetting";
import { EventCategory, EventCategoryName } from "../../services/events"
import CategoryPicker from "./CategoryPicker";

interface Props {
    onFilterApplied(newFilter: EventListFilterSetting): any
    history: { push(path: string): any }
    filters: EventListFilterSetting
}

interface State {
    category: EventCategory;
}

export class EventListFilter extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            category: props.filters.category
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFilterApplied = this.handleFilterApplied.bind(this)
    }

    handleFilterApplied() {
        let newFilter: EventListFilterSetting = {
            category: this.state.category,
            sort: this.props.filters.sort
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
                        <CategoryPicker renderAs="links" allowAll={true} selectedCategory={this.state.category} handleInputChange={this.handleInputChange} />
                    </FormGroup>
                    <Button onClick={this.handleFilterApplied}>Apply</Button>
                </form>
            </div>
        );
    }

}
