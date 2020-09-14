import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Choicebutton from './ChoiceButton'
import AIcon from 'react-native-vector-icons/AntDesign'
import EIcon from 'react-native-vector-icons/Entypo'

const Category = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>
            <View style={styles.choices}>
                <Choicebutton name={"1"} />
                <Choicebutton name={"2"} />
                <Choicebutton name={"3"} />
                <Choicebutton name={"4"} />
                <TouchableOpacity>
                    <AIcon size={30} color="black" name="caretright" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AIcon size={30} color="black" name="pause" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EIcon size={30} color="black" name="controller-stop" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    choices: {
        flexDirection: "row"
    }
})
export default Category;