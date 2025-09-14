import React from 'react';
import ItemCard from '../../../components/ItemCard/ItemCard';
import Banner from '../../../components/Banner/Banner';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className=''>
            {title && <Banner img={coverImg} title={title}></Banner>}
            <div className='flex flex-col items-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-5 my-5'>
                    {
                        items.map(item =>
                            <ItemCard key={item.id} item={item}></ItemCard>
                        )
                    }
                </div>
                <Link to={title ? `/order/${title}` : '/order/salad'}>
                    <button className='text-lg border-b-4 my-6 rounded-2xl p-2'>ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>

        </div>
    );
};

export default MenuCategory;