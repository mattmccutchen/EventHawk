import * as React from "react";
import { FormControl } from "react-bootstrap";
import { FilterLink } from "../navigation/FilterLink";
import { EventCategory, EventCategoryName } from "../../services/events";
import { EventListFilterSetting } from "../events/EventListFilterSetting";

interface CategoryPickerProps {
    handleInputChange(event: any): void
    selectedCategory?: EventCategory
    filters?: EventListFilterSetting,
    // Should the category picker show the "All" category?
    allowAll?: boolean
    renderAs: "dropdown" | "links"
}

export default function CategoryPicker(props: CategoryPickerProps) {
    let categories = [
        EventCategory.ART,
        EventCategory.GAMES,
        EventCategory.EDUCATION,
        EventCategory.MUSIC,
        EventCategory.SPORTS
    ]

    if (props.allowAll) {
        categories.unshift(EventCategory.ALL);
    }

    switch (props.renderAs) {
        case "dropdown":
            return (
                <FormControl name="category" onChange={props.handleInputChange} componentClass="select" placeholder="select">
                    {
                        categories.map(
                            (category) =>
                                (
                                    <option value={category} selected={props.selectedCategory == category}>
                                        {EventCategoryName.get(category)}
                                    </option>
                                )
                        )
                    }
                </FormControl>
            )
            
        case "links":
            return (
                <ul>
                    {
                        categories.map((category) => (
                            <li><FilterLink to="" filter={category} filterSetting={props.filters} onFilterApplied={props.handleInputChange}>{EventCategoryName.get(category)}</FilterLink></li>
                        ))
                    }
                </ul>
            );
    }
}