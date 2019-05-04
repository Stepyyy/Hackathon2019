import React from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import withRouter from 'react-router-dom';



class App extends React.Component {


  state = {
    shows: [{ name: 'yes', link: 'www.google.com' }],
    routeChange: routeChange.bind(this),
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <DropdownButton id="dropdown-basic-button" title="Search for watch parties">
              <Dropdown.Item href="#/action-2">this.state.shows[1]</Dropdown.Item>
              <Dropdown.Item href="https://en.wikipedia.org/wiki/La_La_Land_(film)" target="_blank">this.state.shows[2]}</Dropdown.Item>
            </DropdownButton>
          </header>
          <div className="App-create">
            <ButtonToolbar>
              <Button variant="info" onClick={() => {console.log('yes')}}>Create watch party</Button>
            </ButtonToolbar>;
        </div>
        </div>
      </div>





    );
  }
}





export default App;
