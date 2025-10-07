import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Delete(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 3.75a.75.75 0 110 1.5h-.75l-.002.053-.7 9.803a1.5 1.5 0 01-1.496 1.394H5.948a1.5 1.5 0 01-1.497-1.393l-.7-9.803-.001-.054H3a.75.75 0 010-1.5h12zM10.5 1.5a.75.75 0 110 1.5h-3a.75.75 0 010-1.5h3z"
        fill="#252525"
      />
    </Svg>
  )
}

export default Delete
