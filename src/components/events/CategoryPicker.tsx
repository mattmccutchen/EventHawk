import * as React from "react";
import { FormControl } from "react-bootstrap";
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
    );
}