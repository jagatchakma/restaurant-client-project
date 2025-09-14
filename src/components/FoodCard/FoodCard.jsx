import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigator = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartaddedItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartaddedItem)
                .then(response => {
                    refetch();
                    Swal.fire({
                        title: "Added!",
                        text: "Item added to cart.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    // refetch();
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error: " + error);
                });


        } else {
            //
            Swal.fire({
                title: "You are not login",
                text: "Please login for adding items to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigator('/login', { state: { from: location } });
                }
            });
        }
        // console.log("Item added to cart:", addedItem, user.email);
    }
    return (
        <div>
            <div className="card bg-base-100 w-full shadow-sm  rounded-2xl ">
                <figure>
                    <img className=' rounded-t-2xl'
                        src={image}
                    // alt={name}
                    />
                </figure>
                <p className='absolute right-3 top-3 bg-gray-600 p-2 rounded-xl text-white'>${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{recipe}</p>
                    <div className="card-actions ">
                        <div className="badge badge-outline">{price}</div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className='bg-gray-300 hover:bg-black p-4 rounded-xl border-b-4 border-b-yellow-600 text-yellow-600 uppercase'>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;