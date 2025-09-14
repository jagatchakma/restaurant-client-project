// import React from 'react';
import useCart from '../../../hooks/useCart';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((totalSum, item) => totalSum + item.price, 0);
    const axiosSecure = useAxiosSecure();
    const handleDelete = (id) => {
        // Implement delete functionality
        Swal.fire({
            title: "Are you sure?",
            text: "You wont to be delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`).then(res => {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    console.log(res);
                });
                
            }
        });
    }
    return (
        <div>
            <div className="flex flex-row justify-between">
                <h2>Total items: {cart.length}</h2>
                <h2>Total price: {totalPrice} </h2>
                <button className="btn bg-orange-500" disabled={!cart.length} ><Link to={'/dashboard/pay'} >Pay</Link></button>
            </div>
            {/* ////////////////////////// */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>Serial no</th>
                            <th>Item image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    {/* <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th> */}
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            {/* <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div> */}
                                        </div>
                                    </td>
                                    <td>
                                        Item name: <span className='font-bold'>{item.name}</span>
                                        {/* <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>
                                        ${item.price}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs py-6"><RiDeleteBin6Line className='text-3xl text-red-500' /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;