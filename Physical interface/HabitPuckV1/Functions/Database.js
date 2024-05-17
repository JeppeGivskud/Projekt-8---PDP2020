const IP = `http://localhost:3001`;
let habitData;

// Create table if not exists
export const createTable = () => {
    fetch(`${IP}/createTable`)
        .then((response) => response.text())
        .catch((error) => console.error("Error:", error));
    console.log("Table created...");
};

// Get all data
//DEPRECATED: this is some oooooooooooold shid
// export const getAllData = () => {
//     console.log("Fetching data...");
//     fetch(`${IP}/getData`)
//         .then((response) => response.json())
//         .then((data) => habitData)
//         .catch((error) => console.error("Error:", error));
//     console.log("Data fetched...");
//     return habitData;
// };

// Get all data
export const getAllData = async (habitName) => {
    var empty = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };
    let data;
    try {
        const response = await fetch(`${IP}/getData?habitName=${encodeURIComponent(habitName)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log("Data awaiting...", data);
        data = await response.json();
        console.log("Data fetched...", data);

        return data; // Return the fetched data
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error so the caller can handle it
    }
};

// Post count
export const postCount = (habitName, count) => {
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
export const postEffort = (habitName, effortCount) => {
    fetch(`${IP}/setEffort?habitName=${encodeURIComponent(habitName)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ effortCount: effortCount }),
    })
        .then((response) => response.json())
        .then((data) => setEffort(data))
        .catch((error) => console.error("Error:", error));
    console.log("Effort posted...");
};

// Get target from latest habit row with same habitName. Bruges i newHabitRow til at få target med i den nye række
export async function getTarget(habitName, setTarget) {
    const response = await fetch(
        `${IP}/getTarget?habitName=${encodeURIComponent(habitName)}`
    );
    const data = await response.json();
    //setTarget(data);
    console.log("target is:", data);
    return data;
}

// Get routine from latest habit row with same habitName. Bruges i newHabitRow til at få rutine med i den nye række
export async function getRoutine(habitName, setRoutine) {
    const response = await fetch(
        `${IP}/getRoutine?habitName=${encodeURIComponent(habitName)}`
    );
    const data = await response.json();
    console.log("Routine is: ", data);
    setRoutine(data);
    return data;
}

// Create new habit row if it doesn't already exist for today. Tager target og routine fra seneste habit row med samme navn
export async function newHabitRow(habitName, target, setTarget, routine, setRoutine) {
    setTarget(await getTarget(habitName, setTarget));
    setRoutine(await getRoutine(habitName, setRoutine));

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
