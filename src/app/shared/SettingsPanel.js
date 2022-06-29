import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class SettingsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          task: 'Add New Items',
          isCompleted: false
        },
        
      ],
      todosRtl: [
        {
          id: 1,
          task: 'التقاط الاطفال من المدرسة',
          isCompleted: false
        },
      ],
      inputValue: '',
    }

    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  statusChangedHandler(event, id) {
    const todo = { ...this.state.todos[id] };
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
      todos: todos
    })
  }
  statusChangedHandlerRtl(event, id) {
    const todoRtl = { ...this.state.todosRtl[id] };
    todoRtl.isCompleted = event.target.checked;

    const todosRtl = [...this.state.todosRtl];
    todosRtl[id] = todoRtl;

    this.setState({
      todosRtl: todosRtl
    })
  }

  addTodo(event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false

    })

    this.setState({
      todos: todos,
      inputValue: ''
    })
  }
  addTodoRtl(event) {
    event.preventDefault();

    const todosRtl = [...this.state.todosRtl];
    todosRtl.unshift({
      id: todosRtl.length ? todosRtl[todosRtl.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false

    })

    this.setState({
      todosRtl: todosRtl,
      inputValue: ''
    })
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
      todos: todos
    })
  }
  removeTodoRtl(index) {
    const todosRtl = [...this.state.todosRtl];
    todosRtl.splice(index, 1);

    this.setState({
      todosRtl: todosRtl
    })
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  closeRightSidebar() {
    document.querySelector('.right-sidebar').classList.remove('open');
    //alert("abc")
  }

  render() {
    let date=new Date();
    let Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    date=date.getDate()+' '+Months[date.getMonth()]+' '+date.getFullYear()
    return (
      <div>
        {/* <div id="settings-trigger"><i className="mdi mdi-settings"></i></div> */}
        <div id="right-sidebar" className="settings-panel right-sidebar">
          <i className="settings-close mdi mdi-close" onClick={this.closeRightSidebar}></i>
          <Tabs defaultActiveKey="TODOLIST" className="bg-gradient-primary" id="uncontrolled-tab-example">
            <Tab eventKey="TODOLIST" title="TO DO LIST" className="test-tab">
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="px-3">
                      <div>
                        <h4 className="card-title"><Trans>Todo List</Trans></h4>
                        <form className="add-items d-flex" onSubmit={this.addTodo}>
                          <input
                            type="text"
                            className="form-control h-auto"
                            placeholder="What do you need to do today?"
                            value={this.state.inputValue}
                            onChange={this.inputChangeHandler}
                            required />
                          <button type="submit" className="btn btn-gradient-primary font-weight-bold"><Trans>Add</Trans></button>
                        </form>
                        <div className="list-wrapper">
                          <ul className="todo-list">
                            {this.state.todos.map((todo, index) => {
                              return <ListItem
                                isCompleted={todo.isCompleted}
                                changed={(event) => this.statusChangedHandler(event, index)}
                                key={todo.id}
                                remove={() => this.removeTodo(index)}
                              >{todo.task}</ListItem>
                            })}
                          </ul>
                          <ul className="todo-list rtl-todo">
                            {this.state.todosRtl.map((todoRtl, index) => {
                              return <ListItem
                                isCompleted={todoRtl.isCompleted}
                                changed={(event) => this.statusChangedHandler(event, index)}
                                key={todoRtl.id}
                                remove={() => this.removeTodoRtl(index)}
                              >{todoRtl.task}</ListItem>
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="events py-4 border-bottom px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="mdi mdi-circle-outline text-primary mr-2"></i>
                    <span>{date}</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">Create Task</p>
                  <p className="text-gray mb-0">Create task helps to remember things memorable.</p>
                </div>
                
              </div>
            </Tab>
            <Tab eventKey="CHATS" title="MEMBERS">
              <div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                    <Trans>MEMBERS</Trans></p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                    <Link to="/AllMember">See All</Link></small>
                </div>
                <ul className="chat-list">
                  {
                    this.props.userInfo ? (
                      this.props.userInfo.map((user, i) => (
                        <li key={i} className="list active">
                          <div className="profile">
                          <img src={user&&user.image?user.image:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'} alt="profile" /></div>
                          <div className="info">
                            <p>{user.name?user.name:'--'}</p>
                            <p>{user.membership_type?user.membership_type.toUpperCase():'None'} Membership</p>
                          </div>
                        </li>
                      ))
                    ):(
                      <div></div>
                    )
                }
                </ul>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
const ListItem = (props) => {

  return (
    <li className={(props.isCompleted ? 'completed' : null)}>
      <div className="form-check">
        <label htmlFor="" className="form-check-label">
          <input className="checkbox" type="checkbox"
            checked={props.isCompleted}
            onChange={props.changed}
          /> {props.children} <i className="input-helper"></i>
        </label>
      </div>
      <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
    </li>
  )
};
const mapStateToProps = (state) => ({ user: state.user, userInfo: state.userInfo })
export default connect(mapStateToProps)(SettingsPanel)
