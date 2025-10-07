import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({fill,...props}) {
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
        d="M2.451 5.7c0-1.16.941-2.1 2.1-2.1h10.151c1.16 0 2.1.94 2.1 2.1v1.5h1.057a1.8 1.8 0 011.61.996l1.942 3.882c.125.25.19.525.191.804V17.4a1.8 1.8 0 01-1.8 1.8h-1.86a3 3 0 01-5.88 0h-1.32a3 3 0 01-5.88 0h-.31a2.1 2.1 0 01-2.1-2.1V5.7zm14.351 2.7V12h3.228l-1.633-3.269a.6.6 0 00-.537-.331h-1.058zm-9 8.4a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm5.4 1.8a1.8 1.8 0 103.6 0 1.8 1.8 0 00-3.6 0z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
