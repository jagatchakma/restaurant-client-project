import { FaUtensils } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imagebb_key = import.meta.env.VITE_imagebb_key;
const imgbb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;
const Additems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
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
            const menuRes = await axiosSecure.post('/menus', menuItem)
            // console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your item added secessfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };
    return (
        <div>
            <SectionTitle title={"what's new?"} action={"Add an item"}></SectionTitle>
            <div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" placeholder="Recipe Name" {...register('name')} className="input input-border w-full" />
                    </div>
                    <div className="flex gap-4 my-6">
                        {/* category section */}
                        <div className="form-control w-full">
                            <label htmlFor="" className="label">
                                <span className="label-text">Select category</span>
                            </label>
                            <select defaultValue={"default"} name="" id="" {...register('category')} className="select select-bordered w-full">
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
                            <input type="text" placeholder="Price" {...register('price')} className="input input-border w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full flex flex-col">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea className="textarea w-full" placeholder="Input your recipe details" {...register('recipe')}></textarea>
                    </div>
                    <div>
                        <input type="file" {...register('image')} className="file-input file-input-ghost my-6" />
                    </div>
                    <button className="btn bg-orange-500 text-white">Submit <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default Additems;
