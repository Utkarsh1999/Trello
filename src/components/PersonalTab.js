import React, { Fragment, useEffect, useState } from 'react'
import * as microsoftTeams from "@microsoft/teams-js";
import {
    Card
} from '@uifabric/react-cards';

import {
    Text
} from 'office-ui-fabric-react';

export default function PersonalTab() {

    const [values, setValues] = useState({
        context:{},
        github: ''
    })

//React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  const setContext = () => {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      setValues({
          ...values,
        context: context
      });
    });
    // Next steps: Error handling using the error object
  }

  useEffect(() => {
    setContext()
      
  }, [])

    const loadGithubRepo = () => {
    
        const requestString = 'https://api.trello.com/1/members/me/boards/?key=900cf7824abb08bcdd3e1beffdf5bd90&token=6dc6df8cb9b78839651599eb162705ffbf406f8ce7aef70779db77dd912898d5';
            console.log(requestString);
            fetch(requestString)
            .then(response => response.json())
            .then(data => setValues({
              ...values,
              github: data
            }));
      }

    return (
        <Fragment>
        <Card aria-label="Basic vertical card">
          <Card.Item>
            <Text>Basic vertical card</Text>
          </Card.Item>
        </Card>
        <h3 onClick={loadGithubRepo}>Click Me!</h3>
        {values.github !== '' && values.github.map((rep,index)=>(
            <Card aria-label="Basic vertical card">
            <Card.Item>
              <Text>{rep.name}</Text>
            </Card.Item>
          </Card>

        ))}
          <div>{JSON.stringify(values.context)}</div>
        </Fragment>
    )
}
