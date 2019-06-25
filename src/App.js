import React from 'react';
import './App.css';

import DesktopHeader from "./desktop/Header.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      results: [],
      isMobile: false,
      subReddit: "",
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    if (this.state.width < 600) {
      this.setState({
        isMobile: true,
      })
    }
    else {
      this.setState({
        isMobile: false,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    this.setState({
      results: [],
    });

    fetch('/api/scrape/' + this.state.subReddit).then(res => res.json()).then((result => {
      this.setState({
        results: result,
      });
    }));
  };

  componentDidMount() {
    fetch('/api/scrape').then(res => res.json()).then((result) => {
      this.setState({
        results: result,
      })
    })
  }

  render() {
    if (this.state.isMobile) {
      return (
        <div className="App" >
          {this.state.results.map(result => (
            <div className="mobile-result">
              <h1 className="mobile-title">{result.title}</h1>
              <a href={"https://reddit.com/" + result.link}>link</a>
            </div>
          ))}
        </div>
      );
    }
    else {
      return (
        <div className="App" >
          <DesktopHeader subReddit={this.state.subReddit} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}></DesktopHeader>
          <div className="results">
            {this.state.results.map(result => (
              <div className="desktop-result">
                <h1 className="desktop-title">{result.title}</h1>
                <a className="desktop-link" href={"https://reddit.com/" + result.link}>link</a>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
