import React from "react";
import "./index.css";
interface ReusableButtonProps {
  buttonText: string;
  onClick: (e: any) => void;
}
const ReusableButton = ({ buttonText, onClick }: ReusableButtonProps) => {
  return (
    <button className="reuable-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ReusableButton;
