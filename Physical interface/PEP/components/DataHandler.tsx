import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// TODO: brug korrekt database kode. Den fra habit puck skak fiddles herind
// TODO: Send korrekt data objekt til RenderDataScreen

interface DataType {
  habitName: string;
  // Add other fields as necessary
}


const DataHandler: React.FC = () => {
    const [data, setData] = useState({});
    const [streakObject, setStreakObject] = useState({ count: 0, omissions: 0 });
    const [historyCounts, setHistoryCounts] = useState({});
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation();
    const IP = `http://localhost:3000`;

  useEffect(() => {
    fetchData(); // Fetch data from database
    getHistory(data); // format data correctly
    calculateStreak(data);

  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${IP}/getData?habitName=${encodeURIComponent(habitName)}`);
      setData(await response.json());
      console.log("data state: ", data);
      console.log("response.json():", response.json());

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  // Kommer fra habit puck V1
  const getPreviousWeekdays = () => {
    const today = new Date();
    const daysOfWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];
    const weekdays = [];

    for (let i = 0; i <= today.getDay() - 1; i++) {
        const previousDay = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        previousDay.setHours(0, 0, 0, 0); // Set the time to 00:00:00
        if (daysOfWeek[previousDay.getDay()] !== "Sunday") {
            weekdays.push(
                `${previousDay.toDateString()} ${previousDay.toTimeString()}`
            );
        }
        if (daysOfWeek[previousDay.getDay()] === "Monday") {
            break;
        }
    }
    return weekdays.reverse();
}

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
        console.log("should be", Object.keys(data))
        if (data[Keys[i]]) {
            historyCounts[i] = data[Keys[i]].count;
        } else {
            historyCounts[i] = 0;
        }
    }
    console.log("historyCounts", historyCounts);
    setHistoryCounts(historyCounts);
    return historyCounts;
}

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
    if (
        data[
            Object.keys(data)[Object.keys(data).length - 1]
        ].count > criteria
    ) {
        streak++;
    }
    setStreakObject({ count: streak, omissions: omissions });
    return { count: streak, omissions: omissions };
}

  const navigateToRenderData = () => {
    navigation.navigate("RenderDataScreen", { data });
  };

  // Skift til RenderDataScreen hvis data er loaded
  if (loading) {
      return (<ActivityIndicator size="large" />);
      }
  else {
    navigateToRenderData();

  };
};

export default DataHandler;
