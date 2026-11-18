import { useState } from "react";
import Glonk, {type GlonkProps} from "./Glonk";

type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;

function RandomNumberInRange(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Field() {

    const [glonks, setGlonks] = useState<GlonkData[]>([]);

    const addGlonk = () => {
        setGlonks((prev) => [
        ...prev,
        { id: crypto.randomUUID(), 
            name: "test", 
            value: RandomNumberInRange(5, 15) },
        ]);
    };

    const removeGlonk = (id: string) => {
        setGlonks((prev) => prev.filter((g) => g.id !== id));
    };

    return (
    <div className="field">
      <button onClick={addGlonk}>Add glonk</button>

      {glonks.map((g) => (
        <Glonk key={g.id} id={g.id} name={g.name} value={10} />
      ))}
    </div>
  );
}

export default Field