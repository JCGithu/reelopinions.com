import React, { Component } from "react";

class Login extends Component {
  componentDidMount() {
    window.location.replace("https://reelopinions.herokuapp.com/ghost");
  }

  render() {
    return <div />;
  }
}

export default Login;
