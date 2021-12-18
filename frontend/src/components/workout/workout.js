import React from 'react';
import './workout.css';

import Exercise from '../exercise/exercise';
import SelectExercise from '../selectExercise/selectExercise';

class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: '',
      exercises: [],
      workoutLoaded: false,
      showSelectExercise: false,
    }
  }

  componentDidMount() {
    this.getOrCreateWorkout();
  }

  getOrCreateWorkout() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/retrieve/workout/${this.props.date}`, options)
      .then(res => res.json())
      .then(res => {
        if (res.detail == 'Not found.') {
          this.createWorkout();
        } else {
          this.setState({
            workout: res.date,
            exercises: res.exercises,
            workoutLoaded: true,
          });
        }
    }).catch(err => console.log(err));
  }

  createWorkout() {
    const options = {
      method: 'POST',
      body: JSON.stringify({date: this.props.date}),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/create/workout`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          workout: res.date,
          workoutLoaded: true,
        });
    }).catch(err => console.log(err));
  }

  deleteWorkout(workout) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/retrieve/workout/${workout.date}`, options)
      .then(res => res.json())
      .then(res => {
        if (res.detail != 'Not found') {
          this.setState({
            workout: res.date,
          }, () => console.log('Workout: ', this.state.workout));
        }
    }).catch(err => console.log(err));
  }

  handleExerciseAddedToWorkout(exercise) {
    this.setState({
      exercises: this.state.exercises.concat(exercise),
    });
  }
  
  render() {
    let exercises = [];
    this.state.exercises.map((exercise, index) => {
      exercises.push(
        <Exercise
          key={index + 1}
          workout={this.state.workout}
          exercise={exercise}
        />
      );
    });

    return (
      <div className='workout'>
        {this.state.workoutLoaded &&
          <div className='exercises'>
            {exercises}
          </div>
        }
        {this.state.showSelectExercise &&
          <SelectExercise 
            workout={this.state.workout}
            onExerciseAddedToWorkout={(exercise) => this.handleExerciseAddedToWorkout(exercise)}
          />
        }
        <button type='button' onClick={() => this.setState({showSelectExercise: true})}>Log Exercise</button>
      </div>
    )
  }
}

export default Workout;