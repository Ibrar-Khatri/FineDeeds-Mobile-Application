import { StyleSheet } from "react-native";
import { widthPercentageToDP as vw } from "../../../responsive/responsive";

export default StyleSheet.create({
    mianView: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    inputFieldsView: {
        marginTop: 30,
        marginLeft: vw(7),
        marginRight: vw(7),
    },
    textView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    text1: {
        color: 'black',
        fontWeight: '300',
    },
    text2: {
        color: '#f06d06',
        fontSize: vw(4),
        fontWeight: '300',
        paddingLeft: 5
    }
})