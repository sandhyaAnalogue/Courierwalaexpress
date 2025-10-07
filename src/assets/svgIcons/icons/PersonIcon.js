import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PersonIcon({fill ="black",...props}) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333 4.667a2.667 2.667 0 115.334 0 2.667 2.667 0 01-5.334 0zm0 4A3.333 3.333 0 002 12a2 2 0 002 2h8a2 2 0 002-2 3.333 3.333 0 00-3.333-3.333H5.333z"
        fill={fill} 
      />
    </Svg>
  )
}

export default PersonIcon
