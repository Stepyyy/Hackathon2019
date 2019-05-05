import React from "react";
import "./App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import logo from "./watchful.png";

class App extends React.Component {
  state = {
    shows: []
  };
  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(response =>{
        console.log(response)
        return response.json()
      })
      .then(
        response => {
          this.setState({shows : response})
          console.log(this.state)
        })
    }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <header>
            <DropdownButton
              id="dropdown-basic-button"
              variant="info"
              title="Search for watch parties"
            >
            {this.state.shows.map((title, imdbID) => <Dropdown.Item>{title}</Dropdown.Item>)}
            
            </DropdownButton>
          </header>

          <div className="App-create">
            <ButtonToolbar>
              <Button
                variant="info"
                onClick={() => {
                  console.log("yes");
                }}
              >
                Create watch party
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

console.log(logo);

function Header() {
  return <img className="logo" src={logo} alt="Logo" />;
}

export default App;
