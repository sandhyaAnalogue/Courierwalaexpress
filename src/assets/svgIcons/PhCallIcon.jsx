import * as React from "react"
import Svg, { Path } from "react-native-svg"
 
function SvgComponent(props) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.84 8.753c-.82 0-1.613-.133-2.353-.373a.653.653 0 00-.674.16L7.767 9.853c-1.887-.9-3.654-2.6-4.594-4.553l1.3-1.107a.68.68 0 00.16-.68A7.435 7.435 0 014.26 1.16C4.26.8 3.96.5 3.6.5H1.293C.933.5.5.66.5 1.16.5 7.353 5.653 12.5 11.84 12.5c.473 0 .66-.42.66-.787v-2.3c0-.36-.3-.66-.66-.66z"
        fill="#F6F6F6"
      />
    </Svg>
  )
}
 
export default SvgComponent