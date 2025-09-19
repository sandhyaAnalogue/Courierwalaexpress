import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props) {
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
        d="M7.508 14.756s-4.841-4.077-4.841-8.09a5.333 5.333 0 1110.666 0c0 4.013-4.84 8.09-4.84 8.09a.747.747 0 01-.985 0zM8 9a2.333 2.333 0 100-4.667A2.333 2.333 0 008 9z"
        fill="#5D5D5D"
      />
    </Svg>
  )
}

export default LocationIcon
