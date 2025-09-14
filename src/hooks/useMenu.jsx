import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     fetch('http://localhost:5000/menus')
    //     .then(res => res.json())
    //     .then(data=> {
    //         setMenu(data);
    //         setLoading(false);
    //     })
    // },[])

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const result = await axiosPublic.get('/menus');
            return result.data;
        }
    })

    return [menu, loading, refetch];
}

export default useMenu;