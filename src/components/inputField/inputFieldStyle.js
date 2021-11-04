import { StyleSheet } from "react-native";
import { heightPercentageToDP as vh, widthPercentageToDP as vw } from "../../responsive/responsive";


let inputStyle = {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export default StyleSheet.create({
    inputView: {
        width: vw(85),
        marginTop: 5,
        marginBottom: 5,
        height: 87,
        alignSelf: 'center',
    },
    focusInputStyle: {
        ...inputStyle,
        shadowColor: "#fd7e14",
        shadowRadius: 10,
        elevation: 1,
    },
    blurInputStyle: {
        ...inputStyle,
        color: '#495057',
    },
    input: {
        marginLeft: 5,
        width: vw(65),
        color: 'black',
        fontSize: vw(4.5),
    },
    iconStyle: {
        marginRight: 5,
        alignSelf: 'center',
        color:'#6c757d'
    }
    ,
    invalidInput: {
        color: 'red',
        paddingLeft: 8,
        paddingTop: 2
    }
})