import React from "react";
import { setVisibilityFilter } from "../actions";
import { connect } from "react-redux";

const Link = ({ children, active, onClick }) => (
    <button
        onClick={ onClick }
        disabled={ active }
        style={{
            marginLeft: "4px"
        }}
    >
        { children }
    </button>
);

const mapStateToProps = (state, ownProps) => ({
    active: state.visibilityFilter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);