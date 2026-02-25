import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import { useState } from "react";

export default function SignupPage() {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                type="text"
                placeholder="Password"
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
    </div>
  );
}
