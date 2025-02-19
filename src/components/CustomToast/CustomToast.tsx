import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

interface CustomToastProps {
  message: string;
  type?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  return (
    <div className="flex items-center justify-between rounded">
      <div className="flex items-center text-white">
        {type === "success" ? (
          <FiCheckCircle className="text-green-400 w-[17px] h-[17px] mr-2" />
        ) : (
          <FiAlertCircle className="text-red w-[17px] h-[17px] mr-2" />
        )}
        <span className=" text-sm ">{message}</span>
      </div>
      <IoClose
        className="text-primary text-[17px]"
        onClick={() => toast.dismiss()}
      />
    </div>
  );
};

export default CustomToast;
