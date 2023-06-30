import React from "react";
import './LoaderError.css'

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-message">{message}</div>
    </div>
  );
}

export default Error;


