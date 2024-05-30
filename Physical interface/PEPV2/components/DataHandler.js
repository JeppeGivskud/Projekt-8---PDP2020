var IP = `http://127.0.0.1:5000`;

// TODO: Send korrekt data objekt til RenderDataScreen

export const getAllData = async (habitName, tableName, dataBase, setHabitData, IPadress = "http://127.0.0.1:5000") => {
    IP = IPadress;
    console.log("Fetching from", IP);
    // Henter al data fra database

    const fetchData = async (habitName) => {
        try {
            console.log("Requesting data for: ", habitName, tableName, dataBase);
            //The fetch is creating an url with the habitName, tableName and dataBase which is deconstructed on the server side
            const response = await fetch(
                `${IP}/getData?habitName=${encodeURIComponent(habitName)}&tableName=${encodeURIComponent(
                    tableName
                )}&dataBase=${encodeURIComponent(dataBase)}`
            );
            console.log("Data awaiting...");
            data = await response.json();
            console.log("Data fetched...", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const getPreviousWeekdays2 = () => {
        const One = new Date(new Date().setHours(23, 59, 59, 999) + 1).toISOString();
        const Two = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
        const Three = new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000).toISOString();
        const Four = new Date(new Date().setHours(0, 0, 0, 0) - 2 * 24 * 60 * 60 * 1000).toISOString();
        const Five = new Date(new Date().setHours(0, 0, 0, 0) - 3 * 24 * 60 * 60 * 1000).toISOString();
        const Six = new Date(new Date().setHours(0, 0, 0, 0) - 4 * 24 * 60 * 60 * 1000).toISOString();
        const Seven = new Date(new Date().setHours(0, 0, 0, 0) - 5 * 24 * 60 * 60 * 1000).toISOString();
        return [Seven, Six, Five, Four, Three, Two, One];
    };

    // Kommer fra habit puck V1
    const getHistory = async (data) => {
        var historyCounts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };
        //The keys are the dates of the previous 7 days
        //The history are the dates of the current week
        //How do i make sure that the previous days are put into the correct place in the historyCounts
        //I could take the current day (e.g. 4) be the most recent day in the keys
        const Keys = getPreviousWeekdays2();
        console.log("Keys", Keys);
        console.log("data", data);
        const today = (new Date().getDay() + 6) % 7;
        for (let i = today; i >= 0; i--) {
            let key = Keys.pop();
            console.log("data for this day", Keys, key, data[key]);

            if (data[key]) {
                historyCounts[i] = data[key].count;
            } else {
                historyCounts[i] = 0;
            }
        }
        return historyCounts;
    };
    // Kommer fra habit puck V1
    const calculateStreak = async (data) => {
        //Checks two things at a time. The streak length and the days which have been omissed.
        //Once a non omission has been found the omissions stop changing
        //The streak survives 5 days
        var streak = 0;
        var omissions = 0;
        var checkOmissions = true;
        var maxOmissions = 5;
        var criteria = 0;
        for (let i = Object.keys(data).length - 2; i >= 0; i--) {
            if (omissions < maxOmissions) {
                if (data[Object.keys(data)[i]].count > criteria) {
                    streak = streak + 1;
                    checkOmissions = false;
                } else if (checkOmissions) {
                    omissions += 1;
                }
            }
        }
        if (data[Object.keys(data)[Object.keys(data).length - 1]].count > criteria) {
            streak++;
        }
        return { count: streak, omissions: omissions };
    };

    // Object with habitName, target, effort, routine from todays row in the imported data
    const createHabitObject = async (data) => {
        var habitObject = {
            name: null,
            count: {},
            target: null,
            effort: null,
            routine: null,
            streak: {},
        };

        const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

        const [count, streak] = await Promise.all([getHistory(data), calculateStreak(data)]);

        habitObject.name = data[today].habitName;
        habitObject.target = data[today].target;
        habitObject.effort = data[today].effort;
        habitObject.routine = data[today].routine;

        habitObject.count = count;
        habitObject.streak = streak;

        console.log("habitObject:", habitObject);
        return habitObject;
    };

    var data = await fetchData(habitName);
    var habitObject = await createHabitObject(data);
    setHabitData(habitObject);
};
// setRow. Tager i mod habitData og opdaterer rækken i databasen med de nye data
export const setRow = async (habitData) => {
    const today = (new Date().getDay() + 6) % 7;
    const data = {
        habitName: habitData.name,
        target: parseInt(habitData.target),
        effort: parseInt(habitData.effort),
        routine: habitData.routine,
        count: parseInt(habitData.count[today]),
    };
    console.log("Updating row...", habitData);
    console.log("Data to be posted", data);

    fetch(`${IP}/setRow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.text())
        .catch((error) => console.error("Error:", error));
    console.log("Row updated...");
};

// postCount. Tager i mod habitData og poster dagens count til databasen
export const postCount = async (name, habitData) => {
    const count = habitData.count[new Date().getDay()];
    console.log("Count: ", count);
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
