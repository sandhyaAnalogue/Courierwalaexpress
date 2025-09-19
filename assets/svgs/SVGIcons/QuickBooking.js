import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QuickBooking(props) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.286 24a6.286 6.286 0 100-12.571 6.286 6.286 0 000 12.571z"
        stroke="#000"
        strokeWidth={2.58891}
      />
      <Path
        d="M8.286 11.429l6.857-6.286h8"
        stroke="#000"
        strokeWidth={2.58891}
        strokeLinecap="round"
      />
      <Path d="M18.572 0l-5.143 8.571h6.285l-5.142 8.572" fill="#000" />
    </Svg>
  )
}

export default QuickBooking
