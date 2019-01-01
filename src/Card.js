import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Card = props => {
    const style = {
        backgroundColor: "gray",
        width: "10%",
        minWidth: "100px",
        height: "150px",
        margin: "10px",
        border: "6px solid gray",
        borderRadius: "25px",
        display: "inline-block"
    }

    if (props.showing) {
        style.backgroundColor = props.backgroundColor;
    }

    return (
        <div
            style={style}
            onClick={props.onClick}
        />
    );
};

Card.propTypes = {
    showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Card;