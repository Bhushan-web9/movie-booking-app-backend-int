import React from "react";
import Home from "./screens/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./screens/details/Details";
import BookShow from "./screens/bookshow/BookShow";
import Confirmation from './screens/confirmation/Confirmation'
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie/:movieid">
            <Details />
          </Route>
          <Route exact path="/movies/:id/shows">
            <BookShow />
          </Route>
          <Route exact path="/confirm/:id">
                <Confirmation/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
