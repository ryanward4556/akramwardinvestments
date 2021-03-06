import React from "react";

var buttonStyle = {
  background: "green"
}


function Button({ type = "default", className, children, onClick }) {
  return (
    <button onClick={onClick} className={["rounded-0", "btn btn-sm", `btn-${type}`].join(" ")} style={buttonStyle}>
      {children}
    </button>
  );
}

export default Button;
