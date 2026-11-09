
function Footer(props: {money: number, glonks: number}) {

    return(
        <footer>
            <nav>
                <p>money: ${props.money ?? 0}</p>
                <p>glonks: {props.glonks ?? 0}</p>
            </nav>
        </footer>
    );
}

export default Footer