import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
import { authenticationService } from "../services/authService";
import showNotification from "../utils/notify";
import Toast from "../components/Toast";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const data = await authenticationService.signup(
          username,
          email,
          password,
        );
        showNotification("Account Created!", "success");
        return;
      } catch (error) {
        showNotification(`${error}`, "error");
        return;
      }
    }
    console.log(password, confirmPassword);
    showNotification("Passwords don't match", "error");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await authenticationService.login(email, password);
      login(data.token);
      showNotification("Logged in!", "success");
      navigate("/");
      return data;
    } catch (error: any) {
      console.error(error);
      showNotification(error, "error");
      return;
    }
  };

  const changeMode = (mode: string) => {
    setMode(mode);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex">
      <NavigationBar active="user" />
      <div className="w-full h-screen">
        {mode === "signup" ? (
          <form
            className="flex flex-col items-center gap-5 h-full justify-center"
            onSubmit={handleSignup}
          >
            <h1 className="text-white">Create an account</h1>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <FaUser color="grey" className="absolute top-3 left-2" />
            </div>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FaEnvelope color="grey" className="absolute top-3 left-2" />
            </div>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FaLock color="grey" className="absolute top-3 left-2" />
            </div>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <FaLock color="grey" className="absolute top-3 left-2" />
            </div>
            <button className="bg-green-800 w-100 h-10 rounded-md text-white hover:bg-green-900 hover:cursor-pointer">
              Signup
            </button>
            <small
              className="text-white hover:cursor-pointer"
              onClick={() => changeMode("login")}
            >
              Already got an account?
            </small>
          </form>
        ) : (
          <form
            className="flex flex-col items-center gap-5 h-full justify-center"
            onSubmit={handleLogin}
          >
            <h1 className="text-white">Login</h1>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FaEnvelope color="grey" className="absolute top-3 left-2" />
            </div>
            <div className="flex w-3/4 justify-center relative">
              <input
                className="bg-white w-full rounded-md h-10 px-8"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FaLock color="grey" className="absolute top-3 left-2" />
            </div>
            <button className="bg-green-800 w-100 h-10 rounded-md text-white hover:bg-green-900 hover:cursor-pointer">
              Login
            </button>
            <small
              className="text-white hover:cursor-pointer"
              onClick={() => changeMode("signup")}
            >
              Don't have an account yet?
            </small>
          </form>
        )}
      </div>
      <Toast></Toast>
    </div>
  );
}
