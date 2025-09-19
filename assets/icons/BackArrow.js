import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.667 14.167L7.5 10l4.167-4.167"
        stroke="#4F4F4F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BackArrow
