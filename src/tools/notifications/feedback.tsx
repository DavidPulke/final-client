import { toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from "react";

let styleSettings = (time: number): ToastOptions => {
    return {
        position: "bottom-right",
        autoClose: time,
        theme: "dark"
    }
}

export function successMsg(msg: string) {
    toast.success(msg, styleSettings(3000));
}

export function errorMsg(msg: string | ReactNode) {
    toast.error(msg, styleSettings(4000));
}

export function errorPayMsg(cost: number, balance: number) {
    const missing = cost - balance;

    errorMsg(
        <span className="flex-column">
            <span className="flex"> Required: {cost}  <i className="fa-solid fa-coins text-warning"></i></span>
            <span className="flex"> Missing: {missing}  <i className="fa-solid fa-coins text-warning" ></i></span>
        </span>,
    );
}

