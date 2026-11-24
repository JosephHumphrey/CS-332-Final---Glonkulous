import type { FC } from 'react';

export type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value' | 'x' | 'y'>;

export type GlonkProps = {
    id: string;
    name: string;
    value: number;
    x: number;
    y: number;
    onGlonkClick?: (glonkData: GlonkData, shiftKey: boolean) => void;
};

const Glonk: FC<GlonkProps> = ({
    id,
    name,
    value,
    x,
    y,
    onGlonkClick
}) => {
    return (
        <div
            className="glonk"
            data-id={id}
            style={{
              position: "absolute",
              left: x,
              top: y
            }}
            onClick={(event) =>
                onGlonkClick?.(
                    { id, name, value, x, y },
                    event.shiftKey
                )
            }
        >
            <img src="/Glonk.png" alt="glonk" />
        </div>
    );
};

export default Glonk;