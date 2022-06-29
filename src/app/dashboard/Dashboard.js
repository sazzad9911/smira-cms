import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import { Link, useHistory } from 'react-router-dom';
import circle from '../../assets/images/dashboard/circle.png'
import { connect } from 'react-redux'
import app from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


// import "react-datepicker/dist/react-datepicker.css";
import { convertDate } from './../../action';
class Dashboard extends Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      visitSaleData: {},
      visitSaleOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: false,
              min: 0,
              stepSize: 20,
              max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
              padding: 20,
              fontColor: "#9c9fa6",
              autoSkip: true,
            },
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }]
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
      trafficData: {},
      trafficOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: false,
      },
      todos: [
        {
          id: 1,
          task: 'Add new Task',
          isCompleted: false
        },

      ],
      inputValue: '',
      goldMembership: null,
      silverMembership: null,
      diamondMembership: null,
      platinumMembership: null,
      data: [],
      hotels: [],
      deals: [],
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    let auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      if (!user) {
        window.location.href = '/user-pages/login-1'
      }
    })
  }
  statusChangedHandler(event, id) {

    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = { ...this.state.todos[id] };
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
      todos: todos
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

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
      todos: todos
    })
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  componentDidMount() {
    //your code
    //console.log(this.props.userInfo)
    if (this.props.userInfo) {
      let gold = this.props.userInfo.filter(e => e.membership_type == 'gold')
      let goldCount = (gold.length * 100) / this.props.userInfo.length
      this.setState({ goldMembership: gold });
      let platinum = this.props.userInfo.filter(e => e.membership_type == 'platinum')
      let platinumCount = (platinum.length * 100) / this.props.userInfo.length
      this.setState({ platinumMembership: platinum });
      let silver = this.props.userInfo.filter(e => e.membership_type == 'silver')
      let silverCount = (silver.length * 100) / this.props.userInfo.length
      this.setState({ silverMembership: silver });
      let diamond = this.props.userInfo.filter(e => e.membership_type == 'diamond')
      let diamondCount = (diamond.length * 100) / this.props.userInfo.length
      this.setState({ diamondMembership: diamond })
      this.setState({ data: this.state.data.push(goldCount, silverCount, platinumCount, diamondCount) })
    }
    if(this.props.bookAppointment && this.props.hotelBooking){

      for(var i=0;i<12;i++){
        let data=this.props.bookAppointment.filter(e=>new Date(e.date).getMonth()==i)
        this.setState({deals: this.state.deals.push(data.length)}) 
        let newData=this.props.hotelBooking.filter(e =>new Date(e.date).getMonth()==i)
        this.setState({hotels: this.state.hotels.push(newData.length)}) 
        
      }
    
    }


    //console.log(this.state.data)
    var ctx = document.getElementById('visitSaleChart').getContext("2d")
    var gradientBar1 = ctx.createLinearGradient(0, 0, 0, 181)
    gradientBar1.addColorStop(0, '#E20993')
    gradientBar1.addColorStop(1, '#CF54A2')

    var gradientBar2 = ctx.createLinearGradient(0, 0, 0, 360)
    gradientBar2.addColorStop(0, 'rgba(54, 215, 232, 1)')
    gradientBar2.addColorStop(1, 'rgba(177, 148, 250, 1)')

    var gradientBar3 = ctx.createLinearGradient(0, 0, 0, 300)
    gradientBar3.addColorStop(0, 'rgba(255, 191, 150, 1)')
    gradientBar3.addColorStop(1, 'rgba(254, 112, 150, 1)')

    var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181)
    gradientdonut1.addColorStop(0, 'rgba(54, 215, 232, 1)')
    gradientdonut1.addColorStop(1, 'rgba(177, 148, 250, 1)')

    var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 50)
    gradientdonut2.addColorStop(0, 'rgba(6, 185, 157, 1)')
    gradientdonut2.addColorStop(1, 'rgba(132, 217, 210, 1)')

    var gradientdonut3 = ctx.createLinearGradient(0, 0, 0, 300)
    gradientdonut3.addColorStop(0, 'rgba(254, 124, 150, 1)')
    gradientdonut3.addColorStop(1, 'rgba(255, 205, 150, 1)')

    var gradientdonut4 = ctx.createLinearGradient(0, 0, 0, 300)
    gradientdonut4.addColorStop(0, '#E59866')
    gradientdonut4.addColorStop(1, '#F8C471')



    const newVisitSaleData = {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          label: "Hotel",
          borderColor: gradientdonut1,
          backgroundColor: gradientdonut1,
          hoverBackgroundColor: gradientdonut1,
          legendColor: gradientdonut1,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: this.state.hotels
        },
        {
          label: "Deal",
          borderColor: gradientBar1,
          backgroundColor: gradientBar1,
          hoverBackgroundColor: gradientBar1,
          legendColor: gradientBar1,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: this.state.deals
        },
      ]
    }
    const newTrafficData = {
      datasets: [{
        data: this.state.data,
        backgroundColor: [
          gradientdonut1,
          gradientdonut2,
          gradientdonut3,
          gradientdonut4
        ],
        hoverBackgroundColor: [
          gradientdonut1,
          gradientdonut2,
          gradientdonut3,
          gradientdonut4
        ],
        borderColor: [
          gradientdonut1,
          gradientdonut2,
          gradientdonut3,
          gradientdonut4
        ],
        legendColor: [
          gradientdonut1,
          gradientdonut2,
          gradientdonut3,
          gradientdonut4
        ]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Gold Membership',
        'Platinum Membership',
        'Silver Membership',
        'Diamond Membership',
      ]
    };
    this.setState({ visitSaleData: newVisitSaleData, trafficData: newTrafficData })

  }



  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }


  render() {

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">

                <h4 className="font-weight-normal mb-3">Total Users <i className="mdi mdi-account mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.userInfo ? this.props.userInfo.length : 0}</h2>
                <h6 className="card-text">From 12 May 2022</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={circle} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Total Hotels <i className="mdi mdi-hotel mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.hotels ? this.props.hotels.length : 0}</h2>
                <h6 className="card-text">From 12 May 2022</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">

                <h4 className="font-weight-normal mb-3">Total Deals <i className="mdi mdi-nutrition mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.deals ? this.props.deals.length : 0}</h2>
                <h6 className="card-text">From 12 May 2022</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="clearfix mb-4">
                  <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                  <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right">
                    <ul>
                      <li>
                        <span className="legend-dots bg-primary">
                        </span>Hotel
                      </li>
                      <li>
                        <span className="legend-dots bg-danger">
                        </span>Deal
                      </li>
                    </ul>
                  </div>
                </div>
                <Bar ref='chart' className="chartLegendContainer" data={this.state.visitSaleData} options={this.state.visitSaleOptions} id="visitSaleChart" />
              </div>
            </div>
          </div>
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Membership Plans</h4>
                <Doughnut data={this.state.trafficData} options={this.state.trafficOptions} />
                <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
                  <ul>
                    <li>
                      <span className="legend-dots bg-info"></span>Gold Membership
                      <span className="float-right">{this.state.goldMembership ? ((this.state.goldMembership.length * 100) / this.props.userInfo.length).toFixed(1) : 0}%</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-success"></span>Silver Membership
                      <span className="float-right">{this.state.silverMembership ? ((this.state.silverMembership.length * 100) / this.props.userInfo.length).toFixed(1) : 0}%</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-danger"></span>Platinum Membership
                      <span className="float-right">{this.state.platinumMembership ? ((this.state.platinumMembership.length * 100) / this.props.userInfo.length).toFixed(1) : 0}%</span>
                    </li>
                    <li>
                      <span style={{ backgroundColor: '#E59866' }} className="legend-dots bg-danger"></span>Diamond Membership
                      <span className="float-right">{this.state.diamondMembership ? ((this.state.diamondMembership.length * 100) / this.props.userInfo.length).toFixed(1) : 0}%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-lg-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body p-0 d-flex">
                <div className="dashboard-custom-date-picker">
                  <DatePicker inline selected={this.state.startDate} onChange={this.handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-white">Todo</h4>
                <form className="add-items d-flex" onSubmit={this.addTodo}>
                  <input
                    type="text"
                    className="form-control h-auto"
                    placeholder="What do you need to do today?"
                    value={this.state.inputValue}
                    onChange={this.inputChangeHandler}
                    required />
                  <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Add</button>
                </form>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column todo-list">
                    {this.state.todos.map((todo, index) => {
                      return <ListItem
                        isCompleted={todo.isCompleted}
                        changed={(event) => this.statusChangedHandler(event, index)}
                        key={todo.id}
                        remove={() => this.removeTodo(index)}
                      >{todo.task}</ListItem>
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
    userInfo: state.userInfo,
    hotels: state.hotels,
    deals: state.deals,
    hotelBooking: state.hotelBooking,
    bookAppointment: state.bookAppointment,
  }
}
export default connect(mapStateToProps)(Dashboard);