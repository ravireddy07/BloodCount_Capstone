import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';


import { MonoText } from '../components/StyledText';

export default class SignUpScreen extends React.Component {
  
  static navigationOptions = { header: null }
  
  state = {
    email: '',
    password: '',
    fullname: '',
    city: '',
    address: '',
    bloodgroup: '',
 }
 _storeData = async (id) => {
  try {
    await AsyncStorage.setItem('userid', JSON.stringify(id));
  } catch (error) {
    // Error saving data
  }
};
_getData = async () => {
  try {
    const existingProducts =await AsyncStorage.getItem('userid');
    console.log(existingProducts);
  } catch (error) {
    // Error saving data
  }
};
 handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }
 handleFullName = (text) => {
  this.setState({ fullname: text })
}
handleCity = (text) => {
  this.setState({ city: text })
}
handleAddress = (text) => {
  this.setState({ address: text })
}
handleBloodGroup = (text) => {
  this.setState({ bloodgroup: text })
}

 back =()=>
 {
  this.props.navigation.navigate('Home', {
    itemId: "" ,
    otherParam: 'anything you want here',
});
 }

 signup = (email, pass,fullname,city,address,bloodgroup) => {
  const LOGINurl="http://blookbank.flashcontacts.org/Home/AddUser?username="+email+"&password="+pass+"&fullname="+fullname+"&city="+city+"&address="+address+"&bloodgroup="+bloodgroup+"&type=ADMIN";
  fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
      //return responseJson.movies;
      if(responseJson!=null)
      {
        //alert(responseJson.Id);
       // setValue(responseJson.Id);
       this._storeData(responseJson.Id);
       //AsyncStorage.setItem('userid', JSON.stringify(responseJson.Id));
     
      //this._getData();

       //console.log(AsyncStorage.getItem('userid'));
       

      this.props.navigation.navigate('Home', {
        itemId: responseJson.Id ,
        otherParam: 'anything you want here',
    });
  }
  else
  {
    alert("Wrong Username or Password");
  }
    })
    .catch((error) => {
      alert("Wrong Username or Password");
    });

 }
 render() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
 

        <View style={styles.getStartedContainer}>
          

          <Text style={styles.getStartedText}>Admin SignUp</Text>

          

          <Text style={styles.getStartedText}>
            Create your Blood Count App Account for Admin
          </Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Full Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleFullName}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "City"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleCity}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Blood Group"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBloodGroup}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.signup(this.state.email, this.state.password,this.state.fullname,this.state.city,this.state.address,this.state.bloodgroup)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.back()
               }>
               <Text style = {styles.submitButtonText}> Back To Login </Text>
            </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
}
}

SignUpScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 23
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

 input: {
    margin: 15,
    padding: 10,
    height: 40,
    width:300,
    borderColor: '#8a0303',
    borderWidth: 1
 },
 submitButton: {
    backgroundColor: '#8a0303',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
    color: 'white'
 }
});
