import { Helmet } from "react-helmet";
import Banner from '../../../components/Banner/Banner';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const OurMenu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    return (
        <div>
            <Helmet>
                <title>Our Menu</title>
            </Helmet>
            {/* start main content */}
            <Banner img={menuImg} title={"Our Menu"}></Banner>
            <SectionTitle title={"Don't Miss"} action={"TODAY'S OFFER"}></SectionTitle>

            {/* offer section */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert section */}
            <MenuCategory items={dessert} title={"dessert"} coverImg={dessertImg}></MenuCategory>            
            {/* soup section */}
            <MenuCategory items={soup} title={"soup"} coverImg={soupImg}></MenuCategory>
            {/* salad section*/}
            <MenuCategory items={salad} title={"salad"} coverImg={saladImg}></MenuCategory>
            {/* pizza section */}
            <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg}></MenuCategory>


        </div>
    );
};
            
export default OurMenu;