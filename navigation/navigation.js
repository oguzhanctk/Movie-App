import { Navigation } from "react-native-navigation";
    
Navigation.setDefaultOptions({
    navigationBar : {
        backgroundColor : "gray",    
    },
    bottomTabs : {
        titleDisplayMode : "alwaysShow",
        backgroundColor : "white",
    },
    statusBar : {
        style : "light",
        backgroundColor : "#3b3935",
    },
    layout : {
        orientation : ["portrait"]
    },
    topBar : {
        visible : false,        
    }
    
})

export const goToAuth = () => {
    Navigation.setRoot({
        root : {
            bottomTabs : {
                id : "bottomTabsId",
                children : [
                    {
                        component : {
                            id : "signInId",
                            name : "SignIn",
                            options : {
                                bottomTab : {
                                    text : "Sign in",
                                    icon : {
                                      uri :  "ic_account_circle"
                                    },
                                    selectedTextColor : "black",
                                    selectedIconColor : "black",
                                    iconColor : "gray",
                                    textColor : "gray"
                                    
                                }
                            }
                        }
                    },
                    {
                        component : {
                            name : "SignUp",
                            id : "signUpId",
                            options : {
                                bottomTab : {
                                    text : "Sign up",
                                    icon : {
                                        uri : "ic_group_add"
                                    },
                                    selectedTextColor : "black",
                                    selectedIconColor : "black",
                                    iconColor : "gray",
                                    textColor : "gray",
                                }
                            }
                        }
                    }
                ],
                options : {
                    bottomTabs : {
                        backgroundColor : "white",
                    },
                },
            },
        },
    });   
}

export const goToMainLayout = () => {
    Navigation.setRoot({
        root : {
            bottomTabs : {
                id : "main_bottom_tabs",
                children : [
                    {
                        stack : {
                            children : [
                                {
                                    component : {
                                        name : "Home",
                                        options : {
                                            topBar : {
                                                visible : false
                                            },
                                        }
                                    }
                                }
                            ],
                            options : {
                                bottomTab : {
                                    iconColor : "gray",
                                    textColor : "gray",
                                    selectedIconColor : "black",
                                    selectedTextColor : "black",
                                    text : "Anasayfa",
                                    icon : {
                                        uri : "ic_local_movies"
                                    },
                                }
                            }
                        }
                    },
                    {
                        stack : {
                            children : [
                                {
                                    component : {
                                        name : "Discover",
                                        options : {
                                            topBar : {
                                                visible : false
                                            },
                                        }
                                    }
                                }
                            ],
                            options : {
                                bottomTab : {
                                    iconColor : "gray",
                                    textColor : "gray",
                                    text : "Keşfet",
                                    icon : {
                                        uri : "ic_search"
                                    },
                                    selectedIconColor : "black",
                                    selectedTextColor : "black"
                                }
                            }
                        }
                    },
                    {
                        component : {
                            id : "library_id",
                            name : "Library",
                            options : {
                                bottomTab : {
                                    iconColor : "gray",
                                    textColor : "gray",
                                    text : "Kütüphane",
                                    icon : {
                                        uri : "ic_library_books"
                                    },
                                    selectedIconColor : "black",
                                    selectedTextColor : "black"
                                },
                            }
                        }
                    }
                ],
            }
        }
    });
} 
