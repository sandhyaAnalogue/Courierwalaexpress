import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
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
        d="M8 7a4 4 0 118 0 4 4 0 01-8 0zm0 6a5 5 0 00-5 5 3 3 0 003 3h12a3 3 0 003-3 5 5 0 00-5-5H8z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default SvgComponent
