import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QrUpload(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.5 4.5v14h14v2h-14c-1.1 0-2-.9-2-2v-14h2zm16-4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2h12zm-12 14h12v-12h-12v12zm11-1h-10l2.5-3.33 1.69 2.26 2.48-3.1 3.33 4.17z"
        fill="#3E3E3E"
      />
    </Svg>
  )
}

export default QrUpload
