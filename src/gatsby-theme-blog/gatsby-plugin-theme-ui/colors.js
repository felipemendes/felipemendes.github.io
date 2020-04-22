import merge from "deepmerge"
import defaultThemeColors from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors"

const orange = `#d73b24`
const lightGray = `#ddd`
const darkBackground = `#222`

export default merge(defaultThemeColors, {
  text: darkBackground,
  primary: orange,
  heading: darkBackground,
  modes: {
    dark: {
      background: darkBackground,
      primary: lightBlue,
      highlight: lightBlue,
    },
  },
})
