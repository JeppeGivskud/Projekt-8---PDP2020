const DatabaseIP = `http://hvejsel.dk:8080`;
const habitData = {};

// Create table if not exists
export const createTable = () => {
    fetch(`${IP}/createTable`)
        .then((response) => response.text())
        .catch((error) => console.error("Error:", error));
    console.log("Table created...");
};

// Get all data
export const getAllData = () => {
    fetch(`${IP}/getData`)
        .then((response) => response.json())
        .then((data) => habitData(data))
        .catch((error) => console.error("Error:", error));
    console.log("Data fetched...");
    return habitData;
};

// Post count
export const postCount = (habitName) => {
    fetch(`${IP}/setCount?habitName=${encodeURIComponent(habitName)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: count }),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error));
    console.log("Count posted...");
};

// Post effort
export const postEffort = (habitName) => {
    fetch(`${IP}/setEffort?habitName=${encodeURIComponent(habitName)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ effort: effort }),
    })
        .then((response) => response.json())
        .then((data) => setEffort(data))
        .catch((error) => console.error("Error:", error));
    console.log("Effort posted...");
};

// Get target from latest habit row with same habitName. Bruges i newHabitRow til at få target med i den nye række
export async function getTarget(habitName) {
    const response = await fetch(
        `${IP}/getTarget?habitName=${encodeURIComponent(habitName)}`
    );
    const data = await response.json();
    setTarget(data);
    console.log("target is:", data);
    return data;
}

// Get routine from latest habit row with same habitName. Bruges i newHabitRow til at få rutine med i den nye række
export async function getRoutine(habitName) {
    const response = await fetch(
        `${IP}/getRoutine?habitName=${encodeURIComponent(habitName)}`
    );
    const data = await response.json();
    setRoutine(data);
    console.log("Routine is: ", data);
    return data;
}

// Create new habit row if it doesn't already exist for today. Tager target og routine fra seneste habit row med samme navn
export async function newHabitRow(habitName) {
    const target = await getTarget(habitName);
    const routine = await getRoutine(habitName);
    fetch(`${IP}/newHabitRow?habitName=${encodeURIComponent(habitName)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            target: target,
            routine: routine,
        }),
    }).catch((error) => console.error("Error:", error));
    console.log("New habit row created...");
}
