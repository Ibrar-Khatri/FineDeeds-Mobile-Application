import { StyleSheet } from "react-native";
import { heightPercentageToDP as vh, widthPercentageToDP as vw } from "../../../responsive/responsive";

export default StyleSheet.create({
    mianView: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: vw(7),
        marginRight: vw(7),
    },
    fineDeedsLogo: {
        height: vw(12),
        width: vw(12),
    },
    title: {
        fontSize: vw(9),
        color: 'black',
        fontFamily: 'Merriweather-Bold',
        paddingTop: 20,
        paddingBottom: 20,
        textAlign:'center'
    },
    subTitle: {
        color: '#212529',
        fontWeight: '300',
        textAlign: 'center'
    }
})