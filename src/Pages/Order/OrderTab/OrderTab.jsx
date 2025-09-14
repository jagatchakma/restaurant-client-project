import React from 'react';
import FoodCard from '../../../components/FoodCard/FoodCard';

const OrderTab = ({ items }) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 '>
            {
                items.map(item => <FoodCard key={item.id} item={item} />)
            }
        </div>
    );
};

export default OrderTab;