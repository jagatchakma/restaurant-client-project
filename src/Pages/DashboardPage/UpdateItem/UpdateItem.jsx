import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { BiReset } from "react-icons/bi";
import { FaReact, FaRegStar, FaUtensils } from 'react-icons/fa6';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const imagebb_key = import.meta.env.VITE_imagebb_key;
const imgbb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;

const UpdateItem = () => {
    const item = useLoaderData();
    // console.log(item)

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    //
    const onSubmit = async (data) => {
        const imageTacken = { image: data.image[0] }
        const imageHostResult = await axiosPublic.post(imgbb_api, imageTacken, { headers: { "content-type": "multipart/form-data" } },);
        // console.log(imageHostResult.data);
        // console.log(imageHostResult.data.daia.display_url);
        if (imageHostResult.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: imageHostResult.data.data.display_url,
                category: data.category,
                price: data.price,
            }
            const menuRes = await axiosSecure.patch(`/menus/${item._id}`, menuItem)
            console.log(menuRes.data);
            // console.log("image hosting ok")
            if (menuRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your item updated secessfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // todo
    };

    return (
        <div>
            <SectionTitle title={"Hurry Up"} action={"Manage all items"}></SectionTitle>
            <div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" placeholder="Recipe Name" defaultValue={item.name} {...register('name')} className="input input-border w-full" />
                    </div>
                    <div className="flex gap-4 my-6">
                        {/* category section */}
                        <div className="form-control w-full">
                            <label htmlFor="" className="label">
                                <span className="label-text">Select category</span>
                            </label>
                            <select defaultValue={item.category} name="" id="" {...register('category')} className="select select-bordered w-full">
                                <option disabled={true} value={"default"}>Select a category</option>
                                <option value={"salad"}>Salad</option>
                                <option value={"pizza"}>Pizza</option>
                                <option value={"soup"}>Soup</option>
                                <option value={"dessert"}>Dessert</option>
                                <option value={"drinks"}>Drinks</option>
                            </select>
                        </div>
                        {/* price section */}
                        <div className="form-control w-full">
                            <label htmlFor="" className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" placeholder="Price" defaultValue={item.price}{...register('price')} className="input input-border w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full flex flex-col">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea className="textarea w-full" placeholder="Input your recipe details" defaultValue={item.recipe} {...register('recipe')}></textarea>
                    </div>
                    <div>
                        <input type="file" {...register('image')} className="file-input file-input-ghost my-6" />
                    </div>
                    <div className='flex justify-between'>
                        <button className="btn bg-orange-500 text-white">Submit <FaUtensils></FaUtensils> </button>
                        {/* <button onClick={""} className="btn bg-orange-500 text-white">Reset <BiReset /> </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;