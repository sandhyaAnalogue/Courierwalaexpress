import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Pen(props) {
  return (
    <Svg
      width={12}
      height={11}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.75 8.685v1.773c0 .164.128.292.292.292h1.773c.076 0 .152-.03.204-.088l6.37-6.364-2.187-2.187L.838 8.475a.286.286 0 00-.088.21zm10.33-6.078a.581.581 0 000-.823L9.717.42a.58.58 0 00-.823 0L7.826 1.487l2.187 2.187 1.068-1.067z"
        fill={props.fill || "#fff"}
      />
    </Svg>
  )
}

export default Pen
