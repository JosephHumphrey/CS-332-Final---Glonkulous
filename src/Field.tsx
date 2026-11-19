import { useEffect, useState } from "react";
import Glonk, {type GlonkProps} from "./Glonk";
import type { FC } from 'react';

type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;

function RandomNumberInRange(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type FieldProps = {
  max_glonks: number;
  spawn_interval_ms: number;
  glonk_min_value: number;
  glonk_max_value: number;
};

const Field: FC<FieldProps> = ({ max_glonks, spawn_interval_ms, glonk_min_value, glonk_max_value }) => {

    const [glonks, setGlonks] = useState<GlonkData[]>([]);

    const addGlonk = () => {
        setGlonks((prev) => {
            // Check if the max number of glonks is already present
            if (prev.length >= max_glonks) return prev;

            return [
            ...prev,
            { id: crypto.randomUUID(), 
                name: "test", 
                value: RandomNumberInRange(glonk_min_value, glonk_max_value) },
            ]
        });
    };

    const removeGlonk = (id: string) => {
        setGlonks((prev) => prev.filter((g) => g.id !== id));
    };

    useEffect(() => {
        const interval = setInterval(addGlonk, spawn_interval_ms);
        return () => clearInterval(interval);
    }, []);

    return (
    <div className="field">
      <button onClick={addGlonk}>Add glonk</button>

      {glonks.map((g) => (
        <Glonk key={g.id} id={g.id} name={g.name} value={g.value} />
      ))}
    </div>
  );
}

export default Field