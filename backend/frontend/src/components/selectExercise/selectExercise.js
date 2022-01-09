import React from 'react';

import './selectExercise.css';

class SelectExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muscleGroups: [],
      exerciseOptions: [],
      show: false,
    };
  }

  componentDidMount() {
    this.getMuscleGroups();
    this.getExerciseOptions();

    this.setState({
      show: true,
    });
  }

  getMuscleGroups() {
    fetch("/api/muscle_groups_list")
      .then(response => response.json())
      .then(res => {
        this.setState({
          muscleGroups: res,
        })
      }
    );
  }

  getExerciseOptions() {
    fetch("/api/exercise_options_list")
      .then(response => response.json())
      .then(res => {
        this.setState({
          exerciseOptions: res,
        })
      }
    );
  }
  
  closeSelectExercise() {
    this.setState({
      show: false,
    });
  }

  renderMuscleGroups() {
    let muscleGroups = [];
    this.state.muscleGroups.map((muscleGroup, index) => {
      muscleGroups.push(
        <details key={index}>
          <summary>{muscleGroup.name}</summary>
          {this.renderExerciseOptions(muscleGroup)}
        </details>
      );
    })
    return muscleGroups;
  }

  renderExerciseOptions(muscleGroup) {
    let exerciseOptions = [];
    this.state.exerciseOptions.map((exerciseOption, index) => {
      if (exerciseOption.muscle_group == muscleGroup.id) {
        exerciseOptions.push(
          <div 
            key={index} 
            onClick={() => this.props.onExerciseSelected(exerciseOption.name)}
          >
            {exerciseOption.name}
          </div>
        )
      }
    })
    return exerciseOptions;
  }

  render() {
    return (
      <div className='select-exercise'>
        <div className='muscle-groups-list'>
          {this.renderMuscleGroups()}
        </div>
        <button 
          type='button' 
          className='hide-select-exercise-button'
          onClick={() => this.props.hideSelectExercise()}
        >
            Close
        </button>
      </div>
    )
  }
}

export default SelectExercise;