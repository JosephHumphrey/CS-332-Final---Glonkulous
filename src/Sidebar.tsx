import ShopItem from "./ShopItem";

type OnBuyHandler = (cost: number, name: string) => void;

function Sidebar({ onBuy }: { onBuy: OnBuyHandler }) {

    return(
        <div className="sidebar">
            <h1>Shop</h1>
            <div>
                <ShopItem icon="" name="test" cost={12} description="lorem ipsum" onBuy={onBuy}/>
                <ShopItem icon="" name="some upgrade" cost={3} description="hello" onBuy={onBuy}/>
            </div>
        </div>
    );
}

export default Sidebar