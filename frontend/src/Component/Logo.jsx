import React from "react";
import myLogo from "../image/mylogo3.png";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={myLogo} alt="Logo" style={{ width: width }} />
    </div>
  );
}

export default Logo;
