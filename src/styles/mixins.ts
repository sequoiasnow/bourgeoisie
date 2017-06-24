/// Centers the content both vertically and horizonatlly.
export const centerContent = () => ({
    justifyContent: 'center',
    alignItems: 'center'
})

/// @see https://css-tricks.com/perfect-full-page-background-image/
/// Creates a nice background image for the site.
export const perfectBackgroundImage = (fixed = false) => ({
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttatchment: fixed ? 'fixed' : 'scroll'
})
