import type { FC } from 'react';
import Glonk, {type GlonkData} from "./Glonk";

export type FieldProps = {
  glonks: GlonkData[];
  onGlonkClick: (glonk: GlonkData) => void;
};

const Field: FC<FieldProps> = ({ glonks, onGlonkClick}) => {

    return (
    <div className="field">
      {/* <button onClick={() => addGlonk(1)}>Add glonk</button> */}

      {glonks.map((g) => (
        <Glonk key={g.id} 
                id={g.id} 
                name={g.name} 
                value={g.value}
                onClick={onGlonkClick}/>
      ))}
    </div>
  );
}

export default Field