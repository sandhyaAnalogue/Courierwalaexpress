import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.667 5.833a3.333 3.333 0 116.666 0 3.333 3.333 0 01-6.666 0zm0 5A4.167 4.167 0 002.5 15 2.5 2.5 0 005 17.5h10a2.5 2.5 0 002.5-2.5 4.167 4.167 0 00-4.167-4.167H6.667z"
        fill={props.fill || "#fff"}
      />
    </Svg>
  )
}

export default SvgComponent
