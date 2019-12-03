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

export default class EditProfileScreen extends React.Component {
  
  static navigationOptions = { header: null }
  
  state = {
    username:'',
    userid:'',
    email: '',
    password: '',
    fullname: '',
    city: '',
    address: '',
    bloodgroup: '',
    dataSource:[]
 }
 async componentDidMount() {

  const { navigation } = this.props;


  const existingProducts = await AsyncStorage.getItem('userid');

  this.setState({
    userid : existingProducts
 });
 this.focusListener = navigation.addListener('didFocus', () => {
  console.log("hh");
  this.setState({
    userid : existingProducts
 });
});
 this.fetcdata('','');
 

}
fetcdata(city,group)
{
  const LOGINurl="http://blookbank.flashcontacts.org/Home/GetUser?userid="+this.state.userid;
  console.log(LOGINurl);
  fetch(LOGINurl)
  .then((response) => response.json())
  .then((responseJson) => {
  console.log("----"+JSON.stringify(responseJson));
  this.setState({
  dataSource:responseJson,
  username:responseJson.Username,
  email: responseJson.Username,

  fullname: responseJson.FullName,
  city: responseJson.City,
  address: responseJson.Address,
  bloodgroup: responseJson.BloodGroup,
  
  });
  
  });
}
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
  const LOGINurl="http://blookbank.flashcontacts.org/Home/UpdateUser?username="+email+"&password="+pass+"&fullname="+fullname+"&city="+city+"&address="+address+"&bloodgroup="+bloodgroup+"&type=USER";
  fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
      //return responseJson.movies;
      if(responseJson!=null)
      {

       //this._storeData(responseJson.Id);

       alert("Profile has been updated");

  }
  else
  {
    alert("Error in updating");
  }
    })
    .catch((error) => {
      alert("Error in Updation");
    });

 }
 logout = async()=>
 {
   await AsyncStorage.removeItem('userid');
  
   this.props.navigation.navigate('Home', {
     itemId: '' ,
     otherParam: 'anything you want here',
   });
 }
 render() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
 

        <View style={styles.getStartedContainer}>
          

          <Text style={styles.getStartedText}>Edit Profile</Text>

          

          <Text style={styles.getStartedText}>
            Edit Your Profile
          </Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               editable={false}
               value={this.state.username}
               onChangeText = {this.handleEmail}/>
            
           

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Full Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.fullname}
               onChangeText = {this.handleFullName}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "City"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.city}
               onChangeText = {this.handleCity}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Blood Group"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.bloodgroup}
               onChangeText = {this.handleBloodGroup}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.signup(this.state.email,'',this.state.fullname,this.state.city,this.state.address,this.state.bloodgroup)
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

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.logout()
               }>
               <Text style = {styles.submitButtonText}> Logout</Text>
            </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
}
}

EditProfileScreen.navigationOptions = {
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
