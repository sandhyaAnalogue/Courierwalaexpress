import * as React from "react"
import Svg, { Path } from "react-native-svg"
 
function CalculatorIcon(props) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0A1.5 1.5 0 00.5 1.5v15A1.5 1.5 0 002 18h12a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0014 0H2zm1.5 3v3h9V3h-9zM5 7.5V9H3.5V7.5H5zm3.75 0V9h-1.5V7.5h1.5zM12.5 9V7.5H11V9h1.5zM5 10.5V12H3.5v-1.5H5zM8.75 12v-1.5h-1.5V12h1.5zm3.75-1.5V15H11v-4.5h1.5zM5 15v-1.5H3.5V15H5zm2.25 0v-1.5h1.5V15h-1.5z"
        fill="#FFFFFF"
      />
    </Svg>
  )
}
 
export default CalculatorIcon 