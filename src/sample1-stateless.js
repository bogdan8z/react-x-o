import React from 'react';
//an example of function type (stateless) component
const ExampleComponent = (props) => {
    return ( <h1>Welcome to Educative1 !</h1>);
}

export  class AppTestMe1 extends React.Component {
  render() {
    //rendering ExampleComponent component in AppTestMe1 Component
    return (
      <div>
        <ExampleComponent/> 
        </div>
    );
  }
}
