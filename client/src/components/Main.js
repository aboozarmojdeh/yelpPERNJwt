import React, { Fragment } from "react";
import "./Main.css";
import mainPagefashion from "../img/mainPagefashion.png";
const Main = () => {
  return (
    <Fragment>
      <div className="container">
        <ul class="nav justify-content-end my-3">
          <li class="nav-item">
            <a class="nav-link" href="/register">
              Join now
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-outline-primary" aria-current="page" href="/login">
              Sign in
            </a>
          </li>
        </ul>
        <div className="container my-5">
          <div class="row">
            <div class="col-sm">
              <h1 className="mainPage-h1">
                Welcome to your YELP clone
              </h1>
            </div>
            <div class="col-sm">
              <img src={mainPagefashion} width="100%" height="400" alt="Logo" />
            </div>
          </div>
          <div class="row my-3">
          <div class="col-sm">
              <h2 className="mainPage-h2">Find fashion, fitness and photography models</h2>
              
              </div>
              <div class="col-sm">
              <h2 className="mainPage-h2">Find fashion, fitness and photography models</h2>
              
              </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default Main;
