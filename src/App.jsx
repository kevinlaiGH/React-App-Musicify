import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null
    };
  }

  search() {
    console.log("this.state: ", this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const FETCH_URL =
      BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    console.log("FETCH_URL", FETCH_URL);

    var accessToken =
      "BQAWuKf-QROylhoYsHxEnj7LMA5ipxK5yKzxImwCYLy19hvY1RJQ9wunEAtmcnj7nQg-raBblQt4bBlrAww4zxG9zzaumpLcnnj9W8882lTYH4IuxMQuwHCbPLmjHyx9Ts1FA2T4PpRaqlkUASACTXWKpzpOsA&refresh_token=AQDdXcYtLowuXvm6BIVSfZXvcH3zGRaEAIe9efxiwgSD9qS9Uj6hprtkQqgoaTS_Yh-fpUj_saAoLyMjqZyO2C_1yvC9iSduCsX90DZ5ZiI0GDfL-LbWpnHkR3Z0qP2bJEE";

    var myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log("artist", artist);
        this.setState({ artist });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Musicify</div>

        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <Profile artist={this.state.artist} />
        <div className="Gallery">Gallery</div>
      </div>
    );
  }
}

export default App;
