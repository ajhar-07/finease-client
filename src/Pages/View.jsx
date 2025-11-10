import React from 'react';

const View = ({view}) => {
    return (
        <div>
           <div className='grid md:grid-cols-3 gap-8 mx-auto'>
         <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
           <div className='flex items-center justify-center'>
             <p className='my-8 text-2xl font-bold'>Total Balance</p>
            <p>{view.ammount}</p>
           </div>
         </div>
         <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
            <p>Income</p>
         </div>
         <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
            <p>Expense</p>
         </div>
       
        
        </div>  
        </div>
    );
};

export default View;