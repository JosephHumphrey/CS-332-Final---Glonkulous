import styles from './Styles/Sidebar.module.css'
export type ShopItemProps = {
  id: number
  name: string;
  cost: number;
  description: string;
  buyable: boolean;
  onBuy: (item: ShopItemData) => void;
};

export type ShopItemData = Pick<ShopItemProps, 'id' | 'name' | 'cost' | 'description' | 'buyable'>;

function ShopItem({ id, name, cost, description, buyable, onBuy }: ShopItemProps) {

    const handleClick = () => {
        onBuy({id, name, cost, description, buyable});
    };

    return(
        <div className={styles.shopItem} onClick={handleClick}>
            {/* <img className={styles.shopItemIcon} src={icon.length == 0 ? "https://via.placeholder.com/50" : icon} alt={name ?? "item"} /> */}
            <p className={styles.shopItemName}>{name ?? "item"}</p>
            <p className={styles.shopItemCost}>${cost ?? 1}</p>
            <p className={styles.shopItemDescription}>{description ?? null}</p>
        </div>
    );
}

export default ShopItem