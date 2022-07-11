import React, { Component } from 'react'
// import '../CssFiles/App.css'
import '../cssComponents/App.css';

export default class InputFields extends React.Component {
    handleChange = (e) => {
      const { maxLength, value, name } = e.target;
      const [fieldName, fieldIndex] = name.split("-");
    
      let fieldIntIndex = parseInt(fieldIndex, 10);
    
      // Check if no of char in field == maxlength
      if (value.length >= maxLength) {
    
        // It should not be last input field
        if (fieldIntIndex < 6) {
    
          // Get the next input field using it's name
          const nextfield = document.querySelector(
            `input[name=field-${fieldIntIndex + 1}]`
          );
    
          // If found, focus the next field
          if (nextfield !== null) {
            nextfield.focus();
          }
        }
      }
    };
    
    render() {
      return (
        <div >
          <InputFild name="field-1" length="1" 
                     handleChange={this.handleChange} />
          <InputFild name="field-2" length="1" 
                     handleChange={this.handleChange} />
          <InputFild name="field-3" length="1" 
                     handleChange={this.handleChange} />
          <InputFild name="field-4" length="1" 
                     handleChange={this.handleChange} />
          <InputFild name="field-5" length="1" 
                     handleChange={this.handleChange} />
          <InputFild name="field-6" length="1" 
                     handleChange={this.handleChange} />
        </div>
      );
    }
  }
  class InputFild extends React.Component {
    render() {
      return (
        <input
        className='OTPBox'
           style={{ margin: 10 }}
          type="text"
          name={this.props.name}
          maxLength={this.props.length}
          onChange={this.props.handleChange}
        ></input>
      );
    }
  }