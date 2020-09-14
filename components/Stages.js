import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const Stages = ({ title, elem }) => {
    return (
        <View style={styles.parent}>
            <Text>{title}</Text>

            <View style={styles.elemCotainer}>
                {
                    elem.map((item, index) => {

                        return (
                            <TouchableOpacity style={styles.item}>
                                <Text style={{ color: "white", textAlign: "center" }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        flexDirection: "column"
    },
    item: {
        backgroundColor: "black",
        color: "white",
        borderRadius: 35,
        margin: 10,
        padding:7,
        width: 35,
        textAlign: 'center'
    },
    elemCotainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "center",
        flexWrap:"wrap"

    }
})

export default Stages;