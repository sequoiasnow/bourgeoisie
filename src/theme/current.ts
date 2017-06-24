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
        fontFamily: 'Nunito, sans-serif',
        fontFamilyAlt: 'Pacifico, cursive',
    },
    borderRadius: 6,
    // Based on the monaki theme.
    syntaxHighlighting: {
        string: '#e6da7b',
        comment: '#75715f',
        number: '#ae85fc',
        constant: '#ae85fc',
        variable: 'white',
        keyword: '#f62d73',
        storageType: '#6bd9ed',
        className: '#a7e040',
        functionName: '#a7e040',
        functionArg: '#fb9633',
        tagName: '#f62d73',
        tagAttribute: '#a7e040',
        library: '#6bd9ed',
        invalid: '#f62d73',
        depracted: '#ae85fc',
        deliminator: 'string'
    }
}
export default theme
