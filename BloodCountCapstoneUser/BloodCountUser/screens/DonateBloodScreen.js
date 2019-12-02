import React from 'react';
import { ScrollView, StyleSheet,AsyncStorage , FlatList,TouchableOpacity,
  ActivityIndicator, View, Text,Button,Image,TextInput,} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Linking } from 'expo';
import * as SMS from 'expo-sms';



   export default class DonateBloodScreen extends React.Component {
    state = {
      userid: '',
      username: '',
      bloodgroup:'',
      city:'',
      bloodunits:'',
      mobileno:'',
      dataSource: [],
  };
  
    async componentDidMount() {
      const existingProducts = await AsyncStorage.getItem('userid');
      this.setState({
        userid : existingProducts
     });
    // this.fetcdata('','');

  }

  async savedata(city,group,units,userid,mobileno)
  {
    console.log(mobileno);
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [mobileno],
        'I wants to donate blood group '+ group +", in city "+city+", "+units
      );
    } else {
      // misfortune... there's no SMS available on this device
    }
  }
  handleCity = (text) => {
    this.setState({ city: text })
  }
  
  handleBloodGroup = (text) => {
    this.setState({ bloodgroup: text })
  }
  handleBloodUnits = (text) => {
    this.setState({ bloodunits: text })
  }
    render() {
      const { navigation } = this.props;  
      const user_name = navigation.getParam('itemId', 'NO-User');  
    return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
         
      <View style={{flex: 1, paddingTop:20}}>

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

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Message"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBloodUnits}/>

                <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.savedata(this.state.city,this.state.bloodgroup,this.state.bloodunits,this.state.userid,JSON.stringify(user_name))
               }>
               <Text style = {styles.submitButtonText}> Send Request</Text>
            </TouchableOpacity>



        

        
      </View>
    
      
    </ScrollView>
  );
      }
}

DonateBloodScreen.navigationOptions = {
  title: 'Donate Blood',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  image: {
    height:50,
    width:50,
    alignItems: 'center',
    justifyContent:'center',
   
  } ,
  btnqty:
  {
    width:50,
    margin:5,
  },
  info:
  {
    margin: 15,
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
 },
 FlatList:
 {
   margin:15,
 }

});
