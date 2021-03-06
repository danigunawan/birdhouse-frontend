import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const TakePicture = props => {
    const [selectedImage, setSelectedImage] = useState();
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert("Please grant permissions to provide an image.");
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync();
        setSelectedImage(image.uri)
        props.onImageSelected(image.uri)
    }

    return (
        <View style={styles.imageTaker}>
            <Button style={styles.center} title="Take a Picture!" onPress={takeImageHandler} />
            {!!selectedImage ?
            <View style={styles.imagePreview}>
                <Image style={styles.image} source={{ uri: selectedImage }} /> 
            </View> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'cover'
    },
    center: {
        alignSelf: 'center'
    },
    imageTaker: {
        justifyContent: 'center',
        alignItems: "center",
    },
})

export default TakePicture;