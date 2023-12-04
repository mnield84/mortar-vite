import React from "react";
import ErrorIcon from "../assets/error-icon.png";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img className="w-[150px]" src={ErrorIcon} alt="error icon" />
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
