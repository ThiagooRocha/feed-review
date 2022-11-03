import "./Error.css";

import { XCircle } from "phosphor-react";

export const Error = ({ message }) => {
  return (
    <div className="error-form">
      <XCircle size={32} color="#e11d48" />
      <p>{message}</p>
    </div>
  );
};
