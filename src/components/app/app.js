import React from 'react';

import './app.css';
import Header from '../header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends React.Component {
  idItem = 1;

  state = {
    todos: [],
  };

  deleteTask = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newArray = todos.filter((el, index) => index !== idx);
      return {
        todos: newArray,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({ todos }) => {
      const newArray = [...todos, newTask];
      return {
        todos: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((elem) => elem.id === id);
    const propertyName = 'done';
    const oldItem = todos[index];
    const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName] };

    const newArray = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];

    this.setState(() => ({
      todos: newArray,
    }));
  };

  onEdit = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((elem) => elem.id === id);
    const propertyName = 'edit';

    const oldItem = todos[index];
    const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName] };

    const newArray = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];

    this.setState(() => ({
      todos: newArray,
    }));
  };

  updateTask = (id, text) => {
    const { todos } = this.state;
    const index = todos.findIndex((elem) => elem.id === id);
    const oldItem = todos[index];
    const newItem = { ...oldItem, taskName: text, edit: false };
    const newArray = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];
    this.setState(() => ({
      todos: newArray,
    }));
  };

  deleteCompletedTask = () => {
    this.setState(({ todos }) => {
      const newArray = todos.filter((el) => el.done === false);
      return {
        todos: newArray,
      };
    });
  };

  activeTasks = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        const elem = { ...el };
        if (elem.done === true) {
          elem.view = false;
          return elem;
        }
        elem.view = true;
        return elem;
      });

      return {
        todos: newArray,
      };
    });
  };

  allTasks = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        const elem = { ...el };
        elem.view = true;
        return elem;
      });

      return {
        todos: newArray,
      };
    });
  };

  completedTasks = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        const elem = { ...el };
        if (elem.done === true) {
          elem.view = true;
          return elem;
        }
        elem.view = false;
        return elem;
      });

      return {
        todos: newArray,
      };
    });
  };

  createTask(taskName) {
    this.idItem += 1;
    return {
      taskName,
      done: false,
      edit: false,
      view: true,
      updateText: '',
      id: this.idItem,
    };
  }

  render() {
    const { todos } = this.state;
    const countTodo = todos.filter((el) => el.done === false).length;

    return (
      <div className="todoapp">
        <Header />
        <NewTaskForm onAdded={this.addTask} />
        <section className="main">
          <TaskList
            todos={todos}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEditing={this.onEdit}
            onUpdate={this.updateTask}
          />
          <Footer
            todos={todos}
            countTodo={countTodo}
            onDeleteCompletedTask={this.deleteCompletedTask}
            onActiveTasks={this.activeTasks}
            onAllTasks={this.allTasks}
            onCompletedTasks={this.completedTasks}
          />
        </section>
      </div>
    );
  }
}
