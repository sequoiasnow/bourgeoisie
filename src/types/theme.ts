export interface Theme {
    colors: {
        primary: string,
        secondary: string,
        success: string,
        warning: string,
        error: string,
        black: string,
        white: string,
        grey: string,
        // Typescript to infer the type, and allow extranious themeing.
        [color: string]: string
    },
    // Typography is handled by typography.js and is done so very
    // cleverly I might add, see `../utils/tyography.ts` for more info.
    typography: {
        rhythm: (r: number) => number,
        lineHeight: number,
        fontSize: (r: number) => number,
    },
    // Information for the colors of text, this provides some extra
    // information for the colors.
    text: {
        color: string,
    },
    // The border radius for the global application, this is not necesarily
    // used consistently and when it is can be used as a mutliplier.
    borderRadius: number,
    // The syntax highlighting used to create a theme,
    syntaxHighlighting?: {
        comment: string,
        string: string,
        number: string,
        constant: string,
        variable: string,
        keyword: string,
        storageType: string,
        className: string,
        functionName: string,
        functionArg: string,
        tagName: string,
        tagAttribute: string,
        library: string,
        invalid: string,
        depracted: string,
        deliminator: string
    }
}
