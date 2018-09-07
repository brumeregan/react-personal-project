import React, { Component } from 'react';
import Checkbox from '../../theme/assets/Checkbox';

export default class Footer extends Component {
    render () {
        const { _completeAllTasks, Styles } = this.props;

        return (
            <footer>
                <Checkbox
                    checked = { false }
                    color1 = '#363636'
                    color2 = '#fff'
                    height = { 25 }
                    width = { 25 }
                    onClick = { _completeAllTasks }
                />
                <span className = { Styles }> Все задачи выполнены </span>
            </footer>
        );
    }
}
