
import { useEffect, useRef, useState } from "react";
import Glonk from "./Glonk";
import type { GlonkData } from "./Glonk";

interface FieldProps {
    glonks: GlonkData[];
    onGlonkClick: (id: number, shiftKey: boolean) => void;
}

interface GlonkPosition {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

const SPEED = 80; // Pixels per second

function Field(props: FieldProps) {

    const fieldRef = useRef<HTMLDivElement>(null);

    const [positions, setPositions] = useState<GlonkPosition[]>([]);
    const positionsRef = useRef<GlonkPosition[]>([]);

    // Add positions for new Glonks and remove sold ones
    useEffect(() => {

        const field = fieldRef.current;
        if (!field) return;

        const width = field.clientWidth;
        const height = field.clientHeight;

        positionsRef.current = props.glonks.map(glonk => {

            // Keep existing Glonk positions
            const existing = positionsRef.current.find(
                p => p.id === glonk.id
            );

            if (existing) return existing;

            // Give new Glonks a random position and direction
            const angle = Math.random() * Math.PI * 2;

            return {
                id: glonk.id,
                x: Math.random() * Math.max(0, width - 120),
                y: Math.random() * Math.max(0, height - 100),
                vx: Math.cos(angle),
                vy: Math.sin(angle)
            };
        });

        setPositions([...positionsRef.current]);

    }, [props.glonks]);

    // Animation loop
    useEffect(() => {

        let animationId: number;
        let lastTime = 0;

        function animate(time: number) {

            const field = fieldRef.current;

            if (!field) return;

            if (lastTime === 0) lastTime = time;

            // Time elapsed, in seconds
            const deltaTime = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            const width = field.clientWidth;
            const height = field.clientHeight;

            const nextPositions = positionsRef.current.map(p => {

                let x = p.x + p.vx * SPEED * deltaTime;
                let y = p.y + p.vy * SPEED * deltaTime;

                let vx = p.vx;
                let vy = p.vy;

                // Bounce off left and right walls
                if (x <= 0) {
                    x = 0;
                    vx = Math.abs(vx);
                }
                else if (x >= width - 120) {
                    x = Math.max(0, width - 120);
                    vx = -Math.abs(vx);
                }

                // Bounce off top and bottom walls
                if (y <= 0) {
                    y = 0;
                    vy = Math.abs(vy);
                }
                else if (y >= height - 100) {
                    y = Math.max(0, height - 100);
                    vy = -Math.abs(vy);
                }

                return { ...p, x, y, vx, vy };
            });

            positionsRef.current = nextPositions;
            setPositions(nextPositions);

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);

    }, []);

    return(
        <div className="field" ref={fieldRef}>
            {props.glonks.map(glonk => {

                const position = positions.find(
                    p => p.id === glonk.id
                );

                if (!position) return null;

                return (
                    <Glonk
                        key={glonk.id}
                        id={glonk.id}
                        name={glonk.name}
                        value={glonk.value}
                        x={position.x}
                        y={position.y}
                        onGlonkClick={props.onGlonkClick}
                    />
                );
            })}
        </div>
    );
}

export default Field;
