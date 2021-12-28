import React from 'react';

import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Workout from '../workout/workout';
import SelectExercise from '../selectExercise/selectExercise';

import DateRangeIcon from '@material-ui/icons/DateRange';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: '',
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

  createWorkout() {
    const options = {
      method: 'POST',
      body: JSON.stringify({date: this.state.dateSelected}),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/create/workout`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          workouts: this.state.workouts.concat(res),
          workoutLoaded: true,
        }, () => this.toggleCreateWorkoutButton());
    }).catch(err => console.log(err)); 
  }

  deleteWorkout(date) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/delete/workout/${date}`, options)
      .then(res => {
        this.setState({
          workouts: this.state.workouts.filter(workout => {
            if (workout.date != date) return workout;
          })
        });
    }).catch(err => console.log(err));
  }

  deleteEmptyWorkouts() {
    this.state.workouts.filter(workout => {
      if (workout.exercises && workout.exercises.length === 0) this.deleteWorkout(workout.date);
    });
  }

  prev() {
    const calendarAPI = this.calendar.current.getApi();
    if (this.state.calendarView === 'dayGridMonth') {
      calendarAPI.incrementDate({ month: -1 });
    } else {
      calendarAPI.incrementDate({ days: -1 });
      this.setState({
        dateSelected: this.formatDate(calendarAPI.getDate(), 'yyyy-mm-dd'),
      });
    }

    this.deleteEmptyWorkouts();
    this.deleteOldHighlight();
  }

  next() {
    const calendarAPI = this.calendar.current.getApi();
    if (this.state.calendarView === 'dayGridMonth') {
      calendarAPI.incrementDate({ month: 1 });
    } else {
      calendarAPI.incrementDate({ days: 1 });
      this.setState({
        dateSelected: this.formatDate(calendarAPI.getDate(), 'yyyy-mm-dd'),
      });
    }

    this.deleteEmptyWorkouts();
    this.deleteOldHighlight();
  }

  toggleCreateWorkoutButton() {
    if (this.state.calendarView == 'dayGrid') {
      const button = document.querySelector('.create-workout-button');
      if (!this.workoutExists(this.state.dateSelected)) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    }
  }

  openDayView() {  
    this.changeViewToWeek(this.state.dateSelected);
  }

  closeWorkout() {
    this.changeViewToMonth();
  }

  changeViewToMonth() {
    this.deleteEmptyWorkouts();

    this.setState({
      dateSelected: '',
      calendarView: 'dayGridMonth',
      titleFormat: { year: 'numeric', month: 'long' }
    }, () => {
      this.getWorkouts();
      const calendarAPI = this.calendar.current.getApi();
      calendarAPI.changeView('dayGridMonth')

      document.querySelector('.calendar-wrapper').style['max-width'] = '700px';

      this.deleteOldHighlight();
      this.deleteEmptyWorkouts();
    })
  }

  changeViewToWeek() {
    if (this.state.calendarView == 'dayGridMonth') {
      this.setState({
        workouts: this.state.workouts,
        calendarView: 'dayGrid',
        duration: this.calculateWeekDuration(),
        titleFormat: { day: '2-digit', year: 'numeric', month: 'long'},
      }, () => {
        const calendarAPI = this.calendar.current.getApi();
        calendarAPI.changeView('dayGrid', this.state.dateSelected);

        this.deleteOldHighlight();
        this.deleteEmptyWorkouts();
      });
    }
  }

  calculateWeekDuration() {
    let duration = Math.floor(window.innerWidth / 350);
    if (duration > 7) duration = 7;

    if (duration > 1) {
      document.querySelector('.calendar-wrapper').style['max-width']  = `${window.innerWidth - 64}px`;
    }

    return { days: duration };
  }

  calendarHeight() {
    if (this.state.calendarView === 'dayGridMonth') {
      return this.calculateWeekViewCalendarHeight();
    } else {
      return this.calculateWeekViewCalendarHeight();
    }
  }

  calculateMonthViewCalendarHeight() {
    if (this.calendar.current) {
      const width = document.querySelector('.calendar-wrapper').offsetWidth;
      return width + 8;
    }
  }

  calculateWeekViewCalendarHeight() {
    let subtractHeight = 0;
    subtractHeight += document.querySelector('.App-header').offsetHeight;
    subtractHeight += document.querySelector('.calendar-controls').offsetHeight;
    let height = window.document.body.clientHeight - subtractHeight;
    return (height > 700) ? 700 : height;
  }

  formatDate(date, format) {
    const map = {
      yyyy: date.getFullYear().toString(),
      mm: date.getMonth() + 1,
      dd: date.getDate().toString(),
    };

    return format.replace(/yyyy|mm|dd/gi, matched => map[matched]);
  }

  workoutExists(date) {
    return this.state.workouts.some(workout => workout.date === date);
  }

  deleteOldHighlight() {
    const dateHighlight = document.querySelector('.date-highlight');
    if (dateHighlight) dateHighlight.classList.remove('date-highlight');
  }

  highlightDateSelected() {
    this.deleteOldHighlight();
    const date = document.querySelector(`tbody [data-date='${this.state.dateSelected}']`);
    date.classList.add('date-highlight')
  }
  
  handleDateSelected(info) {

    this.setState({
      dateSelected: info.dateStr,
    }, () => {
      if (this.workoutExists(info.dateStr)) {
        this.handleSelectWorkout();
      } else {
        this.openDayView();
        this.highlightDateSelected();
        this.toggleCreateWorkoutButton();
      }
    });    
  }

  handleSelectWorkout(date) {
    this.deleteOldHighlight();

    console.log('Select workout');

    this.setState({
      dateSelected: date,
    }, () => {
      if (this.state.calendarView == 'dayGridMonth') {
        this.openDayView();
      } else {
        this.highlightDateSelected();
      }
    })
  }

  renderWorkouts(info) {
    if (info.view.type == 'dayGrid') {
      return <Workout workout={info.event.startStr} onClick={() => this.handleSelectWorkout()} />;
    } else {
      return this.renderWorkoutLabel(info);
    }
  }

  renderWorkoutLabel(info) {
    const workout = this.state.workouts.filter(workout => {
      if (workout.date == info.event.startStr) return workout;
    })[0];

    return (
      <div 
        id={info.event.startStr}
        className='workout-label' 
        onClick={() => this.handleSelectWorkout(info.event.startStr)}
      >
        {this.renderMuscleGroupLabels(workout)}
      </div>
    )
  }

  renderMuscleGroupLabels(workout) {
    let muscleGroupColors = [...new Set( // creates unique array
      workout.exercises.map(exercise => {
        return exercise.exercise.muscle_group.color;
      })
    )];

    let labels = [];
    muscleGroupColors.map((color, index) => {
      labels.push(
        <div 
          key={index}
          className='muscle-group-label' 
          style={{'backgroundColor': color}}
        >
        </div>
      )
    });

    return labels;
  }

  visibleRange() {
    let startDate = new Date(this.state.dateSelected);
    let endDate = new Date(this.state.dateSelected);
    
    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() +1);

    console.log(startDate);
    console.log(endDate);

    return {start: startDate, end: endDate};
  }

  render() {
    return (
      <div>
        <div className='calendar-controls'>
          <div>          
            <button type='button' onClick={() => this.changeViewToMonth()}>
              <DateRangeIcon />
            </button>
            <button type='button' onClick={() => this.changeViewToWeek(this.formatDate(new Date(), 'yyyy-mm-dd'))}>
              <ViewWeekIcon />
            </button>
          </div>
          <div>
            <button type='button' onClick={() => this.prev()}>
              <ArrowBackIosIcon />  
            </button>            
            <button type='button' onClick={() => this.next()}>
              <ArrowForwardIosIcon />  
            </button>
          </div>
        </div>   
        <div className='calendar-wrapper'>
          <FullCalendar
            ref={this.calendar}
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView={this.state.calendarView}
            duration={this.state.duration}
            headerToolbar={{ left: '', center: 'title', right: '' }}
            titleFormat={this.state.titleFormat}
            dateClick={(info) => this.handleDateSelected(info)}
            height={this.state.calendarHeight}
            events={this.state.workouts}
            eventContent={(info) => this.renderWorkouts(info)}
            dayCellDidMount={() => this.toggleCreateWorkoutButton()}
            visibleRange={this.visibleRange()}
          />
        </div>
        {this.state.dateSelected && 
          <div className='calendar-workout-buttons'>
            <button className='create-workout-button' type='button' onClick={() => this.createWorkout()}>Create Workout</button>
          </div>
        }
      </div>
    )
  }
}

export default Calendar;