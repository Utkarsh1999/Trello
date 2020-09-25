// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      context: {},
      repo:''
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount(){
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
    });
    // Next steps: Error handling using the error object
  }

  loadGithubRepo(){
    
    const requestString = 'https://api.github.com/users/utkarsh1999/repos';
        console.log(requestString);
        fetch(requestString)
        .then(response => response.json())
        .then(data => this.setState({
          ...this.state,
          repo: data
        }));
  }

  render() {

      let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

      return (
      <div>
        <h3>Hello World!</h3>
        <h1>Congratulations {userName}!</h1> <h3>This is the tab you made :-)</h3>
        <h3 onClick={this.loadGithubRepo}>Click Me!</h3>
        {this.state.repo !== '' && this.state.map((rep,index)=>(
          <div key={index}>{rep}</div>
        ))}
      </div>
      );
  }
}
export default Tab;