import React from "react";
import { Button } from "native-base";
import style from "./buttonStyle";
import { Text } from "react-native";

export default function CustomButton(props) {
    const { buttonText } = props
    return <Button style={style.buttonStyle}>
        <Text style={style.buttonText}>
            {buttonText}
        </Text>
    </Button>
}