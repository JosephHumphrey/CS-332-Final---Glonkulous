import ShopItem from "./ShopItem";

function Sidebar() {

    return(
        <div className="sidebar">
            <h1>Shop</h1>
            <div>
                <ShopItem icon="" name="test" cost={12} description="lorem ipsum"/>
                <ShopItem icon="" name="some upgrade" cost={3} description="hello"/>
            </div>
        </div>
    );
}

export default Sidebar