import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({color="#F6F6F6",...props}) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M14 7.998H8v6H6v-6H0v-2h6v-6h2v6h6v2z" fill={color} />
    </Svg>
  )
}

export default SvgComponent
