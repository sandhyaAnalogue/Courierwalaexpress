import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ fill = "gray", ...props }) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.262 22.134S4 16.018 4 10a8 8 0 1116 0c0 6.018-7.262 12.134-7.262 12.134-.404.372-1.069.368-1.476 0zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
