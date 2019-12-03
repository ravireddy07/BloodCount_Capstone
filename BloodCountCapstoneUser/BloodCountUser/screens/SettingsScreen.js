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
 
  render() {
     
    return (
      <ScrollView style={styles.container}>
       <View style={{flex: 1, flexDirection:'column'}}>
     
  
  <WebView 
        source={{ uri: 'http://blookbank.flashcontacts.org/Home/viewcertificate?id='+this.state.userid }} 
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

