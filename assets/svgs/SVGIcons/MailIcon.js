import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MailIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.333 2.667H2.667c-.734 0-1.327.6-1.327 1.333l-.007 8c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V4c0-.733-.6-1.333-1.334-1.333zM13.067 5.5L8.353 8.447a.674.674 0 01-.706 0L2.933 5.5a.567.567 0 11.6-.96L8 7.333l4.467-2.793a.566.566 0 11.6.96z"
        fill="#252525"
      />
    </Svg>
  )
}

export default MailIcon
