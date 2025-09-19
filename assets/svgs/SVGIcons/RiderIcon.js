import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0_910_5052)" d="M0 0H24V24H0z" />
      <Defs>
        <Pattern
          id="pattern0_910_5052"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_910_5052" transform="scale(.01111)" />
        </Pattern>
        <Image
          id="image0_910_5052"
          width={90}
          height={90}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFU0lEQVR4nO2bWYgcRRjHfxvZjE7WxGiMB4KKL2KiLigeD6Ki8SDuxmR9Cx7kQRACiohHlCCoQX3wliioMR7RgAoRjfFFQX1QN+iDUciaBEU27hrjETce2RlbCr5AM3TV9FF9TPv9oBiYqa6u79/VX331VQ0oiqIoiqIoiqIoiqIoiqIoiqIo9aIJPA38BgSOMgV8CdwFzC27073IM10EjirfAYNld7yXmAH8mUJoU3YD88o24P8gdAC8VLYBdXcdgZQ2sLBsA3qFw4AngV9Tiv1W2QbUjcccYp9bdufqxNHAPovQW8ruXN14wDGqLyq7c3XiCGCvRehPyu5c3bjbMaqvKLtzdWIWMGEReivQRw/nGWy5h43ANdKOT5rS7ka5T5J+LQu1c6HE6d8Af8S83oSZT0nYWYnFgm/RmxnEDZevgfPEZ2exyWhTieWvD9GbnsTNo+wXjSordFCT4k1on64jqGFZS4XyDHUsvwBP+J4M01Jl3xp0FBNRrQZOosepsuj/AqdSQwaAFysgcLisosZcV6HRbeafI6kxpwHbChLzfeACx+/3U3Oasq+Xt9CXyf22WH43y+/51JgGsDlnkR8M3e9smQCj6j1KTWnkLLIZpSsj7vumpf5fwAnUjEaOIn8M3O5wBQtkdzzq2mepcO53BFgvud5xYBr4GfgKeAFY3pE8asQQebPUc2G7Ng4vW649ADwHfAHsEVuMTaNi44jYXBhzgDWSWIkzyn6X+vM9iZxV6FNE1DRvzH7ZmzQa5MrVMmLTdHLak8hZhUbcRBYXZUb8EnKgT1ZRNv+WtbybQGQfQt/hoc9tOb3aV9SmZ9byHnBowv5kEfp6zwPmTjy6i6qM5KxCXwm0PNtgtBkmI3O6+OSWzOKLgeNEtJOBITn35vLL03LCKA4z5cCiyQTek1LouY4d8qhyidh0ldjoekA/AbOzCL3G0fj2GKc1zbm3XY42VkeIcT6wAngYeBv4NsEodPFQwpH6Ucf1ZwBjeeRMBhwh3PYEWa9jgO8diXezZfYhMOnhNbZxuISZUdf8k+DQzVEOsafSxtkjDndxeszXfYG87hs8iNit/Ojoy7UOWy52POTRiKjiTMcbtjSN0OsTnKQ3O8KL5PXcJE+9W9wceC7G1dh4xXLN6/L7LTEP3RzkVUvddWmE3mppzEx8YcwTf61gUYNQ2StZun6HLbbct5m0kfDyB0udbRFHC4YsdT9PI/S4pTEzE4e5vCBBJ4APZKv/ZskznxhzwWDzz2b+OMiNjnt3hm/HW+oZzRJjmySM7w1zq0cxp8XtbBI3tEKOcGX97+CBGLaYN2KHpd59He01LPX+znNEL8oo7qRMmAsjHqIv4tqy3FLvhjxH9KilMRPAh5nhiComJHRbK0cObHt6eRPXFuOG3umo82lEimDYp4+2RR1mlUREBy8VN2J73d+wtPdIms7laEu/5EMeB26y5GE2+Iw6llkaa8kqKQnnOPIlZjLNG5+2DDpsMXmhxMxynL8Yk1VSHI4Fdjp82iHkjy9b5klKIKqdqSyH7l3/dBqTVZKLsxwdCyRBVBRZbRnsYktnZJI4e7fH0XhLVl1DMhP3S2y6WPyYa3W4I0UeukhbZsrnsKwE210iJ5NPycSSHPLRLZk8iyYPW9oR0UtqVnnu3EpfHauALWZbzBt9sj/W9jCSb/PZsRJtafsWOcyw7Cak6diE7FpUhSy2TPp0FzZmy25C3KO3+4B7fUwWFbBlSqKLQm1pSqJ7nSw9xyURtVtSrM/LQmGA6mOzxXx+Jt8vzeHPqYqiKIqiKIqiKIqiKIqiKIqiKAo2/gMqjGBCjZGafwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  )
}

export default SvgComponent
