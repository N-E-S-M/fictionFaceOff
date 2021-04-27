import React from "react"

function StarSVG(props) {
    return (
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
      >
        <path
          fill="#eebf66"
          d="M165.52 327.13l-62.43 39.17 2.71-73.65-73.65 2.7 39.17-62.43-65.14-34.48 65.14-34.48-39.17-62.43 73.65 2.71-2.71-73.65 62.43 39.17L200 4.62l34.48 65.14 62.43-39.17-2.71 73.65 73.65-2.71-39.17 62.43 65.14 34.48-65.14 34.48 39.17 62.43-73.65-2.7 2.71 73.65-62.43-39.17L200 392.26z"
        />
      </svg>
    );
}

export default StarSVG;
