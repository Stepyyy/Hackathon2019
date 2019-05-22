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
        poster: ""
      },
      parties: null
    }
  };
  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ shows: response });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    var currentShow = this.state.selected.showID;
    if (currentShow !== prevState.selected.showID) {
      fetch(`http://localhost:3001/show/id/${currentShow}`).then(res =>
        this.setState({
          selected: {
            showID: currentShow,
            isVisible: true,
            details: {
              title: "La La Land",
              year: 2016,
              poster:
                "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg"
            }
          }
        })
      );
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
              {this.state.shows.map(show => (
                <Dropdown.Item
                  key={show.imdbID}
                  href={`https://imdb.com/title/${show.imdbID}`}
                  target="_blank"
                  onSelect={() => {
                    this.setState({
                      selected: {
                        showID: show.imdbID,
                        isVisible: true,
                        details: {
                          title: this.state.selected.details.title,
                          year: this.state.selected.details.year,
                          poster: this.state.selected.details.poster
                        }
                      }
                    });
                  }}
                >
                  {show.title}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </header>
          {this.state.selected.isVisible && (
            <img src={this.state.selected.details.poster} />
          )}
          <div className="App-create">
            <ButtonToolbar>
              <Button
                variant="info"
                onClick={() => {
                  console.log("This functionality doesn't work yet");
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
