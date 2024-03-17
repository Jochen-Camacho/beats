import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(username, password);
    navigate("/");
  };

  return (
    <div className="pageCont">
      <div className="innerFormPageCont">
        <div className="formPageCont">
          <div className="formPageTitle navLogo">BEATS</div>
          <form className="formPageContent" onSubmit={handleSubmit}>
            <label className="formEntryCont">
              Username:{" "}
              <input
                type="text"
                className="formEntry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
            <label className="formEntryCont">
              Email: <input type="email" className="formEntry"></input>
            </label>
            <div className="passwordCont">
              <label className="formEntryCont">
                Password:{" "}
                <input
                  type="password"
                  className="formEntry"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
              <label className="formEntryCont">
                Confirm Password:
                <input type="password" className="formEntry"></input>
              </label>
            </div>
            <button className="formSubmitBtn btnGreen">REGISTER</button>
            {/* <button className="loginSubmitBtn btnGreen">REGISTER</button>*/}
            <small className="formMsg">
              By creating an account and/or logging in, you agree to Beats{" "}
              <span className="link">
                <Link to="/register">Terms and Conditions.</Link>
              </span>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};
