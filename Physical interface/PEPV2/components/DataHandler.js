import React, { useEffect, useState } from "react";

// TODO: brug korrekt database kode. Den fra habit puck skak fiddles herind
// TODO: Send korrekt data objekt til RenderDataScreen






export const getAllData = async (name, setHabitData) => {
    const IP = `http://localhost:3000`;
    habitName = name;

    // henter al data fra database
    const fetchData = async (habitName) => {
        try {
            const response = await fetch(`${IP}/getData?habitName=${encodeURIComponent(habitName)}`);
            console.log("Data awaiting...");
            data = await response.json();
            console.log("Data fetched...", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    var data = await fetchData(habitName);

    // Kommer fra habit puck V1
    const getPreviousWeekdays = () => {
        const today = new Date();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekdays = [];

        for (let i = 0; i <= today.getDay() - 1; i++) {
            const previousDay = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            previousDay.setHours(0, 0, 0, 0); // Set the time to 00:00:00
            if (daysOfWeek[previousDay.getDay()] !== "Sunday") {
                weekdays.push(`${previousDay.toDateString()} ${previousDay.toTimeString()}`);
            }
            if (daysOfWeek[previousDay.getDay()] === "Monday") {
                break;
            }
        }
        return weekdays.reverse();
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
        const todaysday = (new Date().getDay() + 6) % 7; // Shift Sunday to the end
        const Keys = getPreviousWeekdays();
        for (let i = 0; i < Keys.length; i++) {
            console.log("a datapoint:", data[Keys[i]]);
            console.log("should be", Object.keys(data));
            if (data[Keys[i]]) {
                historyCounts[i] = data[Keys[i]].count;
            } else {
                historyCounts[i] = 0;
            }
        }
        console.log("historyCounts", historyCounts);
        return historyCounts;
    };

    // Kommer fra habit puck V1
    const calculateStreak = async (data) => {
        console.log("habitHistory", data);
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

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = today.toString();
        console.log(todayString);

        const [count, streak] = await Promise.all([getHistory(data), calculateStreak(data)]);

        habitObject.name = data[todayString].habitName;
        habitObject.count = count;
        habitObject.target = data[todayString].target;
        habitObject.effort = data[todayString].effort;
        habitObject.routine = data[todayString].routine;
        habitObject.streak = streak;

        console.log("habitObject:", habitObject);
        return habitObject;
    };


    var habitObject = await createHabitObject(data);
    setHabitData(habitObject);
};