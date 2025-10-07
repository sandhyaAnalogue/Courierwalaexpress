import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({fill,...props}) {
  return (
    <Svg
      width={26}
      height={32}
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 15.1a.6.6 0 00-.572.78l.132.42H.6a.6.6 0 00-.6.6v14.4a.6.6 0 00.6.6h10.8a.6.6 0 00.6-.6V16.9a.6.6 0 00-.6-.6H9.442l.132-.42A.6.6 0 009 15.1H3zm.816 1.2h4.368l-.376 1.2H4.192l-.376-1.2zm5.784 6H2.4v-1.2h7.2v1.2zm0 3H2.4v-1.2h7.2v1.2zm-7.2 3h4.8v-1.2H2.4v1.2z"
        fill={fill}
      />
      <Path
        d="M13.797.907c-.933.02-1.603.203-2.047.528L5.68 4.693 2.3 9.286c-.71 1.096-.205 3.222 2.019 1.86l2.43-3.209C9.84 5.27 16.15 6.5 13.158 11.848c-1.47 3.098-.778 4.61 1.11 5.245l.862-2.897c1.497-3.363 4.28-3.968 4.166-6.679L26 8l-.054-7-12.15-.092zm-3.38 6.456c-1.087-.018-2.154.431-2.93 1.086l-2.44 3.207c.67.531 1.338.247 2.007-.398.789.4 1.397-.22 1.897-1.455.207-.843.513-1.44 1.467-2.44z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
