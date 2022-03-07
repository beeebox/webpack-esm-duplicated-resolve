import React, { createElement, StrictMode } from "react";
import ReactDOM from "react-dom";
import TestComponent from "./Test.component";

const app = document.getElementById("root");

ReactDOM.render(  
  createElement(TestComponent),
  app
);
