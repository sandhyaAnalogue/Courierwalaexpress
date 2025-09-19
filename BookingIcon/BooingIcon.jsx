import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 1a.5.5 0 00-.477.65l.11.35H3.5a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-12a.5.5 0 00-.5-.5h-1.632l.11-.35A.5.5 0 0010.5 1h-5zm.68 1h3.64l-.313 1H6.493L6.18 2zM11 7H5V6h6v1zm0 2.5H5v-1h6v1zM5 12h4v-1H5v1z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default SvgComponent
