
function Footer(props: {money: number, glonks: number}) {

    return(
        <footer>
            <nav>
                <p>Money: ${props.money ?? 0}</p>
                <p>Glonks: {props.glonks ?? 0}</p>
            </nav>
        </footer>
    );
}

export default Footer