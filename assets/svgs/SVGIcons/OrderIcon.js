import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={22}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25.5a.75.75 0 00-.716.975L3.7 2H1.25a.75.75 0 00-.75.75v18a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-18a.75.75 0 00-.75-.75h-2.448l.165-.525A.75.75 0 0011.75.5h-7.5zM5.27 2h5.46l-.47 1.5H5.74L5.27 2zm7.23 7.5h-9V8h9v1.5zm0 3.75h-9v-1.5h9v1.5zM3.5 17h6v-1.5h-6V17z"
        fill="#4F4F4F"
      />
    </Svg>
  )
}

export default SvgComponent
