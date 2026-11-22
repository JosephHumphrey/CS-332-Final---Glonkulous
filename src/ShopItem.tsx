
function ShopItem(props: {icon: string, name: string, cost: number, description: string}) {

    return(
        <div className="shopItem">
            <img className="shopItem-icon" src={props.icon.length == 0 ? "https://via.placeholder.com/50" : props.icon} alt={props.name ?? "null"} />
            <h2 className="shopItem-name">{props.name ?? "null"}</h2>
            <h2 className="shopItem-cost">${props.cost ?? 0}</h2>
            <p className="shopItem-description">{props.description ?? null}</p>
        </div>
    );
}

export default ShopItem