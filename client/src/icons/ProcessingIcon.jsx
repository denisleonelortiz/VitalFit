import React from "react";

const ProcessingIcon = ({ className }) => {
  return (
    <div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
            stroke="#D74545"
            stroke-width="1.5"
            stroke-linecap="round"></path>{" "}
          <path
            d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5"
            stroke="#D74545"
            stroke-width="1.5"
            stroke-linecap="round"></path>{" "}
        </g>
      </svg>
    </div>
  );
};

export default ProcessingIcon;
