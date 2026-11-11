
export default function Glonk(props: {name: string, value: number}) {

    return(
        <div className="glonk">
            <p>Name: {props.name ?? null}</p>
            <p>Value: {props.value ?? null}</p>
            <img src="https://via.placeholder.com/50" alt="glonk" />
        </div>
    );
}
