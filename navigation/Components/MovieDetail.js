import React, { useEffect, useState } from 'react'
import {View,
        Text,
        SafeAreaView,
        Dimensions,
        ScrollView,
        ImageBackground,
        TouchableHighlight,
        StyleSheet,
        ToastAndroid} from 'react-native'
import CustomAnimation from "../../animation_Components/animations/";
import { Badge } from "../Components/microComponents/Badge";
import Icon from "react-native-vector-icons/MaterialIcons";
import CreditsSlider from "../Components/microComponents/CreditsSlider";
import { storeMethod } from "./storage/index";
import { Loader } from './microComponents/Loader';
import { constants } from "../../api/config";
import { Auth } from "aws-amplify";
import AsyncStorage from "@react-native-community/async-storage";

const MovieDetail = (props) => {

    const url = (props.mediaType === "tv") ?
        `https://api.themoviedb.org/3/tv/${props.id}?api_key=${constants.api_key}&language=tr&append_to_response=credits` : 
        `https://api.themoviedb.org/3/movie/${props.id}?api_key=${constants.api_key}&language=tr&append_to_response=credits`;
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height/2;
    const imagePath = (props.movieDetail.backdrop_path) || (props.movieDetail.poster_path); 
    const [isAdded, setisAdded] = useState(false);

    const name = props.movieDetail.original_name || props.movieDetail.original_title;    

    useEffect(() => {
        const fetchMovie = async () => {
            await props.fetchMovieDetails(url);
            }
        fetchMovie();
        return () => {
            props.clearMovieDetails();
        };
    }, []);

    return (
        (props.isLoading) ?
            (<Loader indicatorColor = "gray"/>) :
            (<SafeAreaView>
                <CustomAnimation>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        <ImageBackground source = {{ uri : `${baseImageUrl + imagePath}`}}
                            style = {{width : width, height : height, justifyContent : "flex-end", alignItems : "flex-end"}}
                            resizeMode = "cover">
                                {
                                    (isAdded === true) ?
                                        null :
                                    (<TouchableHighlight style = {styles.fab} onPress = {async () => {
                                        const isSkip = await AsyncStorage.getItem("@isSkip");
                                        if(isSkip === "true") 
                                            ToastAndroid.show("Bu özelliği kullanabilmek için giriş yapın", ToastAndroid.SHORT);
                                        else { 
                                            const user = await Auth.currentAuthenticatedUser();
                                            storeMethod.storeData({
                                                id : props.movieDetail.id, 
                                                poster_path : props.movieDetail.poster_path, 
                                                media_type : props.mediaType},
                                                setisAdded,
                                                user.username);
                                            }
                                    }}
                                    underlayColor = "lightgreen">
                                        <Icon name = "add" size = {35} color = "black"/>
                                    </TouchableHighlight>)
                                }
                        </ImageBackground>
                        <View style = {{flex : 1, flexDirection : "column"}}>
                            <View style = {{flex : 1, marginVertical : 5, width : "100%", paddingVertical : 7}}>
                                <Text style = {{fontSize : 18, 
                                        fontWeight : "bold", 
                                        letterSpacing : 1,
                                        alignSelf : "center",
                                        marginBottom : 5,
                                        paddingHorizontal : 13}}>
                                    {name}
                                </Text>
                                <View style = {{flexDirection : "row", 
                                    alignItems : "center", 
                                    justifyContent : "space-evenly", 
                                    padding : 7, 
                                    backgroundColor : "#ccc", 
                                    marginVertical : 5}}>
                                    <View>
                                        <Text style = {{fontWeight : "bold"}}>{props.movieDetail.release_date}</Text>
                                    </View>
                                    <View>
                                        {
                                            (props.mediaType === "movie") ? 
                                                (<Text style = {{fontWeight : "bold"}}>{props.movieDetail.runtime}<Text style = {{fontSize : 9}}>dk</Text></Text>) :
                                                (<Text style = {{fontWeight : "bold"}}>{props.movieDetail.number_of_seasons} sezon</Text>) 
                                        }
                                    </View>
                                    <View style = {{flexDirection : "row", marginRight : 5}}>
                                        <Text style = {{fontSize : 18, fontWeight : "bold"}}>{props.movieDetail.vote_average}</Text>
                                        <Icon name = "star" size = {23} color = "orange"/>
                                    </View>
                                </View>
                            </View>
                            <View style = {{flex : 1, 
                                flexDirection : "column",
                                alignItems : "center", 
                                justifyContent : "center", 
                                paddingHorizontal : 15,
                                marginBottom : 7,
                                paddingVertical : 3}}>
                                <View style = {{flexDirection : "row"}}>
                                {
                                    props.movieDetail.genres && props.movieDetail.genres.map( genre => {
                                        return (
                                            <Badge textContent = {genre.name} key = {genre.id}/>
                                        )
                                    })
                                }
                                </View>
                                
                            </View>
                            <View style = {{paddingHorizontal : 15, marginVertical : 3}}>
                                <Text style = {{letterSpacing : 0.7}}>{props.movieDetail.overview}</Text>
                            </View>
                            <View>
                                <CreditsSlider data = {props.movieDetail.credits && props.movieDetail.credits.cast.splice(0, 7)}/>
                            </View>
                        </View>
                    </ScrollView>
                </CustomAnimation>    
            </SafeAreaView>)

    )
}

const styles = StyleSheet.create({
    fab : { 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: 45,
        height: 45,  
        borderRadius : 100,
        backgroundColor : "#d4f5d3",
        opacity : 0.75,
        bottom : 11,
        right : 11
    }
});

export default MovieDetail;
