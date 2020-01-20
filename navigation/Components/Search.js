import React from 'react'
import { View, Text } from 'react-native'

const Search = (props) => {
    return (
        <View>
            <Text>{props.isLoading.toString()}</Text>
        </View>
    )
};

export default Search;
