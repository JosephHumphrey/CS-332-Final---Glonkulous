import styles from './Styles/Sidebar.module.css'
import ShopItem, {type ShopItemData} from "./ShopItem";

type OnBuyHandler = (item: ShopItemData) => void;

function Sidebar({items, onBuy}: { items: ShopItemData[], onBuy: OnBuyHandler }) {

    return(
        <div className={styles.Sidebar}>
            <h1>Shop</h1>
            <div className={styles.ShopGrid}>
                {items.map((i) => (
                    <ShopItem
                        id={i.id}
                        name={i.name}
                        cost={i.cost}
                        description={i.description}
                        onBuy={onBuy}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar