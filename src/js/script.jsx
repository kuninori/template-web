"use strict";

import React from "react";
import ReactDOM from "react-dom"

class App extends React.Component {
  render(){
    return (
      <div>サンプル</div>
    );
  }
}

window.addEventListener("load", ()=>{
  ReactDOM.render(document.body, <App />);
});