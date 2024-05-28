import React, { useState } from "react";
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
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ width: 100 }}>{Name}</Text>
            <TextInput
                style={[editable ? { borderWidth: 1 } : {}, { padding: 1, margin: 1 }]}
                editable={editable}
                onChangeText={(newData) => changeData(newData)}
                value={Data}
            />
            {/* <Pressable
                onPress={() => {
                    setEditable(!editable);
                }}
            >
                <Text>⚙️</Text>
            </Pressable> */}
        </View>
    );
};

export default EditableData;
