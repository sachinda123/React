import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login, clearMsg } from "../actions/authActions";

const Login = () => {
  const navigate = useNavigate();
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
    <div className="card card-container login">
      <div className="form-group">
        <label htmlFor="username">Login</label>
      </div>
      <Form onSubmit={handleLogin} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} required />
        </div>
        <div className="form-group">
          <button className="btn btn-secondary btn-block signbtn" disabled={loading ? true : false}>
            {loading ? (
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
        <div className="form-group">{error && <span className="badge bg-danger">{error.message}</span>}</div>
        <div className="form-group flexBox">
          <div className="line"></div> <div className="signtext">What new ? </div>
          <div className="line"></div>
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <div className="form-group">
        <a href="/signin">
          <button className="btn btn-secondary btn-block signbtn">
            <span>Sign Up</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
