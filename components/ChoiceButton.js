import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const ChoiceButton = ({ name }) => {
    return (
        <TouchableOpacity style={styles.item}>
            <Text style={{ color: "white", textAlign: "center" }}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "black",
        color: "white",
        borderRadius: 35,
        margin: 10,
        padding: 7,
        width: 35,
        textAlign: 'center'
    },
})
export default ChoiceButton;