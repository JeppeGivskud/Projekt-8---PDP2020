import { View } from "react-native";

import HabitBox from "../HabitBox";
export default function HabitBoxes({ style }) {
    return (
        <View style={[style, { backgroundColor: "#222" }]}>
            <HabitBox
                color={"tomato"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox color={"blue"} name={"Ostesovs"} count={"to"}></HabitBox>
            <HabitBox color={"navy"} name={"Ostesovs"} count={"to"}></HabitBox>
            <HabitBox color={"green"} name={"Ostesovs"} count={"to"}></HabitBox>
            <HabitBox color={"red"} name={"Ostesovs"} count={"to"}></HabitBox>
            <HabitBox
                color={"rgb(200,0,200)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>

            <HabitBox
                color={"rgb(0,200,200)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox
                color={"rgb(200,200,0)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox
                color={"rgb(100,0,100)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox
                color={"rgb(0,200,100)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox
                color={"rgb(200,0,100)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
            <HabitBox
                color={"rgb(100,0,200)"}
                name={"Ostesovs"}
                count={"to"}
            ></HabitBox>
        </View>
    );
}
