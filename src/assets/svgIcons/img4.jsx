import * as React from "react"
import Svg, { Path } from "react-native-svg"
 
function SvgComponent(props) {
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
        d="M2 18c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 010 16V2C0 1.45.196.98.588.588A1.93 1.93 0 012 0h14c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v14c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0116 18H2zm1-4h12l-3.75-5-3 4L6 10l-3 4z"
        fill="#252525"
      />
    </Svg>
  )
}
 
export default SvgComponent