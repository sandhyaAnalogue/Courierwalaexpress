import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DownArrow(props) {
  return (
    <Svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 .667l4 4 4-4L11.333 2 6 7.333.667 2 2 .667z"
        fill="#454545"
      />
    </Svg>
  )
}

export default DownArrow
