import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UploadIcon(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.807 4.14l1.526-1.534V9a.667.667 0 101.334 0V2.606L9.194 4.14a.667.667 0 001.092-.217.668.668 0 00-.146-.73L7.473.526a.667.667 0 00-.22-.14.667.667 0 00-.506 0 .667.667 0 00-.22.14L3.86 3.193a.67.67 0 00.947.947zM13 7a.667.667 0 00-.666.666v4a.666.666 0 01-.667.667H2.333a.666.666 0 01-.666-.667v-4a.667.667 0 00-1.334 0v4a2 2 0 002 2h9.334a2 2 0 002-2v-4A.667.667 0 0013 7z"
        fill="#5D5D5D"
      />
    </Svg>
  )
}

export default UploadIcon
