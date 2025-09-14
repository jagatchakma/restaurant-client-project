import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { PiStackOverflowLogoBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menus/${item._id}`);
                if (res.data.deletedCount === 1) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <div>
            <SectionTitle
                title={"Hurry Up!"}
                action={"Manage All Items"}>
            </SectionTitle>
            <h2 className="text-2xl font-bold capitalize">
                Total Items: {menu.length}
            </h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead className="bg-orange-500">
                        <tr>
                            <th>Serial no</th>
                            <th>Item image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) =>
                                < tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Item name: <span className="font-bold">{item.name}</span>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update-item/${item._id}`}>
                                            <button onClick={""} className="text-2xl bg-red-500 text-white p-3 rounded-xl">
                                                <PiStackOverflowLogoBold />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="text-2xl bg-red-500 text-white p-3 rounded-xl">
                                            <MdDelete />
                                        </button>
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

export default ManageItems;
