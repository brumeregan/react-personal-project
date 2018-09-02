import React, { Component } from 'react';


export default class Header extends Component {
    render() {
        return (
            <header>
                <h1>Task planner</h1>
                <input type="text" placeholder="search for task" />
            </header>
        );
    }
}
