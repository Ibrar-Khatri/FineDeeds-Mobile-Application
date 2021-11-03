import { StyleSheet } from "react-native";
import { widthPercentageToDP as vw } from "../../responsive/responsive";

export default StyleSheet.create({
    mianView: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    inputFieldsView: {
        marginTop: 30
    },
    termsAndCond: {
        color: 'black',
        alignSelf: 'center',
        fontSize: vw(4),
        fontWeight: '300',
        marginBottom: 20
    },
})