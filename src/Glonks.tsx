
function Glonks(props: {name: String, value: number}) {

    return(
        <div className="glonk">
            <p>Name: {props.name}</p>
            <p>Value: {props.value}</p>
            <img src="https://via.placeholder.com/50" alt="glonk" />
        </div>
    );
}

export default Glonks