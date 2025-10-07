import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="#6D6D6D" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3a1 1 0 011 1v1.07A7 7 0 0118.93 11H20a1 1 0 010 2h-1.07A7 7 0 0113 18.93V20a1 1 0 01-2 0v-1.07A7 7 0 015.07 13H4a1 1 0 010-2h1.07A7.005 7.005 0 0111 5.07V4a1 1 0 011-1zm-5 9a5 5 0 1110 0 5 5 0 01-10 0z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default SvgComponent
