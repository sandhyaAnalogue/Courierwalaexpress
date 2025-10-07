import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Cancellation(props) {
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
        d="M12.412 16.875L9.75 14.213l1.05-1.05 1.594 1.593 3.187-3.187 1.05 1.068-4.219 4.238zM5.55 12.75L4.5 11.7l1.2-1.2-1.2-1.2 1.05-1.05 1.2 1.2 1.2-1.2L9 9.3l-1.2 1.2L9 11.7l-1.05 1.05-1.2-1.2-1.2 1.2zm-1.8 3.75c-.413 0-.765-.147-1.059-.44A1.447 1.447 0 012.25 15V4.5c0-.412.147-.765.441-1.059.294-.293.647-.44 1.059-.441h.75V1.5H6V3h6V1.5h1.5V3h.75c.412 0 .766.147 1.06.441.294.294.44.647.44 1.059v4.762l-1.5 1.52V7.5H3.75V15h4.688l1.48 1.5H3.75z"
        fill="#252525"
      />
    </Svg>
  )
}

export default Cancellation
