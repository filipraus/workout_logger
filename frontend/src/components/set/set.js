import React from 'react';

import './set.css'

import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class SetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    }
    this.numberInput = React.createRef();
  }

  increase() {
    this.numberInput.current.stepUp();
    this.numberInput.current.dispatchEvent(new Event("input", {bubbles: true}));
  }

  decrease() {
    this.numberInput.current.stepDown();
    this.numberInput.current.dispatchEvent(new Event("input", {bubbles: true}));
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.focus &&
          <IndeterminateCheckBoxIcon 
            className='input-control' onClick={() => this.decrease()}
          />
        }
        <input 
          ref={this.numberInput}
          type='number' 
          value={this.props.value} 
          onChange={(e) => this.props.onSetInputChange(e)} 
          min={0}
        />
        {this.props.focus &&
          <AddBoxIcon 
            className='input-control' onClick={() => this.increase()}
          />
        }
      </div>
    )
  }
}

class Set extends React.Component {
  constructor(props) {
    super(props);
    this.setInputReps = React.createRef();
    this.setInputWeight = React.createRef();
    this.setInputCheckbox = React.createRef();
  }

  handleSetInputChange() {
    const set = {
      ...this.props.set,
      reps: this.setInputReps.current.numberInput.current.value,
      weight: this.setInputWeight.current.numberInput.current.value,
      checked: this.setInputCheckbox.current.checked,
    }

    this.props.onSetInputChange(set);
  }

  toggleCheckbox() {
    this.setInputCheckbox.current.checked = !this.props.set.checked;
    this.setInputCheckbox.current.dispatchEvent(new Event('input', {bubbles: true}))
  }

  render() {
    return (
      <tr
        className={this.props.focus != true ? 
          'set' : 'set focus-set'
        }
        onClick={() => this.props.onSetSelected(this.props.set)}
      >
        <td width='30px' onClick={()=> this.props.handleDeleteSet()}>
          <DeleteOutlineIcon />
        </td>
        <td width='30px'>{this.props.set.pos + 1}</td>
        <td width='105px'>
          <SetInput 
            ref={this.setInputReps}
            className='reps '
            value={this.props.set.reps} 
            focus={this.props.focus}
            onSetInputChange={() => this.handleSetInputChange()} 
          />
        </td>
        <td width='105px'>
          <SetInput 
            ref={this.setInputWeight}
            className='weight' 
            value={this.props.set.weight} 
            focus={this.props.focus}
            onSetInputChange={() => this.handleSetInputChange()} 
          />
        </td>
        <td width='30px'>
          <input 
            ref={this.setInputCheckbox} 
            type="checkbox" 
            checked={this.props.set.checked} 
            onChange={(e) => this.handleSetInputChange()}
          />
        </td>
      </tr>
    )
  }
}

export default Set;