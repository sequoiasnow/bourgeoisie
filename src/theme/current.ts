import { Theme } from './index'
import typography from './typography'

/**
 * The current theme for the project, by defining the type we get type checking.
 */  
const theme: Theme = { 
    colors: {
        primary: '#ef4836',
        secondary: '#f1ab4c',
        success: '#2ecc71',
        warning: '#e67e22',
        error: '#e74c3c',
        black: '#2c3e50',
        white: '#ecf0f1',
        grey: '#bdc3c7'
    },
    typography: typography({
        fontSize: 18,
        fontSizeScale: 'step5',
        lineHeight: 16
    }),
    text: {
        color: 'black',
        colorAlt: 'white',
        fontFamily: 'avenir'
    },
    borderRadius: 6
}
export default theme
