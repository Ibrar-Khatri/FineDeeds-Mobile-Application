import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "../../responsive/responsive";


export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#f06d06',
        borderRadius:7
    },
    buttonText: {
        color: '#fff',
        fontSize: widthPercentageToDP(5),
        fontWeight: '600',
    }
})