import React from 'react';
import MountedComponent from '.MountedComponent.js';


class Test extends React.Component {
  constructor(props){
    super(props){
      this.state = {

      }
    }
  }

  render(){
    return (
      <div>
        <h3> Test Component </h3>
        <MountedComponent />
      </div>
      );
  }

}


export default Test;