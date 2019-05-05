import React from "react";
import "./App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import logo from "./watchful.png";

class App extends React.Component {
  state = {
    shows: [],
    selected: {
      showID: null,
      isVisible: false,
      details: {
        title: null,
        year: null,
        poster: ''
      },
      parties: null
    }
  };
  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(response =>{
        return response.json()
      })
      .then(
        response => {
          this.setState({shows : response})
        })
    }
  
  componentDidUpdate(prevProps, prevState) {
    var currentShow = this.state.selected.showID
    if (currentShow !== prevState.selected.showID){
      fetch(`http://localhost:3001/parties/${currentShow}`)
        .then(res => res.json())
        .then(res => this.setState(
          {selected: {parties: {
            title: res.Title,
            year: res.Year,
            poster: res.Poster
          }}}
        ))
      fetch(`http://localhost:3001/show/id/${currentShow}`)
        .then(res => res.json())
        .then(res => this.setState(
          { selected: {details: res}}
        ))
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <header>
          Powered by OMDb.
            <DropdownButton
              id="dropdown-basic-button"
              variant="info"
              title="Search for watch parties"
            >
            
            {this.state.shows.map(show => (<Dropdown.Item key={show.imdbID} href={`https://imdb.com/title/${show.imdbID}`} target='_blank' onSelect={() => {
              this.setState({selected: {showID: show.imdbID, isVisible: true, details: {title: null, year: null, poster: null}}})
            }}>{show.title}</Dropdown.Item>))}

            </DropdownButton>
          </header>
              {this.state.selected.isVisible &&
              console.log(this.state)
              }
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
