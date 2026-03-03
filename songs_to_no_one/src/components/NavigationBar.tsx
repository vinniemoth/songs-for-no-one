import { FaHome, FaPlus, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface NavigationBarProps {
  active: string;
}

export default function NavigationBar(props: NavigationBarProps) {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <nav
      className="
    fixed bottom-0 left-0 w-full h-16 border-t 
    md:sticky md:top-0 md:left-0 md:h-screen md:w-fit md:border-t-0 md:border-r 
    flex flex-row md:flex-col justify-between 
    bg-black border-zinc-800 z-50
  "
    >
      <div className="flex flex-row md:flex-col gap-2 p-2 w-full justify-around md:justify-start">
        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "home" && "bg-zinc-800"} hover:bg-zinc-800 rounded-lg transition-colors`}
          onClick={() => navigate("/")}
        >
          <FaHome size={28} color={"white"} className="md:w-7.5" />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "search" && "bg-zinc-800"} hover:bg-zinc-800 rounded-lg transition-colors`}
          onClick={() => navigate("/search")}
        >
          <FaSearch size={28} color={"white"} className="md:w-7.5" />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "post" ? "bg-zinc-800" : ""} hover:bg-zinc-800 rounded-lg transition-colors`}
          onClick={() => navigate("/post")}
        >
          <FaPlus size={28} color={"white"} className="md:w-7.5" />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "user" ? "bg-zinc-800" : ""} hover:bg-zinc-800 rounded-lg transition-colors`}
          onClick={() => navigate(token ? "/profile" : "/signup")}
        >
          <FaUser size={28} color={"white"} className="md:w-7.5" />
        </div>
      </div>

      {token && (
        <div
          className="flex justify-center p-4 m-2 hover:cursor-pointer hover:bg-red-900/20 rounded-lg md:mt-auto md:mb-4"
          onClick={handleLogout}
          title="Sair"
        >
          <FaSignOutAlt size={28} color={"#ef4444"} className="md:w-7.5" />
        </div>
      )}
    </nav>
  );
}
