import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
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
        d="M4 4.667l4 4 4-4L13.333 6 8 11.333 2.667 6 4 4.667z"
        fill="#454545"
      />
    </Svg>
  )
}

export default SvgComponent
