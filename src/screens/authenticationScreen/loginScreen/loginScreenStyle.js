import { StyleSheet } from "react-native";
import { widthPercentageToDP as vw } from "../../../responsive/responsive";

export default StyleSheet.create({
    mianView: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    inputFieldsView: {
        marginTop: 30,
        paddingLeft: vw(7),
        paddingRight: vw(7),
    },
})