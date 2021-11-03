import { StyleSheet } from "react-native";
import { widthPercentageToDP as vw } from "../../responsive/responsive";

export default StyleSheet.create({
    mianView: {
        // backgroundColor: 'yellow',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10,
        marginRight: 10,
    },
    inputFieldsView: {
        marginTop: 30
    },
    forgotPwsdText: {
        color: '#f06d06',
        alignSelf: 'center',
        fontSize: vw(4),
        fontWeight: '300',
        marginBottom: 20
    },
    signupLinkView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    text1: {
        color: 'black',
        fontWeight: '400',
    },
    text2: {
        color: '#f06d06',
        fontSize: vw(4),
        fontWeight: '300',
        paddingLeft: 5

    }
})