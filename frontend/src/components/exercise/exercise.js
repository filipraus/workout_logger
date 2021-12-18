import React from 'react';

import Set from '../set/set';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: this.props.exercise,
      setSelected: null,
    }
  }

  handleSetInputChange(set) {
    let sets = [];
    this.state.exercise.sets.map(oldSet => {
      if (oldSet.id == this.state.setSelected) {
        oldSet.pos = set.pos;
        oldSet.reps = set.reps;
        oldSet.weight = set.weight;
      }
      sets.push(oldSet);
    });

    this.setState({
      exercise: {
        ...this.state.exercise,
        sets: sets,
      },
    }, () => console.log(this.state))
  }

  addSet() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        exercise: this.state.exercise.id,
        pos: this.state.exercise.sets.length,
        weight: 0,
        reps: 0,
      }),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/add/set`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          exercise: {
            ...this.state.exercise,
            sets: this.state.exercise.sets.concat({
              ...res,
              weight: 0,
              reps: 0,
            }),
          }
        })
    }).catch(err => console.log(err));
  }

  updateSet() {
    const set = this.state.exercise.sets.filter(set => {
      if (set.id == this.state.setSelected) {
        return set;
      }
    })[0];

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        exercise: this.state.exercise.id,
        pos: set.pos,
        weight: set.weight,
        reps: set.reps,
      }),
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/update/set/${this.state.setSelected}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
    }).catch(err => console.log(err));
  }

  deleteSet() {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/delete/set/${this.state.setSelected}`, options)
      .then(res => {
        this.setState({
          exercise: {
            ...this.state.exercise,
            sets: this.state.exercise.sets.filter(set => {
              if (set.id != this.state.setSelected) return set;
            }),
          }
        }, () => console.log(this.state));
    }).catch(err => console.log(err));
  }

  handleSetSelected(set) {
    this.setState({
      setSelected: set,
    }, () => console.log('Handle set selected... ', this.state));
  }

  render() {
    let sets = [];
    console.log(this.state.exercise.sets);
    this.state.exercise.sets.map((set, index) => {
      set.pos = index;
      sets.push(
        <Set
          key={index}
          set={set}
          onSetSelected={(set) => this.handleSetSelected(set)}
          onSetInputChange={(set) => this.handleSetInputChange(set)}
        />
      );
    })

    return (
      <div className='exercise'>
        <div className='exercise-name'>
          {this.props.exercise.exercise}
        </div>
        <div className='exercise-sets'>
          {sets}
          <button type='button' onClick={() => this.addSet()}>Add set</button>
        </div>
        {this.state.setSelected &&
          <button type='button' onClick={() => this.deleteSet()}>Delete</button>
        }
        <button type='button' onClick={() => this.updateSet()}>Update</button>
      </div>
    )
  }
}

export default Exercise;