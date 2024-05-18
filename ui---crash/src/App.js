import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Login from "./components/login.component";
// import Register from "./components/register.component";
import Home from "./components/home.component";
// import { logout } from "./actions/auth";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);

    // this.state = {
    //   showModeratorBoard: false,
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // };

    // history.listen((location) => {
    //   // props.dispatch(clearMessage()); // clear message when changing location
    // });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      // this.setState({
      //   currentUser: user,
      //   // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
      //   // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      // });
    }

    EventBus.on("logout", () => {
      // this.logOut();
    });
  }

  componentWillUnmount() {
    // EventBus.remove("logout");
  }

  logOut() {
    // this.props.dispatch(logout());
    // this.setState({
    //   showModeratorBoard: false,
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // });
  }

  render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/register" component={Register} /> */}
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  // const { user } = state.auth;
  // return {
  //   user,
  // };
}

export default connect(mapStateToProps)(App);
