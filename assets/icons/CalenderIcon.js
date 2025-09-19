import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CalenderIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.333 12.667c0 1.133.867 2 2 2h9.334c1.133 0 2-.867 2-2V7.333H1.333v5.334zm11.334-10h-1.334V2c0-.4-.266-.667-.666-.667S10 1.6 10 2v.667H6V2c0-.4-.267-.667-.667-.667S4.667 1.6 4.667 2v.667H3.333c-1.133 0-2 .866-2 2V6h13.334V4.667c0-1.134-.867-2-2-2z"
        fill="#454545"
      />
    </Svg>
  )
}

export default CalenderIcon
