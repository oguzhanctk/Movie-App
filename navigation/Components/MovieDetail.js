import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native'
import CustomAnimation from "../../animation_Components/animations/";
import { Badge } from "../Components/microComponents/Badge";
import Icon from "react-native-vector-icons/MaterialIcons";
import CreditsSlider from "../Components/microComponents/CreditsSlider";

const MovieDetail = (props) => {
    const url = `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=e02b145f1588ea6f178b8e24b19a93f8&language=tr&append_to_response=credits`
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height/2;
    const imagePath = (props.movieDetail.backdrop_path) || (props.movieDetail.poster_path); 

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
        <SafeAreaView>
            <CustomAnimation>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <Image source = {{ uri : `${baseImageUrl}${imagePath}`}}
                        style = {{width : width, height : height}}
                        resizeMode = "cover">
                    </Image>
                    <View style = {{flex : 1, flexDirection : "column"}}>
                        <View style = {{flex : 1, marginVertical : 5, width : "100%", paddingVertical : 7}}>
                            <Text style = {{fontSize : 18, 
                                    fontWeight : "bold", 
                                    letterSpacing : 1,
                                    alignSelf : "center",
                                    marginBottom : 5,
                                    paddingHorizontal : 3}}>
                                {props.movieDetail.original_title}
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
        </SafeAreaView>
    )
}

export default MovieDetail;
