import * as React from "react";
import { FormControl } from "react-bootstrap";
import { EventCategory, EventCategoryName } from "../../services/events";

interface CategoryPickerProps {
    handleInputChange(event: any): void
    selectedCategory?: EventCategory
}

export default function CategoryPicker(props: CategoryPickerProps) {
    return (
        <FormControl name="category" onChange={props.handleInputChange} componentClass="select" placeholder="select">
            {
                [
                    EventCategory.ALL,
                    EventCategory.ART,
                    EventCategory.GAMES,
                    EventCategory.EDUCATIONAL,
                    EventCategory.FOOD,
                    EventCategory.MUSIC,
                    EventCategory.SPORTS
                ].map(
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