import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Policies(props) {
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
        d="M3.143 3.353c-.54.24-.893.78-.893 1.372V8.25c0 4.162 2.88 8.055 6.75 9 3.87-.945 6.75-4.838 6.75-9V4.725c0-.592-.352-1.132-.893-1.372L9.607 1.02a1.491 1.491 0 00-1.214 0l-5.25 2.333zM9 5.25c.412 0 .75.338.75.75s-.338.75-.75.75A.752.752 0 018.25 6c0-.412.338-.75.75-.75zm0 3c.412 0 .75.338.75.75v3c0 .412-.338.75-.75.75a.752.752 0 01-.75-.75V9c0-.412.338-.75.75-.75z"
        fill="#252525"
      />
    </Svg>
  )
}

export default Policies
