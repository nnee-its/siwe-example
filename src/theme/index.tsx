import GlobalStyles from "@/theme/globalStyles"
import componentsOverride from "@/theme/overrides"
import palette from "@/theme/palette"
import { customShadows } from "@/theme/shadows"
import shape from "@/theme/shape"
import { CssBaseline, ThemeOptions } from "@mui/material"
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles"
import React, { useMemo } from "react"
import "./tailwind.css"
interface Props {
  children
}

export const ThemeConfig = (props: Props): JSX.Element => {
  const { children } = props
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette,
      shape,
      // typography,
      // shadows,
      customShadows,
    }),
    [],
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeConfig
