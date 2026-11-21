export type ShopItemProps = {
  id: number
  icon: string;
  name: string;
  cost: number;
  description: string;
  onBuy: (item: ShopItemData) => void;
};

export type ShopItemData = Pick<ShopItemProps, 'id' | 'name' | 'cost' | 'description' | 'icon'>;

function ShopItem({ id, icon, name, cost, description, onBuy }: ShopItemProps) {

    const handleClick = () => {
        onBuy({id, icon, name, cost, description});
    };

    return(
        <div className="shopItem" onClick={handleClick}>
            <img className="shopItem-icon" src={icon.length == 0 ? "https://via.placeholder.com/50" : icon} alt={name ?? "item"} />
            <h2 className="shopItem-name">{name ?? "item"}</h2>
            <h2 className="shopItem-cost">{cost ?? 1}</h2>
            <p className="shopItem-description">{description ?? null}</p>
        </div>
    );
}

export default ShopItem