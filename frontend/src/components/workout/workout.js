import React from 'react';

import './workout.css';

class Set extends React.Component {
  render() {
    return (
      <div className="set">
        <div className="set-reps">
          <div>-</div>
          <input type="number" name="reps" value={this.props.reps} />
          <div>+</div>
        </div>
        <div className="set-weight">
          <div>-</div>
          <input type="number" name="weight" value={this.props.weight} />
          <div>+</div>
        </div>
      </div>
    )
  }
}

class Exercise extends React.Component {
  render() {
    let sets = [];
    this.props.sets((set, index) => {
      sets.push(
        <Set
          row={index} 
          reps={set.reps}
          weight={set.weight}
        />
      );
    })

    return (
      <div className="exercise">
        <div className="exercise-name">
          {this.props.name}
        </div>
        <div className="exercise-sets">
          {sets}
        </div>
      </div>
    )
  }
}

class Workout extends React.Component {
  render() {
    const workout = this.props.date;
    let exercises = [];

    this.props.exercises.map((exercise, index) => {
      exercises.push(
        <Exercise
          name={exercise.name}
          sets={exercise.sets}
        />
      );
    });

    return (
      <div className="workout">
        <div className="exercises">
          {exercises}
        </div>
      </div>
    )
  }
}