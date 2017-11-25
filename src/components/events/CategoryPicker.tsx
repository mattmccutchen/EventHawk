import * as React from "react";
import { FormControl } from "react-bootstrap";
import { FilterLink } from "../navigation/FilterLink";
import { EventCategory, EventCategoryName } from "../../services/events";

interface CategoryPickerProps {
    handleInputChange(event: any): void
    selectedCategory?: EventCategory

    // Should the category picker show the "All" category?
    allowAll?: boolean
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

    return (
        <ul>
            {
                categories.map((category) => (
                    <li><FilterLink to="" filter={category} onFilterApplied={props.handleInputChange}>{EventCategoryName.get(category)}</FilterLink></li>
                ))
            }
        </ul>
    );
}