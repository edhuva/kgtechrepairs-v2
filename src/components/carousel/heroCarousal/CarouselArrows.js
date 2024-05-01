import '../brandCarousel/BrandCarousel.css';

//Carousel Arrows
export const NextArrow = (props) => {
    
    return (
        <>
         <div className={props.className} style={{ ...props.style, backgroundColor: 'hsl(0, 0%, 0%, 0.6)', color: 'red', width: '38px', height: '38px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '1.5rem', zIndex: '1', margin: '0 -3rem'}} onClick={props.onClick} />
        </>
    )
}

export const PrevArrow = (props) => {
    return (
        <>
        <div className={props.className} style={{ ...props.style, backgroundColor: 'hsl(0, 0%, 0%, 0.6)', width: '38px', height: '38px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '1.5rem', zIndex: '1', margin: '0 -3rem'}} onClick={props.onClick} />
        </>
    )
}

// small devices
export const NextArrowSm = (props) => {
    return (
        <>
         <div className={props.className} style={{ ...props.style, backgroundColor: 'hsl(0, 0%, 0%, 0.6)', color: 'red', width: '22px', height: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '1em', zIndex: '1', margin: '0 -.1em'}} onClick={props.onClick} />
        </>
    )
}

export const PrevArrowSm = (props) => {
    return (
        <>
         <div className={props.className} style={{ ...props.style, backgroundColor: 'hsl(0, 0%, 0%, 0.6)', width: '22px', height: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '1em', zIndex: '1', margin: '0 -.1em'}} onClick={props.onClick} />
        </>
    )
}

const CarouselArrows = () => {
    return (
      <></>
    )
  }
  
  export default CarouselArrows


