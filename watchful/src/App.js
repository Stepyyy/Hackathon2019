import React from "react";
import "./App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import logo from "./watchful.png";

class App extends React.Component {
  state = {
    shows: [{ name: "yes", link: "www.google.com" }]
  };
  componentDidMount() {}

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
              <Dropdown.Item href="#/action-2">
                this.state.shows[aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Dropdown.Item>
              <Dropdown.Item
                href="https://en.wikipedia.org/wiki/La_La_Land_(film)"
                target="_blank"
              >
                this.state.shows[2]}
              </Dropdown.Item>
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
