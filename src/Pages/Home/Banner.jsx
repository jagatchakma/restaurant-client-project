import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/home/01.jpg';
import image2 from '../../assets/home/02.jpg';
import image3 from '../../assets/home/03.png';
import image4 from '../../assets/home/04.jpg';
import image5 from '../../assets/home/05.png';
import image6 from '../../assets/home/06.png';

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={image1} alt="Image 1" />
                </div>
                <div>
                    <img src={image2} alt="Image 2" />
                </div>
                <div>
                    <img src={image3} alt="Image 3" />
                </div>
                <div>
                    <img src={image4} alt="Image 4" />
                </div>
                <div>
                    <img src={image5} alt="Image 5" />
                </div>
                <div>
                    <img src={image6} alt="Image 6" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;