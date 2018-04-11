import React from "react";
import Link from "../components/Link";
import * as actionType from "../constants";

const FilterLink = () => (
    <React.Fragment>
        {"SHOW: "}
        <Link filter={ actionType.SHOW_ALL }>
            All
        </Link>
        {" "}
        <Link filter={ actionType.SHOW_ACTIVE }>
            Active
        </Link>
        {" "}
        <Link filter={ actionType.SHOW_COMPLETED }>
            Completed
        </Link>
    </React.Fragment>
);

export default FilterLink;
