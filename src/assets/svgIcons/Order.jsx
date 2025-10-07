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
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 1.5a.75.75 0 00-.715.975L7.699 3H5.25a.75.75 0 00-.75.75v18a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-18a.75.75 0 00-.75-.75h-2.448l.165-.525a.75.75 0 00-.717-.975h-7.5zM9.27 3h5.46l-.47 1.5H9.74L9.27 3zm7.23 7.5h-9V9h9v1.5zm0 3.75h-9v-1.5h9v1.5zM7.5 18h6v-1.5h-6V18z"
        fill="#6D6D6D"
      />
    </Svg>
  )
}

export default SvgComponent
