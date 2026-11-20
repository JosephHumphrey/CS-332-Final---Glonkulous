import type { FC } from 'react';

export type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;

export type GlonkProps = {
  id: string;          // stable identifier, used as the React key
  name: string;
  value: number;
  onClick?: (glonkData: GlonkData) => void; //❓ this and also line 16
};

const Glonk: FC<GlonkProps> = ({ id, name, value, onClick }) => {
  return (
    <div className="glonk" 
            data-id={id}
            onClick={() => onClick && onClick({ id, name, value })}>
        <p>Name: {name ?? "null"}</p>
        <p>Value: {value ?? 0}</p>
        <img src="https://via.placeholder.com/50" alt="glonk" />
    </div>
  );
};

export default Glonk;