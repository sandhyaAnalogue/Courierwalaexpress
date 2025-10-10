import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Tourch(props) {
  return (
    <Svg
      width={11}
      height={21}
      viewBox="0 0 11 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M.5.5v11h3v9l7-12h-4l3-8h-9z" fill="#3E3E3E" />
    </Svg>
  )
}

export default Tourch
