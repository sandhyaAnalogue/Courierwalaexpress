import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.396 18.5a.75.75 0 01-.75.75c-3.792 0-6.896-3.005-6.896-6.75s3.104-6.75 6.896-6.75c3.105 0 5.749 2.015 6.605 4.801l.603-1.02a.75.75 0 011.292.763l-1.63 2.755a.75.75 0 01-1.014.272L14.68 11.73a.749.749 0 11.737-1.307l1.472.83c-.574-2.288-2.691-4.003-5.242-4.003-2.998 0-5.397 2.367-5.397 5.25s2.399 5.25 5.396 5.25a.75.75 0 01.75.75z"
        fill={props.fill || "#000"}
      />
    </Svg>
  )
}

export default SvgComponent
