import { FaHome, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

interface NavigationBarProps {
  active: string;
}

export default function NavigationBar(props: NavigationBarProps) {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 flex-col justify-center items-center h-screen w-fit">
      <div
        className={`flex justify-center p-4 m-2 hover:cursor-pointer ${props.active === "home" ? "active rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
        onClick={() => navigate("/")}
      >
        <FaHome size={30} color={"white"} />
      </div>
      <div
        className={`flex justify-center p-4 m-2 hover:cursor-pointer ${props.active === "search" ? "active rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
        onClick={() => navigate("/search")}
      >
        <FaSearch size={30} color={"white"} />
      </div>
      <div
        className={`flex justify-center p-4 m-2 hover:cursor-pointer ${props.active === "post" ? "active rounded-lg" : ""} hover:bg-zinc-800 rounded-lg`}
        onClick={() => navigate("/post")}
      >
        <FaPlus size={30} color={"white"} />
      </div>
    </nav>
  );
}
