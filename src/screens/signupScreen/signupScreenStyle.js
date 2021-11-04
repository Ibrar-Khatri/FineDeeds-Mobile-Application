import { StyleSheet } from "react-native";
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "../../responsive/responsive";

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
        marginLeft: vw(7),
        marginRight: vw(7),
    },
    termsAndCondView: {
        height: 45,
        marginBottom: 10,
    },
    checkBoxAndTextView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'aqua',
    },
    focusCheckBox: {
        backgroundColor: '#fd7e14',
        height: vh(3),
        width: vh(3),
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 5,
        padding: 3
    },
    blurCheckBox: {
        height: vh(3),
        width: vh(3),
        borderRadius: 4,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ced4da'
    },
    termsAndCond: {
        color: 'black',
        alignSelf: 'center',
        fontSize: vw(4),
        fontWeight: '300',
    },
    termsAndCondLink: {
        color: '#f06d06'
    },
    invalidInput: {
        color: 'red',
        marginTop: 5,
        marginLeft: 10
    },
})