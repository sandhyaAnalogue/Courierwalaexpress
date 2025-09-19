import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ManageCard(props) {
  return (
    <Svg
      width={21}
      height={22}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_241_1447)">
        <Path
          d="M2.25 2A2.252 2.252 0 000 4.25V15.5a2.252 2.252 0 002.25 2.25H18a2.252 2.252 0 002.25-2.25V4.25A2.252 2.252 0 0018 2H2.25zm2.813 9h2.25a2.812 2.812 0 012.812 2.813c0 .309-.253.562-.563.562h-6.75a.564.564 0 01-.562-.563A2.812 2.812 0 015.063 11zm-.844-3.375a1.969 1.969 0 113.937 0 1.969 1.969 0 01-3.937 0zm8.437-1.688h3.938c.467 0 .843.377.843.844a.842.842 0 01-.843.844h-3.938a.842.842 0 01-.844-.844c0-.467.377-.843.844-.843zm0 3.375h3.938c.467 0 .843.377.843.844a.842.842 0 01-.843.844h-3.938a.842.842 0 01-.844-.844c0-.467.377-.844.844-.844z"
          fill="#252525"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_241_1447">
          <Path
            fill="#fff"
            transform="translate(0 .875)"
            d="M0 0H20.25V20.25H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ManageCard
