export const dummyData = {
    "Sat May 04 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 1,
        currentDate: "2024-05-03T22:00:00.000Z",
        habitName: "Bench Press",
        count: 7,
        target: null,
        effort: null,
        routine: null,
    },
    "Sun May 05 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 2,
        currentDate: "2024-05-04T22:00:00.000Z",
        habitName: "Bench Press",
        count: 8,
        target: null,
        effort: null,
        routine: null,
    },
    "Mon May 06 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 3,
        currentDate: "2024-05-05T22:00:00.000Z",
        habitName: "Bench Press",
        count: 9,
        target: null,
        effort: null,
        routine: null,
    },
    "Tue May 07 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 4,
        currentDate: "2024-05-06T22:00:00.000Z",
        habitName: "Bench Press",
        count: 10,
        target: null,
        effort: null,
        routine: null,
    },
    "Wed May 08 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 6,
        currentDate: "2024-05-07T22:00:00.000Z",
        habitName: "Bench Press",
        count: 20,
        target: 100,
        effort: 100,
        routine: "Morning",
    },
    "Thu May 09 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 8,
        currentDate: "2024-05-08T22:00:00.000Z",
        habitName: "Pushups",
        count: 220,
        target: 100,
        effort: 10,
        routine: "Morning",
    },
};
export const getHistory = (habitHistory) => {
    var historyCounts = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };
    const todaysday = (new Date().getDay() + 6) % 7; // Shift Sunday to the end

    //i takes the number of the last thing
    //i then makes a number starting from todays date
    for (
        i = Object.keys(habitHistory).length - 1;
        i >= Object.keys(habitHistory).length - todaysday - 1;
        i--
    ) {
        var daycircle = (i + todaysday) % (todaysday + 2);
        var count = habitHistory[Object.keys(habitHistory)[i]].count;
        historyCounts[daycircle] = count;
    }
    return historyCounts;
};
//:TODO: Habithistory has a status of pending, this is not handled in the function. Perhaps we can access the results of the request in this function
export const calculateStreak = (habitHistory) => {
    console.log("habitHistory", habitHistory);
    //Checks two things at a time. The streak length and the days which have been omissed.
    //Once a non omission has been found the omissions stop changing
    //The streak survives 5 days
    var streak = 0;
    var omissions = 0;
    var checkOmissions = true;
    var maxOmissions = 5;
    var criteria = 0;
    for (i = Object.keys(habitHistory).length - 2; i >= 0; i--) {
        if (omissions < maxOmissions) {
            if (habitHistory[Object.keys(habitHistory)[i]].count > criteria) {
                streak = streak + 1;
                checkOmissions = false;
            } else if (checkOmissions) {
                omissions += 1;
            }
        }
    }
    if (
        habitHistory[
            Object.keys(habitHistory)[Object.keys(habitHistory).length - 1]
        ].count > criteria
    ) {
        streak++;
    }

    return { streak: streak, omissions: omissions };
};
export const dummyDatasimple = {
    "Mon May 13 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 40,
    },
    "Tue May 14 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 80,
    },
    "Wed May 15 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 10,
    },
    "Thu May 16 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 10,
    },
    "Friday May 17 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 10,
    },
};
export const dummyDatasimple2 = {
    "Sat May 04 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 11,
    },
    "Sun May 05 2022 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 10,
    },
    "Mon May 10 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 9,
    },
    "Mon May 13 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 8,
    },
    "Mon May 14 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 7,
    },
    "Mon May 15 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
    "Mon May 16 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 1,
    },
    "Mon May 17 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
    "Mon May 18 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
    "Tue May 07 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
    "Wed May 08 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 1,
    },
    "Thu May 09 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
    "Fri May 10 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        count: 0,
    },
};
