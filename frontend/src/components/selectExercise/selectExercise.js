import React from 'react';

import './selectExercise.css';

class SelectExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muscleGroups: [],
      exerciseOptions: [],
    };
  }

  componentDidMount() {
    this.getMuscleGroups();
    this.getExerciseOptions();
  }

  getMuscleGroups() {
    fetch("http://127.0.0.1:8000/api/muscle_groups_list")
      .then(response => response.json())
      .then(res => {
        this.setState({
          muscleGroups: res,
        })
      }
    );
  }

  getExerciseOptions() {
    fetch("http://127.0.0.1:8000/api/exercise_options_list")
      .then(response => response.json())
      .then(res => {
        this.setState({
          exerciseOptions: res,
        })
      }
    );
  }

  render() {
    return (
      <div className='select-exercise'>
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
    )
  }
}

export default SelectExercise;