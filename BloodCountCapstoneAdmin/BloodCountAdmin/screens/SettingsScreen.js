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
  WebView,
} from 'react-native';


import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  state = {
    userid: '',
    username: '',
    bloodgroup:'',
    city:'',
    dataSource: [],
};

  async componentDidMount() {
    const existingProducts = await AsyncStorage.getItem('userid');
    this.setState({
      userid : existingProducts
   });
   //this.fetcdata('','');

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
      <ScrollView style={styles.container}>
       <View style={{flex: 1, flexDirection:'column'}}>
       <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.logout()
               }>
               <Text style = {styles.submitButtonText}> Logout</Text>
            </TouchableOpacity>
  
  <WebView 
        source={{ uri: 'http://blookbank.flashcontacts.org/Home/Createcertificate' }} 
        style={{
            width: '100%',
            height: 600
        }}
        scrollEnabled={false}
        />
</View>
      </ScrollView>
    )

  }

}

SettingsScreen.navigationOptions = {
  title: 'Certificates',
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

