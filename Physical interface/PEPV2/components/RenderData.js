import React, { useState } from "react";

export default function RenderData({ habitData }) {
    const [habitData, setHabitData] = useState({
        count: 0,
        effort: 0,
    });

    const incrementCount = () => {
        setHabitData((prevData) => ({
            ...prevData,
            count: prevData.count + 1,
        }));
    };

    const incrementEffort = () => {
        setHabitData((prevData) => ({
            ...prevData,
            effort: prevData.effort + 1,
        }));
    };

    return (
        <div>
            <h1>Habit Data</h1>
            <p>Count: {habitData.count}</p>
            <p>Effort: {habitData.effort}</p>
            <button onClick={incrementCount}>Increment Count</button>
            <button onClick={incrementEffort}>Increment Effort</button>
        </div>
    );
}
