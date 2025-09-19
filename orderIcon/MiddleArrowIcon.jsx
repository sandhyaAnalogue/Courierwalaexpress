import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.667 10l.295-.295.294.295-.294.295-.295-.295zm-12.5.417a.416.416 0 110-.834v.834zm7.795-5.712l5 5-.59.59-5-5 .59-.59zm5 5.59l-5 5-.59-.59 5-5 .59.59zm-.295.122h-12.5v-.834h12.5v.834z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
