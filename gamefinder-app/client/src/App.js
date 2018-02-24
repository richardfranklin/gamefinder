import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {

  constructor(props) {
    super();

    this.state = {
      response: "",
      game: "Sonic"
    };

    this.returnResults = this.returnResults.bind(this);
  }

  /* ==================== returnResults  ==================== */
  returnResults() {
    console.log('return results...');

    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }


  /* ==================== callApi  ==================== */
  callApi = async (querys) => {
    const response = await fetch(`/api/test?game=${this.state.game}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  /* ==================== mapData  ==================== */
  mapData(jsonData) {
    console.log(jsonData);

    if (jsonData.length === 0) {
      return <li>Loading...</li>;
    }

    const resultLi = jsonData.map(result => {
      return <li key={result.id}>{result.name}</li>;
    });

    return resultLi;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-intro">
          <ul>{this.mapData(this.state.response)}</ul>

          <button onClick={() => this.returnResults()}>Update Results</button>
        </div>
      </div>
    );
  }
}

export default App;
