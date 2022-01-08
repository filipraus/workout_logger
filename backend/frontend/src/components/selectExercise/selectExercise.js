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

  render() {
    console.log(this.props);
    return (
      <div className='select-exercise'>
        <div className='muscle-groups-list'>
          {this.state.muscleGroups.map((muscleGroup, index) => {
            return (
              <details key={index}>
                <summary>{muscleGroup.name}</summary>
                {this.state.exerciseOptions.map((exerciseOption, index) => {
                  if (exerciseOption.muscle_group == muscleGroup.id) {
                    return (
                      <div 
                        key={index} 
                        onClick={() => this.props.onExerciseSelected(exerciseOption.name)}
                      >
                        {exerciseOption.name}
                      </div>
                    )
                  }
                })}
              </details>
            )
          })}
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