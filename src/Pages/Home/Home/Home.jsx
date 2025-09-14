import React from 'react';
import Banner from '../banner';
import SwiperBanner from '../Swiper';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Restaurant</title>
            </Helmet>
            <Banner></Banner>
            <SwiperBanner></SwiperBanner>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;