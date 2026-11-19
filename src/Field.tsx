import { useEffect, useState } from "react";
import type { FC } from 'react';
import Glonk, {type GlonkProps} from "./Glonk";

type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;

// Function to create the arguments to create a glonk
function makeGlonk(min_value: number, max_value: number): GlonkData {
  return {
    id: crypto.randomUUID(),
    name: "test",
    value: RandomNumberInRange(min_value, max_value),
  };
}

function RandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type FieldProps = {
  max_glonks: number;
  spawn_interval_ms: number;
  glonk_min_value: number;
  glonk_max_value: number;
  glonks_spawn_max: number;
  glonks_spawn_min: number;
};

const Field: FC<FieldProps> = ({ max_glonks, spawn_interval_ms, glonk_min_value, glonk_max_value, glonks_spawn_min, glonks_spawn_max }) => {

    const [glonks, setGlonks] = useState<GlonkData[]>([]);

    const addGlonk = (count: number) => {
        setGlonks((prev) => {
            // Check how many more glonks can be added without exeeding the limit
            const room = max_glonks - prev.length;
            if (room <= 0) return prev;

            // add the number of glonks provided or as many as can be without exeeding the limit
            const n = Math.min(count, room);
            const batch = Array.from( {length: n }, () => makeGlonk(glonk_min_value, glonk_max_value));

            return [...prev, ...batch]
        });
    };

    const addGlonks = (count: number, valueMin: number, valueMax: number) => {
        setGlonks((prev) => {
            const room = max_glonks - prev.length;
            if (room <= 0) return prev;

            const n = Math.min(count, room);
            const batch = Array.from({ length: n }, () => makeGlonk(valueMin, valueMax));

            return [...prev, ...batch];
        });
    };

    const removeGlonk = (id: string) => {
        setGlonks((prev) => prev.filter((g) => g.id !== id));
    };

    //❗may need to move this to app so that it can display the number of glonks on screen. otherwise it will be up to this class to return it somehowz
    useEffect(() => {
        const interval = setInterval(() => {
            const batchSize = RandomNumberInRange(glonks_spawn_min, glonks_spawn_max);
            addGlonk(batchSize);
        }, spawn_interval_ms);
        return () => clearInterval(interval);
    }, []);

    return (
    <div className="field">
      <button onClick={() => addGlonk(1)}>Add glonk</button>

      {glonks.map((g) => (
        <Glonk key={g.id} id={g.id} name={g.name} value={g.value} />
      ))}
    </div>
  );
}

export default Field