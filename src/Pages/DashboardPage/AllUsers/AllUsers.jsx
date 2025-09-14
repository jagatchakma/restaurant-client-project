import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const result = await axiosSecure.get('/users');
            return result.data;
        }
    })

    const handleDelete = user => {
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
                axiosSecure.delete(`/users/${user._id}`).then(res => {
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

    const handleRole = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res);
                refetch();
                Swal.fire({
                    title: "Success!",
                    text: `User role has been changed to admin.`,
                    icon: "success"
                });
            });
    }

    return (
        <div>
            <p className='text-2xl font-bold capitalize'>Total users : {users.length}</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead className='bg-orange-500'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td >
                                        {user.role === 'admin' ? "Admin" :
                                            <button onClick={() => handleRole(user)} className='bg-pink-400 p-3 rounded-xl text-white text-2xl'>
                                                <MdAdminPanelSettings />
                                            </button>}
                                    </td>
                                    <td><button onClick={() => handleDelete(user)} className='text-2xl bg-red-500 text-white p-3 rounded-xl'>
                                        <MdDelete />
                                    </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;