// import { FaUser } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import CitySearchInput from "./CitySearchInput";

// interface DedicatoryInputProps {
//   onDedicationChange: (value: string) => void;
//   onLocationChange: (value: string) => void;
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }

// export default function DedicatoryInput(props: DedicatoryInputProps) {
//   return (
//     <form className="flex flex-col flex-2 gap-5 p-2" onSubmit={props.onSubmit}>
//       <div className="flex-col relative">
//         <FaUser className="absolute top-3 left-1"></FaUser>
//         <input
//           type="text"
//           className="bg-zinc-300 px-7 h-10 w-3/4 rounded-lg"
//           onChange={(e) => props.onDedicationChange(e.target.value)}
//           placeholder="Dedicatory"
//         />
//       </div>
//       <div className="flex-col relative">
//         <FaLocationDot className="absolute top-3 left-1"></FaLocationDot>
//         <CitySearchInput onChange={props.onLocationChange}></CitySearchInput>
//         <input
//           type="text"
//           className="bg-zinc-300 px-7 h-10 w-3/4 rounded-lg"
//           onChange={(e) => props.onLocationChange(e.target.value)}
//           placeholder="From Where"
//         />
//       </div>
//       <button className="bg-green-600 rounded-lg h-10 w-3/4 hover:cursor-pointer hover:bg-green-700">
//         Post
//       </button>
//     </form>
//   );
// }
