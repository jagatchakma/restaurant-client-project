import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImage from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white my-8'>
            <SectionTitle title="Check it Out" action="from our menu" />
            <div className='flex justify-center items-center gap-10  py-20'>
                <div className='w-1/2 content-left'>
                    <img src={featuredImage} alt="" className='w-1/2 ml-auto'/>
                </div>
                <div className='w-1/2 mr-4'>
                    <p>Delicious food from our menu</p>
                    <p className='font-bold text-xl text-gray-700'>March 20, 2023</p>
                    <p className='font-bold text-2xl text-gray-700'>WHERE CAN I GET SOME?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni corporis itaque, nostrum nulla ducimus sed voluptatem architecto dolor placeat doloribus.</p>
                    <button className="btn btn-outline btn-accent border-0 border-b-4">Accent</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;