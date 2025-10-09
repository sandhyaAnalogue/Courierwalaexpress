import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightArrowIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 9h12m0 0L9.75 3.75M15 9l-5.25 5.25"
        stroke="#F6F6F6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default RightArrowIcon
