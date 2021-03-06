import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {removeTodo} from "../redux/actions/todoActions";
import axios from 'axios';
var Confirm = require('react-confirm-bootstrap');



class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { completed: false, deleted: false};
    this.handleCompleteClick = this.handleCompleteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleCompleteClick(){
    this.setState({
      completed: !this.state.completed
    });
  }

  handleDeleteClick(){
    let todo = {title: this.props.todo}
    axios.post("http://localhost:4000/remove", todo)
    this.props.action(removeTodo(this.props.todo))
  }

  render() {
    let completedButtonStyle = "inverse"
    let todoStyle
    if(this.state.completed){
      completedButtonStyle = "primary"
      todoStyle = {
        "backgroundColor": "lightgrey",
        "opacity": "0.3"
      }
    }
    let deleteTodo =
      <Confirm
          onConfirm={this.handleDeleteClick}
          body="Are you sure you want to delete this todo task?"
          confirmText="Confirm Delete"
          title="Deleting Stuff">
          <Button bsSize="xs" bsStyle="danger" type="button"><span className="glyphicon glyphicon-remove todo-button"></span></Button>
      </Confirm>
    return (
      <div style={todoStyle} className="todo-div">
        <p className="todo">{this.props.todo}</p>
        <div className="buttons">
          <Button onClick={this.handleCompleteClick} bsSize="xs" bsStyle={completedButtonStyle} type="button"><span className="glyphicon glyphicon-ok todo-button"></span></Button>
          {deleteTodo}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    todos: state.todos.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(removeTodo, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
