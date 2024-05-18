import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login, clearMsg } from "../actions/authActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    if (error) {
      dispatch(clearMsg());
    }
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;

    if (error) {
      dispatch(clearMsg());
    }
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div className="form-group">
          <label htmlFor="username">Login</label>
        </div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required]} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
          </div>

          <div className="form-group">
            <button className="btn btn-secondary btn-block signbtn">
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>
          <div className="form-group">
            {error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error.message}
                </div>
              </div>
            )}
          </div>

          <div className="form-group flexBox">
            <div className="line"></div> <div className="signtext">What new ? </div>
            <div className="line"></div>
          </div>

          <div className="form-group">
            <button className="btn btn-secondary btn-block signbtn">
              <span>Sign Up</span>
            </button>
          </div>

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
