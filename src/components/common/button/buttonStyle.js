import { StyleSheet } from "react-native";
import { heightPercentageToDP as vh, widthPercentageToDP as vw } from "../../../responsive/responsive";


export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#f06d06',
        borderRadius:7
    },
    buttonText: {
        color: '#fff',
        fontSize: vw(5),
        fontWeight: '600',
    }
})