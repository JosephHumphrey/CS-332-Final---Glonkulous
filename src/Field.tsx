import Glonk from "./Glonk";

function Field() {

    let x = <Glonk name="spongebob" value={23}/>;

    return(
        <div className="field">
            <Glonk name="spongebob" value={23}/>
        </div>
    );
}

export default Field