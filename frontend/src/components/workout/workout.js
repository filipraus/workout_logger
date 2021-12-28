import React from 'react';
import './workout.css';

import Exercise from '../exercise/exercise';
import SelectExercise from '../selectExercise/selectExercise';

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

    fetch(`http://127.0.0.1:8000/api/retrieve/${workout}/exercises`, options)
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

    fetch(`http://127.0.0.1:8000/api/add/exercise`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          exercises: this.state.exercises.concat(res),
          showSelectExercise: false,
        }, () => console.log(this.state.exercises));
      })
      .catch(err => console.log(err));
  }

  deleteExercise(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/delete/exercise/${id}`, options)
      .then(res => {
        this.setState({
          exercises: this.state.exercises.filter(exercise => {
            if (exercise.id != id) return exercise;
          }),
        });
    }).catch(err => console.log(err));
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
  
  render() {  
    return (
      <div ref={this.workout} className='workout' id={this.props.id}>
        {this.state.exercises.length > 0 && !this.state.showSelectExercise &&
          <div className='exercises'>
            {this.renderExercises()}
          </div>
        }
        {!this.state.showSelectExercise && 
          <button className='add-exercise-button'  type='button' onClick={() => this.setState({showSelectExercise: true})}>Log Exercise</button>
        }
        {this.state.showSelectExercise &&
          <SelectExercise 
            workout={this.props.workout}
            onExerciseSelected={(exercise) => this.addExercise(exercise)}
          />
        }
      </div>
    )
  }
}

export default Workout;