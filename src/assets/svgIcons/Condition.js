import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Condition(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM8.25 6a.75.75 0 00.75.75h.006a.75.75 0 000-1.5H9a.75.75 0 00-.75.75zM9 12.75a.75.75 0 00.75-.75V8.25a.75.75 0 00-1.5 0V12a.75.75 0 00.75.75z"
        fill="#252525"
      />
    </Svg>
  )
}

export default Condition
