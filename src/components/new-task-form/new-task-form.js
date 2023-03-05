import { Component } from 'react';

import './new-task-form.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
    };
    this.onTaskChange = this.onTaskChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdded } = this.props;
    const { task } = this.state;
    e.preventDefault();
    if (task && task !== ' ') {
      onAdded(task);
    }
    this.setState({
      task: '',
    });
  };

  render() {
    const { task } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          onChange={this.onTaskChange}
          value={task}
        />
      </form>
    );
  }
}

export default NewTaskForm;
