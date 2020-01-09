import React, { Component } from "react";
import { View, Animated, Text, Easing } from "react-native";

export default class CustomAnimation extends Component {
    state = {
        slideDown : new Animated.Value(0),
    }

    componentDidMount = () => {
        Animated.timing(
            this.state.slideDown,
            {
                toValue : 1,
                duration : 1500,
                useNativeDriver : true
            }
        ).start();
    }

    render() {
        let {slideDown} = this.state;
        
        return(
            <Animated.View
                style = {{...this.props.style,
                    transform: [
                        {
                          translateY: slideDown.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-600, 0]
                          })
                        }
                      ],
                    justifyContent : "center",
                    alignItems : "center",
                    marginVertical : 5}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
