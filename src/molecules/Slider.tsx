import Box, { Style } from '../atoms/Box'
import { centerContent } from '../styles/mixins'

interface SliderProps {
  children: JSX.Element[]
}

interface SliderState {
  si: number
}

const slideStyle: Style = theme => ({
  transition: 'transform 0.5s ease',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors.black,
  ...centerContent()
})

export default class Slider extends React.Component<SliderProps, SliderState> {
  static slideDuration = 6000
  private _timeout: number
  
  constructor(props: SliderProps) {
    super(props)
    this.state = { si: 0 }
    this.goToSlide = this.goToSlide.bind(this)
    this._timeout = setTimeout(this.goToSlide, Slider.slideDuration)
  } 

  public goToSlide(index: number | null = null): void {
    clearTimeout(this._timeout) 
    const { si } = this.state 
    if ( si >= (this.props.children.length - 1) ) {
      this.setState({ si: 0 })
    } else { 
      this.setState({ si: index === null ? si + 1 : index })
    }
    this._timeout = setTimeout(this.goToSlide, Slider.slideDuration)
  }

  render() {
    const { si } = this.state
    return (
      <Box position="relative" width="100%" height="700px">
        <Box>
          {React.Children.map(this.props.children, (child: JSX.Element, i: number) => {
             const transform = i == si ? 'translateX(0) scale(1)' 
                             : (i < si ? `translateX(-${15 + 3 * i}vw) scale(0.8)`
                              : `translateX(100vw) scale(0.8)`)
             return (
               <Box css={[slideStyle, theme => ({
                   transform
                 })]} key={i} onClick={() => this.goToSlide(i)}>
                 {child}
               </Box>
             )
           })} 
        </Box>
        <Box css={theme => ({
            position: 'absolute',
            bottom: 1,
            left: 0,
            width: '100%',
            padding: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          })}>
          {React.Children.map(this.props.children, (c, i: number) => (
             <Box onClick={() => this.goToSlide(i)} css={theme => ({
                 width: '50px',
                 margin: '2px',
                 paddingTop: 1 / 4,
                 paddingBottom: 1 / 4,
                 cursor: 'pointer',
                 ...centerContent()
               })}> 
               <Box css={theme => ({
                   backgroundColor: theme.colors.grey,
                   width: '100%',
                   height: '2px',
                   borderRadius: 1,
                   overflow: 'hidden',
                   position: 'relative', 
                   '::after': {
                     content: "''",
                     position: 'absolute',
                     top: 0, 
                     left: 0, 
                     height: '100%',  
                     width: si == i ? '100%' : 0, 
                     transition: (si == i) ? `width ${Slider.slideDuration}ms linear`: '',
                     backgroundColor: theme.colors.primary
                   }
                     })} />
                 </Box>
               ))}
            </Box>
          </Box>
        )
      }
}
