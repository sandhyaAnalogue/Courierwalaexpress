import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M9 12a3 3 0 100-6 3 3 0 000 6z" fill="#6D6D6D" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a1 1 0 011 1v1.07A7 7 0 0115.93 8H17a1 1 0 110 2h-1.07A7 7 0 0110 15.93V17a1 1 0 11-2 0v-1.07A7 7 0 012.07 10H1a1 1 0 010-2h1.07A7.005 7.005 0 018 2.07V1a1 1 0 011-1zM4 9a5 5 0 1110 0A5 5 0 014 9z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default SvgComponent
