import merge from "deepmerge"
import defaultThemeColors from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors"

const darkBlue = `#007acc`
const lightBlue = `#66E0FF`
const darkBackground = `#2d2d2d`

export default merge(defaultThemeColors, {
  text: darkBackground,
  primary: darkBlue,
  heading: darkBackground,
  modes: {
    dark: {
      background: darkBackground,
      primary: lightBlue,
      highlight: lightBlue,
    },
  },
})
