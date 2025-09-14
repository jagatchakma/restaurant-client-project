import React from 'react';

const ItemCard = ({ item }) => {

    const { name, image, price, description, recipe } = item;
    return (
        <div className='flex justify-between gap-4'>
            <img src={image} alt={name} className='w-[100px]' style={{ borderRadius: '0px 300px 300px 300px' }} />
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default ItemCard;