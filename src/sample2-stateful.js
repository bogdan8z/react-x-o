import React from 'react';

//an example of class type component
class ExampleComponent extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                heading: "This is an Example Component!"
            }


        }

        render() {
            return ( 
                <div>
                    <h1 > {this.props.welcomeMsg} < /h1> 
                    <h2 > { this.state.heading} < /h2> 
                </div>);

        }

}

export default class AppTestMe2 extends React.Component {
  render() {
    const welcomeMsg="Welcome to Educative2 !";
    return (
      <div>
        <ExampleComponent welcomeMsg={welcomeMsg}/>
      </div>
    );
  }
}
