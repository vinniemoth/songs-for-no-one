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
    <nav className="sticky top-0 flex flex-col h-screen w-fit bg-black border-r border-zinc-800">
      <div className="flex flex-col gap-2 p-2">
        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "home" ? "bg-zinc-800 rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
          onClick={() => navigate("/")}
        >
          <FaHome size={30} color={"white"} />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "search" ? "bg-zinc-800 rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
          onClick={() => navigate("/search")}
        >
          <FaSearch size={30} color={"white"} />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "post" ? "bg-zinc-800 rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
          onClick={() => navigate("/post")}
        >
          <FaPlus size={30} color={"white"} />
        </div>

        <div
          className={`flex justify-center p-4 hover:cursor-pointer ${props.active === "user" ? "bg-zinc-800 rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
          onClick={() => navigate(token ? "/profile" : "/signup")}
        >
          <FaUser size={30} color={"white"} />
        </div>
      </div>

      {token && (
        <div
          className="flex justify-center p-4 m-2 hover:cursor-pointer hover:bg-red-900/20 rounded-lg mt-auto mb-4"
          onClick={handleLogout}
          title="Sair"
        >
          <FaSignOutAlt size={30} color={"#ef4444"} />
        </div>
      )}
    </nav>
  );
}
