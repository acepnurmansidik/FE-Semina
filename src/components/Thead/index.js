import React from "react";

const Thead = ({ text }) => {
  return (
    <thead className="thead-dark">
      <tr>
        {text.map((text, index) => {
          return <th key={index}>{text}</th>;
        })}
      </tr>
    </thead>
  );
};

export default Thead;
