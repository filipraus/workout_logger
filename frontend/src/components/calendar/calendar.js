import React from 'react';

import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Workout from '../workout/workout';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      calendarView: 'dayGridMonth',
      duration: { days: 1 },
      titleFormat: { year: 'numeric', month: 'long' },
      calendarHeight: '500',
    }
    this.calendar = React.createRef();
  }

  componentDidMount() {
    this.getWorkouts();
    this.setState({
      calendarHeight: this.calendarHeight(),
    });
  }

  componentWillUnmount() {
    this.deleteEmptyWorkouts()
  }

  prev() {
    const calendarAPI = this.calendar.current.getApi();

    if (this.state.calendarView === 'dayGridMonth') {
      calendarAPI.incrementDate({ month: -1 });
    } else {
      calendarAPI.incrementDate({ day: -1 });
      const date = this.formatDate(calendarAPI.getDate(), 'yyyy-mm-dd');
      console.log(date);
      this.handleDateClicked(date);
    }
  }

  next() {
    const calendarAPI = this.calendar.current.getApi();

    if (this.state.calendarView === 'dayGridMonth') {
      calendarAPI.incrementDate({ month: 1 });
    } else {
      calendarAPI.incrementDate({ day: 1 });
      const date = this.formatDate(calendarAPI.getDate(), 'yyyy-mm-dd');
      console.log(date);
      this.handleDateClicked(date);
    }
  }

  handleDateChanged() {
    const calendarAPI = this.calendar.current.getApi();
    const date = calendarAPI.getDate();
    console.log(date);
  }

  deleteEmptyWorkouts() {
    this.state.workouts.filter(workout => {
      console.log(workout);
      if (workout.exercises.length === 0) this.deleteWorkout(workout.date);
    });
  }

  getWorkouts() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/workouts_list`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          workouts: res,
        });
    }).catch(err => console.log(err));
  }

  createWorkout(date) {
    const options = {
      method: 'POST',
      body: JSON.stringify({date: date}),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/create/workout`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          workouts: this.state.workouts.concat(res),
          workoutLoaded: true,
        }, () => this.showWorkout(date));
    }).catch(err => console.log(err)); 
  }

  deleteWorkout(date) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/delete/workout/${date}`, options)
      .then(res => {
        console.log('Workout deleted... ', this.state.workouts);
    }).catch(err => console.log(err));
  }

  handleDateClicked(date) {
    console.log(date);
    console.log(this.state.workouts);
    if (this.state.workouts.some(workout => workout.date === date)) {
      console.log('Workout already exists');
      this.showWorkout(date);
    } else {
      console.log('Workout does not exist. Creating... ', date);
      this.createWorkout(date);
    }
  }

  showWorkout(date) {  
    const calendarAPI = this.calendar.current.getApi();

    this.setState({
      workouts: this.state.workouts,
      calendarView: 'dayGrid',
      titleFormat: { day: '2-digit', year: 'numeric', month: 'long'},
    }, () => calendarAPI.changeView('dayGrid', date));
  }

  closeWorkout() {
    const calendarAPI = this.calendar.current.getApi();
    console.log(this.state.workouts);
    this.setState({
      calendarView: 'dayGridMonth',
      titleFormat: { year: 'numeric', month: 'long' }
    }, () => calendarAPI.changeView('dayGridMonth'))
  }

  renderWorkouts(info) {
    if (info.view.type == 'dayGrid') {
      console.log('String: ', info.event.startStr)
      return (
        <>
          <Workout workout={info.event.startStr} />
        </>
      )
    } else {
      return (
        <div className='workout-label' onClick={() => this.handleDateClicked(info.event.startStr)}></div>
      )
    }
  }

  handleEventClicked(info) {
    console.log('event clicked');
    if (info.view.type === 'dayGridMonth') {
      this.handleDateClicked(info.event.startStr);
    }
  }

  formatDate(date, format) {
    const map = {
      yyyy: date.getFullYear().toString(),
      mm: date.getMonth() + 1,
      dd: date.getDate().toString(),
    };

    return format.replace(/yyyy|mm|dd/gi, matched => map[matched]);
  }

  calendarHeight() {
    let subtractHeight = 0;
    subtractHeight += document.querySelector('.App-header').offsetHeight;
    subtractHeight += document.querySelector('.calendar-controls').offsetHeight;
    let height = window.document.body.clientHeight - subtractHeight;
    return height;
  }

  handleSelect(start) {
    console.log(start);
  }

  render() {
    return (
      <div>
        <div className='calendar-controls'>
          <button type='button' onClick={() => this.closeWorkout()}>
            Month
          </button>
          <div>
            <button type='button' onClick={() => this.handleDateClicked(this.formatDate(new Date(), 'yyyy-mm-dd'))}>
              Week
            </button>
            <button type='button' onClick={() => this.prev()}>Prev</button>            
            <button type='button' onClick={() => this.next()}>Next</button>
          </div>
        </div>   
        <FullCalendar
          ref={this.calendar}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView={this.state.calendarView}
          duration={this.state.duration}
          headerToolbar={{ left: '', center: 'title', right: '' }}
          titleFormat={this.state.titleFormat}
          dateClick={(info) => this.handleDateClicked(info.dateStr)}         
          height={this.state.calendarHeight}
          eventContent={(info) => this.renderWorkouts(info)}
          events={this.state.workouts}
          select={(start) => this.handleSelect(start)}
        />
      </div>
    )
  }
}

export default Calendar;