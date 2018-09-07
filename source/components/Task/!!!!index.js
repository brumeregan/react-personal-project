// Core
import React, {PureComponent} from 'react';

// Instruments
import Styles from './styles.m.css';
import classNames from 'classnames';
import PropTypes from "prop-types";


// Components
import Star from '../../theme/assets/Star';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';


export default class Task extends PureComponent {

    static propTypes = {
        id: PropTypes.string,
        completed: PropTypes.bool,
        favorite: PropTypes.bool,
        message: PropTypes.string,
        _removeTaskAsync: PropTypes.func.isRequired,
        _updateTaskAsync: PropTypes.func.isRequired,
    };

    _getTaskShape = ({
                         id = this.props.id,
                         completed = this.props.completed,
                         favorite = this.props.favorite,
                         message = this.props.message,
                     }) => ({
        id,
        completed,
        favorite,
        message,
    });

    state = {
        newMessage: this.props.message,
        isTaskEditing: false,
    };

    taskInput = React.createRef();

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    };

    _setTaskEditingState = (isTaskEditing = true) => {
        this.taskInput.current.disabled = !isTaskEditing;

        if (isTaskEditing) {
            this.taskInput.current.focus();
        }

        this.setState({
            isTaskEditing,
        });
    };



    _toggleTaskFavoriteState = () => {
        const {_updateTaskAsync, favorite} = this.props;

        _updateTaskAsync(this._getTaskShape({
            favorite: !favorite,
        }));

    };

    _toggleTaskCompletedState = () => {
        const {_updateTaskAsync, completed} = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                completed: !completed,
            })
        );

    };

    _updateTask = () => {
        const { _updateTaskAsync, message } = this.props;
        const { newMessage } = this.state;

        if (message !== newMessage) {
            _updateTaskAsync(
                this._getTaskShape({
                    message: newMessage,
                })
            );
        }
        this._setTaskEditingState(false);

        return null;

    };

    _updateNewTaskMessage = (e) => {
        const { value: newMessage } = e.target;

        this.setState({ newMessage });
    };


    _updateTaskMessageOnKeyDown = (e) => {
        const {newMessage} = this.state;

        const isEnter = e.key === 'Enter';
        const isEsc = e.key === 'Escape';

        if (!newMessage) {
            return null;
        }

        if(isEsc) {
            this._cancelUpdatingTaskMessage();
        }

        if (isEnter) {
            this._updateTask();
        }
    };

    _updateTaskMessageOnClick = () => {
        console.log('dddd');
        const { isTaskEditing } = this.state;

        if(isTaskEditing) {
            this._updateTask();

            return null;
        }

        this._setTaskEditingState(true);
    };

    _cancelUpdatingTaskMessage = () => {
        const { message: newMessage } = this.props;

        this._setTaskEditingState(false);

        this.setState({
            newMessage,
        });
    };


    render() {
        const { isTaskEditing, newMessage } = this.state;
        const { favorite, completed } = this.props;

        return (
            <li className = { classNames(Styles.task, {
                [Styles.completed]: completed,
            })} >
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = {this._toggleTaskCompletedState}
                    />

                    <input

                        disabled
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = { 'text' }
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown}
                    />
                </div>


                <div className={Styles.actions}>
                    <Star
                        inlineBlock
                        checked={favorite}
                        className={Styles.toggleTaskFavoriteState}
                        color1='#3B8EF3'
                        color2='#000'
                        onClick={this._toggleTaskFavoriteState}
                    />

                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        width = { 19 }
                        onClick = { this._updateTaskMessageOnClick }
                    />

                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
