import React from 'react';

class SetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    }
    this.numberInput = React.createRef();
  }

  increase() {
    const input = this.numberInput.current;
    input.stepUp();
    this.setState({
      value: input.value,
    }, () => input.dispatchEvent(new Event("input", {bubbles: true})));
  }

  decrease() {
    const input = this.numberInput.current;
    input.stepDown();
    this.setState({
      value: input.value,
    }, () => input.dispatchEvent(new Event("input", {bubbles: true})));
  }

  render() {
    return (
      <div>
        <div onClick={() => this.decrease()}>-</div>
        <input 
          ref={this.numberInput}
          type='number' 
          value={this.state.value} 
          onChange={(e) => this.props.onSetInputChange(e)} 
        />
        <div onClick={() => this.increase()}>+</div>
      </div>
    )
  }
}

class Set extends React.Component {
  handleSetInputChange(e) {
    const inputs = document.querySelectorAll('input');

    const set = {
      ...this.props.set,
      reps: inputs[0].value,
      weight: inputs[1].value,
    }

    this.props.onSetInputChange(set);
  }

  render() {
    return (
      <div 
        className='set'
        onClick={() => this.props.onSetSelected(this.props.set.id)}
      >
        <SetInput 
          className='reps'
          value={this.props.set.reps} 
          onSetInputChange={(e) => this.handleSetInputChange(e)} 
        />
        <SetInput 
          className='weight' 
          value={this.props.set.weight} 
          onSetInputChange={(e) => this.handleSetInputChange(e)} 
        />
      </div>
    )
  }
}

export default Set;