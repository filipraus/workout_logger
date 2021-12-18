import React from 'react';

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
      .then(data => {
        this.setState({
          muscleGroups: data,
        })
      }
    );
  }

  getExerciseOptions() {
    fetch("http://127.0.0.1:8000/api/exercises_list")
      .then(response => response.json())
      .then(data => {
        this.setState({
          exerciseOptions: data,
        })
      }
    );
  }
  
  addExerciseToWorkout(selectedExerciseName) {
    const exercise = {
      workout: this.props.workout,
      exercise: selectedExerciseName
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify(exercise),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/add/exercise`, options)
      .then(res => res.json())
      .then(res => {
        this.props.onExerciseAddedToWorkout(res);
      })
      .catch(err => console.log(err));
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
                      onClick={() => this.addExerciseToWorkout(exerciseOption.name)}
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