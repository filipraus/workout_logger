import React from 'react';
import './workout.css';

import Exercise from '../exercise/exercise';
import SelectExercise from '../selectExercise/selectExercise';

import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import QueueIcon from '@material-ui/icons/Queue';

class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      exercisesLoaded: false,
      showSelectExercise: false,
    }
    this.workout = React.createRef();
  }

  componentDidMount() {
    this.getExercises(this.props.workout);
    this.setWorkoutElementHeight();
  }

  setWorkoutElementHeight() {
    document.querySelector('.fc-daygrid-day-frame').style['padding'] = '8px 0';
    this.workout.current.style.height = `${document.querySelector('.fc-daygrid-day-frame').offsetHeight - 20}px`;
  }

  getExercises(workout) {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`/api/retrieve/${workout}/exercises`, options)
      .then(res => res.json())
      .then(res => {
        if (res.detail != 'Not found.') {
          this.setState({
            exercises: res,
            exercisesLoaded: true,
          });
        }
    }).catch(err => console.log(err));
  }

  addExercise(selectedExercise) {
    const exercise = {
      workout: this.props.workout,
      exercise: selectedExercise
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify(exercise),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`/api/add/exercise`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          exercises: this.state.exercises.concat(res),
          showSelectExercise: false,
        });
      })
      .catch(err => console.log(err));
  }

  deleteExercise(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`/api/delete/exercise/${id}`, options)
      .then(res => {
        this.setState({
          exercises: this.state.exercises.filter(exercise => {
            if (exercise.id != id) return exercise;
          }),
        });
    }).catch(err => console.log(err));
  }

  showSelectExercise() {
    this.setState({
      showSelectExercise: true,
    });
  }

  renderExercises() {
    let exercises = [];
    this.state.exercises.map((exercise, index) => {
      exercises.push(
        <Exercise
          key={index + 1}
          workout={this.props.date}
          exercise={exercise}
          onExerciseDeleted={(exercise) => this.deleteExercise(exercise)}
        />
      );
    });
    return exercises;
  }

  handleHideSelectExercise() {
    this.setState({
      showSelectExercise: false,
    });
  }
  
  render() {  
    return (
      <div ref={this.workout} className='workout' id={this.props.id}>
        <div className='exercises'>
          {this.state.exercises.length > 0 && !this.state.showSelectExercise &&
            <div className='exercises'>
              {this.renderExercises()}
            </div>
          }
        </div>
        {!this.state.showSelectExercise && 
          <div className='workout-controls'>
            <button 
              type='button'
              className='delete-workout-button' 
              onClick={() => this.props.deleteWorkout()}
            >
                <DeleteSweepIcon />
            </button>
            <button 
              type='button' 
              className='add-exercise-button' 
              onClick={() => this.showSelectExercise()}
            >
                <QueueIcon />
            </button>
          </div>
        }
        {this.state.showSelectExercise &&
          <SelectExercise 
            workout={this.props.workout}
            onExerciseSelected={(exercise) => this.addExercise(exercise)}
            hideSelectExercise={() => this.handleHideSelectExercise()}
          />
        }
      </div>
    )
  }
}

export default Workout;