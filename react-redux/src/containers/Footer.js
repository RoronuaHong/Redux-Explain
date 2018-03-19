import React from "react";
import * as actionType from "../constants";
import Link from "../components/Link";

const Footer = () => (
    <React.Fragment>
        <span>Show:</span>
        <Link 
            filter={ actionType.SHOW_ALL }
        >
            All
        </Link>
        {" "}
        <Link
            filter={ actionType.SHOW_ACTIVE }
        >
            Active
        </Link>
        {" "}
        <Link 
            filter={ actionType.SHOW_COMPLETED }
        >
            Completed
        </Link>
    </React.Fragment>
);

export default Footer; 
