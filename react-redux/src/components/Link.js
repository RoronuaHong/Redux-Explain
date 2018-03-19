import React from "react";
import { connect } from "react-redux";
import { visibilityFilter } from "../actions";

const Link = ({ handlerClick, children, active}) => {
    return (
        <button
            onClick={ handlerClick }
            disabled={ active }
            style={{
                marginLeft: "4px"
            }}
        >
            { children }
        </button>
    )
}

const mapStateToProps = (state, ownProps) => ({
    active: state.visibilityFilter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handlerClick: () => dispatch(visibilityFilter(ownProps.filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);
