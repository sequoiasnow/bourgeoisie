/**
The site should have the following color options, these allow a moderate
color pallete, for one off colors, directly style the components. */
export interface Colors {
    primary: string,
    secondary: string,
    success: string,
    warning: string,
    error: string,
    black: string,
    white: string,
    grey: string,
    [x: string]: string
}

/**
 * A single color, which can be a variety of strings.
 */
export type Color
    = 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white'
    | 'grey'

// If a number, its mutlitpled by typography rhythm, else keep the value.
export type MaybeRhythm = number | string

/**
 * A simple type for all style objects.
 */
export interface StyleObject {
    [x: string]: MaybeRhythm
}

/**
The theme contains all variables that should be used across the site. By 
implementing vertical rhythm, much of the sites consistancy can be accomplieshed
without access to theme variables. */
export interface Theme {
    colors: Colors,
    typography: {
        rhythm: (r: number) => number,
        lineHeight: number,
        fontSize: (r: number) => number
    },
    borderRadius: number
}
