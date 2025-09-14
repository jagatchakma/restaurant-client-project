import React, { useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);
    return (
        <div>
            <section>
                <SectionTitle title="What our customers say" action="Testimonials" />
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        // reviews.map(review => <SwiperSlide key={review.id}>
                        //     <div>
                        //         {/* <Rating
                        //             style={{ maxWidth: 180 }}
                        //             value={3}
                        //             readOnly
                        //         /> */}
                        //         <h1 className='text-9xl font-bold'>"</h1>
                        //         <p>{review.details}</p>
                        //         <h3 className='text-2xl text-orange-500'>{review.name}</h3>
                        //     </div>
                        // </SwiperSlide>)

                        reviews.map(review => <SwiperSlide key={review.id}>
                            <div className='flex flex-col items-center my-16 px-10'>
                                <Rating className=''
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>hello</p>
                                <h1 className='text-9xl font-bold'>"</h1>
                                <p className='py-4'>{review.details}</p>
                                <h3 className='text-2xl text-orange-500'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>

        </div>
    );
};

export default Testimonials;