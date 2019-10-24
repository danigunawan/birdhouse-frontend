import React, {useState, useEffect} from 'react';
import {ScrollView, Platform, View, Text, KeyboardAvoidingView,  Keyboard, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, StyleSheet, Button, TextInput, Alert, Image} from 'react-native';
import Card from '../components/Card'
import {useDispatch, useSelector} from 'react-redux'
import * as authActions from '../store/actions/auth'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import MenuButton from '../components/MenuButton'
import Colors from '../constants/Colors'

// import MainViewScreen from './MainViewScreen';

import ImageSelector from '../components/ImageSelector';


const AuthScreen = (props) => {
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState('https://www.allaboutbirds.org/guide/assets/photo/63666541-480px.jpg');
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(()=>{
        if (error) {
            Alert.alert('An error occured!', error)
        }
    }, [error]);

    const imageSelectedHandler = (image) => {
        setAvatar(image)
    }

    const user = useSelector(state => {
        return state.user.user
    })
    
    const signupHandler = async (type) => {
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(authActions.signup(username, password, avatar))
            setAvatar(false)
            setIsLoading(false);
            props.navigation.navigate({
                routeName:'Main', params: {
                    user: user
                }
            });
        } catch (err) {
            setError(err.message)
            setAvatar(false)
            setIsLoading(false);
        }
        
    }
    return (
        
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={15} 
        style={styles.screen}>
            <SafeAreaView style={{flex: 1}}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        
                        <View style={styles.authContainer}>
                        
                            <Image style={styles.logo} source={{uri: "https://www.allaboutbirds.org/guide/assets/photo/63666541-480px.jpg"}}></Image>

                        {!login && !signup ? 
                            <View style={styles.screen}>
                                <Button title="Create an account" onPress={() => {
                                    setLogin(false)
                                    setSignup(true)
                                    }}/>
                                <Button title="Already have an account?" onPress={() => {
                                    setLogin(true);
                                    setSignup(false)
                                    }} />
                            </View> : null
                        }
                            

                        {!login && signup ? 
                                <ScrollView>
                                    <View style={styles.screen}>
                                        {/* need to change to select an image and make sure a default image can be chosen */}
                                        <ImageSelector onImageSelected={imageSelectedHandler} />
                                    </View>
                                    <View style={styles.screen}>
                                        <Text style={styles.label}>Username</Text>
                                        <TextInput autoCapitalize="none" style={styles.input} id="username" label="username" value={username} keyboardType="default" required defaultValue="Enter username" autoCompleteType="off" errorText="Please enter a username." onChangeText={text => setUsername(text)}
                                            initialValue="" />
                                    </View>
                                    <View style={styles.screen}>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput style={styles.input} id="password" autoCompleteType="off" label="password" keyboardType="default" secureTextEntry required autoCapitalize="none"
                                            minLength={3}
                                            errorText="Please enter a valid password." onChangeText={text => {
                                                setPassword(text)
                                            }}
                                            initialValue="" />
                                    </View>
                                    {isLoading ? <ActivityIndicator /> :
                                        <View>
                                            <Button title="Sign Up" onPress={signupHandler} />
                                            <Button title="Already have an account?" onPress={() => {
                                                setLogin(true);
                                                setSignup(false);
                                                }} />
                                        </View>
                                    }
                                </ScrollView>
                        : null
                        }

                        {!signup && login ? 
                            <ScrollView>
                                <View style={styles.screen}>
                                    <Text style={styles.label}>Username</Text>
                                        <TextInput style={styles.input} id="username" label="username" value={username} keyboardType="default" required errorText="Please enter a username." autoCompleteType="off" autoCapitalize="none" onChangeText={text => setUsername(text)}
                                    initialValue="" />
                                </View>
                                <View style={styles.screen}>
                                    <Text style={styles.label}>Password</Text>
                                        <TextInput style={styles.input} id="password" label="password" autoCapitalize="none" keyboardType="default" autoCompleteType="off" secureTextEntry required
                                    minLength={3}
                                    errorText="Please enter a  valid password." onChangeText={text => setPassword(text)}
                                        initialValue="" />
                                </View>
                                {isLoading ? <ActivityIndicator /> :
                                    <View>
                                    <Button title="Login" onPress={signupHandler}/>
                                    <Button title="Create a new account?" onPress={() => {
                                        setLogin(false);
                                        setSignup(true);
                                        }}/>
                                    </View>
                                }
                            </ScrollView> : null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = navData => {
    return {
        headerTitle: "BirdHouse",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black",
            fontFamily: 'Fred-Great',
            fontSize: 18,
        },
        // headerRight: (<Image style={{ width: 25, height: 25 }} source={require("../assets/images/birdicon.png")} />)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    input: {
        width: '90%',
        backgroundColor: "ghostwhite",
        padding: 10,
        alignSelf: 'center'
    },
    authContainer: {
        backgroundColor: 'white',
        height: '95%'
    },
    label: {
        paddingTop: 10,
        textAlign: 'center',
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
    },
    logo: {
        alignSelf: "center",
        // width: '50%',
        // height: '40%',
        flex: 1,
        resizeMode: 'contain'
    },
    inner: {
        padding: 5,
        flex: 1,
        justifyContent: 'flex-end'
    },

});

export default AuthScreen;