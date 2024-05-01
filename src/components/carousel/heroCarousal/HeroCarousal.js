import HeroSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarousalImages from '../../assetArrays/CarousalImages';
// import { NextArrow, PrevArrow } from './CarouselArrows';
import './HeroCarousal.css';

const HeroCarousal = () => {

    const settings = {
        // dots: true,
        infinite: true,
        autoplay: true,
        vertical: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow: <NextArrow className='Arrow' />,
        // prevArrow: <PrevArrow className='nextArrow' />
      };

    return (
        <div className='hero' >
          <div className="hero__content">
            <h1 className=' hero__content-wellcome'>
              Wellcome to <span className='nowrap'>KGTech Repairs®</span> 
            </h1>
            <h1 className='hero__content-h1'>
              The Most trusted computer Repair Specialists.
            </h1>
            
            <p className='hero__content-p'>
            Specialists in  computer major brands! Your one-stop SA’s #1 tech solutions partner trusted by 10,000+ customers nationwide as a customer-centric tech company of choice where individuals and businesses genuinely find high-quality technical services and professional advice for their tech needs.
            </p>
          </div>
          <HeroSlider {...settings} className='heroSlider'>
            {
              CarousalImages.map(image => (
                <div className='heroSlider-image' key={image}>
                  <img src={image} alt='heroImg' className='heroImage' />
                </div>
              ))
            }       
          </HeroSlider> 
        </div>
      );
}

export default HeroCarousal