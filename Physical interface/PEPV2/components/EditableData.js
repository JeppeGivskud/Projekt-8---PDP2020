import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Pressable, Text } from "react-native";

const EditableData = ({ Name, Data, setData }) => {
    const [editable, setEditable] = useState(true);

    const changeData = (newData) => {
        setData(newData);
    };
    return (
        <View
            style={{
                flexDirection: "row",
                borderRadius: 2,
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ width: 100 }}>{Name}</Text>
            <TextInput
                style={{ padding: 1, margin: 1, borderWidth: 1, width: 100 }}
                editable={editable}
                onChangeText={(newData) => changeData(newData)}
                value={String(Data)} // Use state variable here
            />
        </View>
    );
};

export default EditableData;
