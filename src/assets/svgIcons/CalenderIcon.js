import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CalenderIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 17c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V9H0v8zM17 2h-2V1c0-.6-.4-1-1-1s-1 .4-1 1v1H7V1c0-.6-.4-1-1-1S5 .4 5 1v1H3C1.3 2 0 3.3 0 5v2h20V5c0-1.7-1.3-3-3-3z"
        fill="#454545"
      />
    </Svg>
  )
}

export default CalenderIcon
