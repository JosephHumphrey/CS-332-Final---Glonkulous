type ShopItemProps = {
  icon: string;
  name: string;
  cost: number;
  description: string;
  onBuy: (cost: number, name: string) => void;
};

function ShopItem({ icon, name, cost, description, onBuy }: ShopItemProps) {

    const handleClick = () => {
        onBuy(cost, name);
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