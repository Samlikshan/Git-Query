import { AlertTriangle } from "lucide-react";
import "../styles/ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <AlertTriangle className="error-icon" size={20} />
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
