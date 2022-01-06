import React from 'react';
import './exercise.css';

import Set from '../set/set';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: this.props.exercise,
      setSelected: {},
    }
    this.sets = React.createRef();
  }
  
  handleSetDeselected() {
    this.updateSet();
    this.setState({
      setSelected: {},
    });
  }

  componentDidMount() {
    this.getSets();
    document.addEventListener('click', this.handleClickOutsideSets);
  }

  componentDidUpdate() {
    if (this.state.setSelected.id) {
      this.updateSet();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideSets);
  }

  handleClickOutsideSets = (event) => {
    if (this.sets.current != null) {
      if (this.sets && !this.sets.current.contains(event.target) && this.state.setSelected.id) {
        this.handleSetDeselected();
      }
    }
  }

  getSets() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/retrieve/${this.props.exercise.id}/sets`, options)
      .then(res => res.json())
      .then(res => {
        if (res.detail != 'Not found.') {
          this.setState({
            exercise: {
              ...this.state.exercise,
              sets: res,
            }
          });
        }
    }).catch(err => console.log(err));
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
      if (set.id === this.state.setSelected.id) {
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

    fetch(`http://127.0.0.1:8000/api/update/set/${this.state.setSelected.id}`, options)
      .then(res => res.json())
      .then(res => {
      
      }).catch(err => console.log(err));
  }

  deleteSet(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }

    fetch(`http://127.0.0.1:8000/api/delete/set/${id}`, options)
      .then(res => {
        this.setState({
          exercise: {
            ...this.state.exercise,
            sets: this.state.exercise.sets.filter(set => {
              if (set.id != id) return set;
            }),
          },
          setSelected: {},
        });
    }).catch(err => console.log(err));
  }

  handleSetSelected(set) {
    if (this.state.setSelected.id && set.id != this.state.setSelected.id) this.updateSet();

    if (this.state.setSelected.id != set.id) {
      this.setState({
        setSelected: set,
      });
    }
  }

  handleSetInputChange(set) {
    this.setState({
      exercise: {
        ...this.state.exercise,
        sets: this.state.exercise.sets.map(oldSet => {
          return (oldSet.id === this.state.setSelected.id) ? set : oldSet;
        }),
      },
    })
  }

  focusSet(set) {
    if (this.state.setSelected != null && 
      set.id == this.state.setSelected.id) return true;
  }

  renderSets() {
    let sets = [];

    this.state.exercise.sets.map((set, index) => {
      set.pos = index;
      sets.push(
        <Set
          ref={this.set}
          key={index}
          set={set}
          focus={this.focusSet(set)}
          onSetSelected={(set) => this.handleSetSelected(set)}
          onSetInputChange={(set) => this.handleSetInputChange(set)}
          handleDeleteSet={() => this.deleteSet(set.id)}
        />
      );    
    });

    return sets;
  }

  render() {
    return (
      <div className='exercise-wrapper'>
        <table className='exercise'>          
          <thead>
            <tr className='exercise-name'>
              <td width='30px'>
                <button className='delete-exercise-button' type='button' onClick={() => this.props.onExerciseDeleted(this.props.exercise.id)}>
                  <DeleteOutlineIcon />
                </button>
              </td>
              <td>{this.props.exercise.exercise}</td> 
              <td width='30px'></td>             
            </tr>
            <tr className='exercise-info'>
              <td width='30px'></td>
              <td width='30px'>#</td>
              <td width='105px'>Reps</td>
              <td width='105px'>Weight</td>
              <td width='75px'></td>
            </tr>
          </thead>
            <tbody ref={this.sets} className='exercise-sets'>
            {this.state.exercise.sets.length > 0 &&
                this.renderSets()
            }
            </tbody>
        </table>
        <button className='add-set-button' type='button' onClick={() => this.addSet()}>+</button>
      </div>
    )
  }
}

export default Exercise;