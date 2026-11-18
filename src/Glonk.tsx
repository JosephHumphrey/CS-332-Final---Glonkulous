import type { FC } from 'react';

export type GlonkProps = {
  id: string;          // stable identifier, used as the React key
  name: string;
  value: number;
};

const Glonk: FC<GlonkProps> = ({ id, name, value }) => {
  return (
    <div className="glonk" data-id={id}>
        <p>Name: {name ?? "null"}</p>
        <p>Value: {value ?? 0}</p>
        <img src="https://via.placeholder.com/50" alt="glonk" />
    </div>
  );
};

export default Glonk;