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
    const getPreviousWeekdays = () => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekdays = [];
        for (let i = 0; i <= today.getDay() - 1; i++) {
            const previousDay = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            previousDay.setHours(0, 0, 0, 0);
            const date = new Date(previousDay);
            const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
            if (daysOfWeek[previousDay.getDay()] !== "Sunday") {
                weekdays.push(dateString);
            }
            if (daysOfWeek[previousDay.getDay()] === "Monday") {
                break;
            }
        }
        return weekdays.reverse();
    };

    const getHistory = (habitHistory) => {
        var historyCounts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };
        // const todaysday = (new Date().getDay() + 6) % 7; // Shift Sunday to the end
        const Keys = getPreviousWeekdays();
        for (i = 0; i < Keys.length; i++) {
            if (habitHistory[Keys[i]]) {
                historyCounts[i] = habitHistory[Keys[i]].count;
            } else {
                historyCounts[i] = 0;
            }
        }
        console.log("historyCounts", historyCounts);
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

        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const dateString = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;

        const [count, streak] = await Promise.all([getHistory(data), calculateStreak(data)]);

        habitObject.name = data[dateString].habitName;
        habitObject.target = data[dateString].target;
        habitObject.effort = data[dateString].effort;
        habitObject.routine = data[dateString].routine;

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
    const today = (new Date().getDay() + 6) % 7; //for the correct count
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
