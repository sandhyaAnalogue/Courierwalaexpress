import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

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
      <Rect
        x={0.25}
        y={0.25}
        width={19.5}
        height={19.5}
        rx={9.75}
        fill="#F6F6F6"
      />
      <Rect
        x={0.25}
        y={0.25}
        width={19.5}
        height={19.5}
        rx={9.75}
        stroke="#F6F6F6"
        strokeWidth={0.5}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.22 13.78a.75.75 0 010-1.06l5.22-5.22H7.75a.75.75 0 110-1.5h5.5a.75.75 0 01.75.75v5.5a.75.75 0 11-1.5 0V8.56l-5.22 5.22a.75.75 0 01-1.06 0z"
        fill="#252525"
      />
    </Svg>
  )
}

export default SvgComponent
