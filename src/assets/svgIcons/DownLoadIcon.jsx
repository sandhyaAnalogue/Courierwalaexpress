import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.5 11.166L5.167 7.833l.933-.966L7.834 8.6V3.167h1.333V8.6L10.9 6.867l.934.966L8.5 11.166zm-4 2.667c-.366 0-.68-.13-.941-.391a1.287 1.287 0 01-.392-.942v-2H4.5v2h8v-2h1.334v2c0 .367-.13.68-.392.942a1.28 1.28 0 01-.942.391h-8z"
        fill="#F6F6F6"
      />
    </Svg>
  )
}

export default SvgComponent
