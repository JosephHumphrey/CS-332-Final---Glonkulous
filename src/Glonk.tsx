
export interface GlonkData {
    id: number;
    name: string;
    value: number;
}

interface GlonkProps extends GlonkData {
    x: number;
    y: number;
    onGlonkClick: (id: number, shiftKey: boolean) => void;
}

export default function Glonk(props: GlonkProps) {

    return(
        <div
            className="glonk"
            style={{
                position: "absolute",
                left: props.x,
                top: props.y
            }}
            onClick={(event) =>
                props.onGlonkClick(props.id, event.shiftKey)
            }
        >
            
            <img
                src="/Glonk.png"//"https://via.placeholder.com/50"
                alt="glonk"
            />
        </div>
    );
}
