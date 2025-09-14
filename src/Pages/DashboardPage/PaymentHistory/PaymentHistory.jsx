import React from 'react';
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: paymentH = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const responce = await axiosSecure.get(`/payments/${user.email}`);
            return responce.data;
        }
    })
    return (
        <div>
            <p className='text-2xl py-6'>Total payment : {paymentH.length}</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead className='bg-orange-500 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentH.map((payment, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{payment.transactionId}</td>
                                <td>{payment.email}</td>
                                <td>${payment.price}</td>
                                <td>{payment.date}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;