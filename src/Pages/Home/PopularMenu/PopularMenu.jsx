import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ItemCard from '../../../components/ItemCard/ItemCard';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems);
    //         });
    // }, []);

    const [menu, loading] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular');

    return (
        <div className='my-10'>
            <SectionTitle title="Check it Out" action="Popular items" />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-5'>
                {
                    popularItems.map(item => (
                        <ItemCard key={item.id} item={item} loading={loading} />
                    ))
                }
            </div>
        </div>
    );
};

export default PopularMenu;