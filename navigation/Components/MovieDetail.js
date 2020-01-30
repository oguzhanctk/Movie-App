import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Dimensions, ScrollView, ImageBackground, TouchableHighlight, StyleSheet, ToastAndroid } from 'react-native'
import CustomAnimation from "../../animation_Components/animations/";
import { Badge } from "../Components/microComponents/Badge";
import Icon from "react-native-vector-icons/MaterialIcons";
import CreditsSlider from "../Components/microComponents/CreditsSlider";
import { storeMethod } from "./storage/index";

const MovieDetail = (props) => {
    const url = `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=e02b145f1588ea6f178b8e24b19a93f8&language=tr&append_to_response=credits`
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height/2;
    const imagePath = (props.movieDetail.backdrop_path) || (props.movieDetail.poster_path); 
    const [isAdded, setisAdded] = useState(false);
    const isLoading = 

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
        (props.isLoading === false) ?
            
            (<SafeAreaView>
                <CustomAnimation>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        <ImageBackground source = {{ uri : `${baseImageUrl + imagePath}`}}
                            style = {{width : width, height : height, justifyContent : "flex-end", alignItems : "flex-end"}}
                            resizeMode = "cover">
                                {
                                    (isAdded === true) ?
                                        null :
                                    (<TouchableHighlight style = {styles.fab} onPress = {() => {
                                        storeMethod.storeData({id : props.movieDetail.id, poster_path : props.movieDetail.poster_path}, setisAdded);
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
                                        paddingHorizontal : 3}}>
                                    {props.movieDetail.title}
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
                                        <Text style = {{fontWeight : "bold"}}>{props.movieDetail.runtime}m</Text>
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
            </SafeAreaView>) : null

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
