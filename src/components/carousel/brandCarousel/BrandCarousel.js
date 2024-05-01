import BrandSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BrandCarouselArray from "../../../assetArrays/BrandArray";
import { NextArrow, PrevArrow, NextArrowSm, PrevArrowSm } from '../heroCarousal/CarouselArrows';
import './BrandCarousel.css';

// Brand Carousel
const BrandCarousel = () => {

    // small devices
    const settingsSm = {
        // dots: true,
        // arrows: true,
        infinite: true,
        autoplay: true,
        vertical: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <NextArrowSm  />,
        prevArrow: <PrevArrowSm  />
      };

    //   medium devices
      const settingsMd = {
        // // dots: true,
        // arrows: true,
        infinite: true,
        autoplay: true,
        vertical: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow  />,
        prevArrow: <PrevArrow  />
      };

    //   large devices
      const settingsLg = {
        // // dots: true,
        // arrows: true,
        infinite: true,
        autoplay: true,
        vertical: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow  />,
        prevArrow: <PrevArrow  />
    };

  return (
    <>
    <div className='brandCarousel'>

        {/* small devices */}
        <BrandSlider {...settingsSm} className='brandSlider brandSliderSm'>
            {
                BrandCarouselArray.map(brand => (
                    <div key={brand} className='brand-div'>
                        <img src={brand} alt="brand"  className='brandImage'/>
                    </div>
                ))
            }
        </BrandSlider>

        {/* medium devices */}
        <BrandSlider {...settingsMd} className='brandSlider brandSliderMd'>
            {
                BrandCarouselArray.map(brand => (
                    <div key={brand} className='brand-div'>
                        <img src={brand} alt="brand"  className='brandImage'/>
                    </div>
                ))
            }
        </BrandSlider>

        {/* large devices */}
        <BrandSlider {...settingsLg} className='brandSlider brandSliderLg'>
            {
                BrandCarouselArray.map(brand => (
                    <div key={brand} className='brand-div'>
                        <img src={brand} alt="brand"  className='brandImage'/>
                    </div>
                ))
            }
        </BrandSlider>
      
    </div>
    </>
    
  )
}

export default BrandCarousel
