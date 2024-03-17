import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const auth = useAuth();
  let isAuthenticated = false;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    isAuthenticated = auth.login(username, password);
    if (isAuthenticated) navigate("/");
    else {
      setErrorMsg("Login Credentials Failed");
    }
  };

  return (
    <div className="pageCont">
      <div className="innerFormPageCont">
        <div className="formPageCont">
          <div className="formPageTitle navLogo">BEATS</div>
          <form className="formPageContent" on onSubmit={handleSubmit}>
            <label className="formEntryCont">
              Username:
              <input
                type="text"
                className="formEntry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
            <label className="formEntryCont">
              Password:
              <input
                type="password"
                className="formEntry"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <div className="errorMsg">{errorMsg}</div>
            <button className="formSubmitBtn btnPrimary">LOGIN</button>
            <small className="formMsg loginMsg">
              Don't Have an Account?{" "}
              <span className="link">
                <Link to="/register">Register</Link>
              </span>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};
