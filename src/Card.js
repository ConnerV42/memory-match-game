import React, { Component } from 'react';
import "./Card.css";
import PropTypes from 'prop-types';

const Card = props => {
    const style = {
        backgroundColor: "gray"
    }

    if (props.showing) {
        style.backgroundColor = props.backgroundColor;
    }

    return (
        <div
            className="Card"
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