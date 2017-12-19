import React, { Component } from 'react';
import NavWhite from '../Nav/NavWhite';
import Input from '../Input/Input';
// import { withRouter } from 'react-router-dom';

const Signup = function(props) {
  return (
    <div className='signUpContainer'>
      <h1 className='title'>Sign Up Today!</h1>

      <form onSubmit={props.signup}>
        <Input inputtype="input" placeholder="email" id="email" name="email"></Input>
        <Input inputtype="input" placeholder="password" id="password" name="password"></Input>
        <button className='formButton' type="submit">Sign Up</button>
      </form>
    </div>

  )
};

export default Signup;
