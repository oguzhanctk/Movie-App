import { Navigation } from "react-native-navigation";

Navigation.setDefaultOptions({
    navigationBar : {
        backgroundColor : "gray",
        
    },
    bottomTabs : {
        titleDisplayMode : "showWhenActive",
        backgroundColor : "white"
    },
    statusBar : {
        style : "light",
        backgroundColor : "gray"
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
                                    fontSize : 12,
                                    text : "Sign in",
                                    icon : require("./assets/signin.png")
                                }
                            }
                        },
                    },
                    {
                        component : {
                            name : "SignUp",
                            options : {
                                bottomTab : {
                                    fontSize : 12,
                                    text : "Sign up",
                                    icon : require("./assets/signup.png"),
                                }
                            }
                        }
                    }
                ],
            }
        }
    });   
}

export const goHome = () => {
    Navigation.setRoot({
        root : {
            stack : {
                id : "App",
                children : [
                    {
                        component : {
                            name : "Home",
                            
                        }
                    }
                ],
                options : {
                    topBar : {
                        rightButtons : [
                            {
                                id : "sideMenu",
                                icon : require("./assets/sideMenu.png"),
                                color : "gray",
                            },
                        ],
                    }
                }
            }
        }
    })
}

export const test = () => {
    Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [{
              stack: {
                children: [{
                  component: {
                    name: 'Discover',
                    passProps: {
                      text: 'This is tab 1'
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    text: 'Tab 1',
                    icon : require("./assets/signup.png"),
                    testID: 'FIRST_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              component: {
                name: 'Discover',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {
                  bottomTab: {
                    text: 'Tab 2',
                    icon : require("./assets/signup.png"),
                    testID: 'SECOND_TAB_BAR_BUTTON'
                  }
                }
              }
            }]
          }
        }
      });
}

export const goTosideMenuLayout = () => {
    Navigation.setRoot ({
        root : {
            sideMenu : {
                left : {
                    component : {
                        name : "SideMenuTest",
                    },
                },
                center : {
                    stack : {
                        children : [
                            {
                                component : {
                                    name : "Home",
                                    passProps : {
                                        alertText : "this is props for a home component"
                                    },
                                }
                            }
                        ],
                        options : {
                            topBar : {
                                leftButtons : [
                                    {
                                        id : "leftSide",
                                        icon : require("./assets/sideMenu.png"),
                                        color : "black",
                                    }
                                ],
                            },
                        }
                    }
                    
                    
                },
                options : {
                    sideMenu : {
                        left : {
                            width : 200,
                        }
                    },
                }
            }
        }
    })
}

export const overlayTest = () => {
    Navigation.showOverlay({
        component : {
            name : "Discover",
            options : {
                overlay : {
                    interceptTouchOutside : true
                }
            }
        }
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
                                    icon : require("./assets/home.png"),
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
                                                title : {
                                                    text : "Keşfet",
                                                    color : "red",
                                                    alignment : "center"
                                                }
                                            }
                                        }
                                    }
                                }
                            ],
                            options : {
                                bottomTab : {
                                    iconColor : "gray",
                                    textColor : "gray",
                                    text : "Keşfet",
                                    icon : require("./assets/search.png"),
                                    selectedIconColor : "black",
                                    selectedTextColor : "black"
                                }
                            }
                        }
                    },
                    {
                        component : {
                            name : "Discover",
                            options : {
                                bottomTab : {
                                    iconColor : "gray",
                                    textColor : "gray",
                                    text : "Kitaplık",
                                    icon : require("./assets/library.png"),
                                    selectedIconColor : "black",
                                    selectedTextColor : "black"
                                },
                            }
                        }
                    }
                ]
            }
        }
    });
} 
