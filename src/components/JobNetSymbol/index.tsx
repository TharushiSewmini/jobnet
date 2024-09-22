import React from "react";
import Letter from "../../assets/letter.svg";
import "./index.css";

interface JobNetSymbolPropos {
  imageIcon?: string;
  tileText?: string;
  textSize?: string;
  textColor?: string;
  gap?: string;
  onClick: (e: any) => void;
}
const JobNetSymbol = ({
  imageIcon,
  tileText,
  textSize,
  textColor,
  gap,
  onClick,
}: JobNetSymbolPropos) => {
  return (
    <div
      className="job-net-symbol-icon"
      style={{ gap: gap ? gap : "8px" }}
      onClick={onClick}
    >
      <div className="job-net-symbol-letter-icon">
        <img src={imageIcon ? imageIcon : Letter} />
      </div>
      <div
        className="job-net-symbol-sentence-icon"
        style={{ color: textColor ? textColor : "white" }}
      >
        {tileText ? tileText : "Jobnet"}
      </div>
    </div>
  );
};

export default JobNetSymbol;
