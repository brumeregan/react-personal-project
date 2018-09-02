import React, { Component } from 'react';

export default class TaskCreation extends Component {

    constructor (props) {
        super(props);
        this.taskText = React.createRef();
    }

    _handlerForSubmit = (event) => {
        event.preventDefault();
        this._submitTask();
    };

    _submitTask = () => {
        // TODO: maybe use state.
        const text =  this.taskText.current.value;

        this.props._createTask({
            message: text,
            completed: false,
            favorite: false
        });

        this.taskText.current.value = null;
    };

    // TODO: add on Enter submit.

    render() {
        return (
          <section>
              <form onSubmit = { this._handlerForSubmit } >
                  <input type = 'text' placeholder = 'Write your task' ref = { this.taskText }/>
                  <button  >Add task</button>
              </form>
          </section>
        );
    }
}
