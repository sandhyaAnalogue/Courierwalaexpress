import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.202 14.977a7.362 7.362 0 110-14.724 7.362 7.362 0 010 14.724zM7.335 9.19L5.3 7.153l-.78.78 2.297 2.297a.736.736 0 001.041 0l4.382-4.38-.782-.782L7.335 9.19z"
        fill="#252525"
      />
    </Svg>
  )
}

export default SvgComponent
