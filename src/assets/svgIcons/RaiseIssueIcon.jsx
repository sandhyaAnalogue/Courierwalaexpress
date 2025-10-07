import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={1}
        width={24}
        height={22}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.5l-11 19h22l-11-19z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <Path
          d="M12 17.5v.5m0-8.5l.004 5"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M0 0h24v24H0V0z" fill="#6D6D6D" />
      </G>
    </Svg>
  )
}

export default SvgComponent
