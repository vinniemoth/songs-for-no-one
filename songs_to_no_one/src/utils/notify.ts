import { Bounce, toast } from "react-toastify";

type ToastType = "success" | "error";

const showNotification = (message: string, type: ToastType) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

export default showNotification;
