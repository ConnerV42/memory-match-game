import React, { Component } from "react";
import "./Navbar.css";
import PropTypes from 'prop-types';

class Navbar extends Component {
    static defaultProps = {
        onNewGame() { }
    }

    static propTypes = {
        onNewGame: PropTypes.func.isRequired
    }

    render() {
        return (
            <header>
                <h1><a>Memory Match: Find the Matching Pairs!</a></h1>
                <nav>
                    <h1><a onClick={this.props.onNewGame}>New Game</a></h1>
                </nav>
            </header>
        );
    }
}

export default Navbar;