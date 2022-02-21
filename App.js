import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from 'react-native';

//! importing camera.
import {RNCamera} from 'react-native-camera';

//! creating a view that will be shown for the time till the camera shows up.
//NOTE it will be called as <PendingView/> .
const PendingView = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'green', fontSize: 20}}>Opening Camera...</Text>
    </View>
  );
};
const App = () => {
  const [images, setImages] = useState(null);

  //! method for taking a picture.
  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false};
      //NOTE quality depends on the amount of compressed images we want want , 1 = N0 COMPRESSION (HIGHEST QUALITY) and 0 =COMPLETE COMPRESSION (POOREST QUALITY)
      const data = await camera.takePictureAsync(options);

      setImages(data.uri);
      //! uri :- A temporary url that generated when images is got clicked.
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <>
      <View style={styles.constainer}>
        {images ? (
          // <Text>Image is Present</Text
          <View style={styles.preview}>
            <Text style={styles.cameraText}>Your New Profile Picture.</Text>
            <Image
              style={styles.clicked}
              source={{uri: images, width: '100%', height: '80%'}}
            />

          {/* Logic for clicking the photo again. */}
          <Button
          title='Click new Image.'
          onPress={()=>{setImages(null)}}
          style={styles.clicked}
          color="#ff0066"
          ></Button>
          </View>
        ) : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera.',
              message: 'longer text to use camera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio.',
              message: 'longer text to use audio.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}>
            {({camera, status}) => {
              if (status !== 'READY') {
                return <PendingView />;
              }

              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      takePicture(camera);
                    }}
                    style={styles.captureButton}>
                    <Text style={{fontWeight: 'bold'}}>CAPTURE</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#791DDD',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#791DDD',
  },
  captureButton: {
    flex: 0,
    padding: 20,
    backgroundColor: '#D7BAF6',
    borderRadius: 17,
  },
  cameraText: {
    marginBottom: 10,
    color: '#F7EAFE',
    backgroundColor: '#D897FC',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  clicked: {
    width: 350,
    height: 350,
    marginHorizontal: 18,
    borderRadius: 180,
    
  },
});
