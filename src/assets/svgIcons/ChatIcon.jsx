import * as React from "react"
import Svg, { Path } from "react-native-svg"
 
function SvgComponent(props) {
  return (
    <Svg
      width={17}
      height={18}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.5 17V3.5c0-.413.147-.765.441-1.059.294-.293.647-.44 1.059-.441h12c.412 0 .766.147 1.06.441.294.294.44.647.44 1.059v9c0 .412-.147.766-.44 1.06A1.44 1.44 0 0115 14H4.5l-3 3zm3-6h6V9.5h-6V11zm0-2.25h9v-1.5h-9v1.5zm0-2.25h9V5h-9v1.5z"
        fill="#000"
      />
    </Svg>
  )
}
 
export default SvgComponent