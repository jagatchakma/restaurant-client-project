import React from 'react';

const SectionTitle = ({ title, action }) => {
    return (
        <div className='md:w-3/12 mx-auto my-6 text-center'>
            <p className='text-yellow-500'>-- {title} --</p>
            <h2 className='uppercase text-4xl border-y-4 border-gray-300 py-4'>{action}</h2>

        </div>
    );
};

export default SectionTitle;