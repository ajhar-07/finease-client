import React from 'react';
import Banner from './Banner';
import BudgetingTips from './BudgetingTips';
import FinancialPlanning from './FinancialPlanning';
import Overview from './Overview';


const Home = () => {
  
    return (
        <div>
            <div className='my-5'>
        <Banner/>    
        </div>
<div>
    <Overview></Overview>
</div>


        <div>
            <BudgetingTips></BudgetingTips>
        </div>
        <div className='mb-12'>
            <FinancialPlanning></FinancialPlanning>
        </div>
        </div>
    );
};

export default Home;