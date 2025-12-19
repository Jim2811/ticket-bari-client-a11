import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure()
    const sessionId = searchParams.get('session_id')
    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(r => console.log(r.data))
        }
    }, [axiosSecure, sessionId])
    console.log(sessionId);
    return (
        <div>
            <h1 className='text-center font-bold text-3xl text-primary'>Payment Successful</h1>
        </div>
    );
};

export default PaymentSuccess;