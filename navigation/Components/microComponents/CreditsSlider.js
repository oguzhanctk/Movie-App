import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'

const CreditsSlider = (props) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w185";
    const renderItem = ({item}) => (
        <View style = {{width : 110, alignItems : "center"}}>
            <Image source = {{uri : `${baseImageUrl + item.profile_path}`}}
                style = {{width : 70,
                    height : 70, 
                    borderRadius : 35, 
                    marginRight : 7, 
                    borderWidth : 0.3, 
                    borderColor : "black",
                    backgroundColor : "gray"}}/>
            <Text style = {{padding : 5}}>{item.name}</Text>
        </View>
    );

    return (
        <View style = {{padding : 5, marginVertical : 15, alignItems : "center"}}>
            <FlatList
                data = {props.data}
                horizontal
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id.toString()}/>
        </View>
    )
}

export default CreditsSlider;
