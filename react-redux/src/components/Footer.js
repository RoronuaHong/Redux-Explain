import React from "react";
import FilterLink from "../containers/FilterLink";
import { VisibilityFilter } from "../actions";

const Footer = () => (
    <p>
        Show:
        { ' ' }
        <FilterLink filter={ VisibilityFilters.SHOW_ALL }>
            All
        </FilterLink>
        { ', ' }
        <FilterLink filter={ VisibilityFilter.SHOW_ACTIVE }>
            Active
        </FilterLink>
        <FilterLink filter={ VisibilityFilter.SHOW_COMPLETED }>
            Completed
        </FilterLink>
    </p>
);

export default Footer;