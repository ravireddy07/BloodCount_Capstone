import React from 'react';
import { ScrollView, StyleSheet,AsyncStorage , FlatList,TouchableOpacity,
  ActivityIndicator, View, Text,Button,Image,TextInput,} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Linking } from 'expo';



   export default class AddBloodUnitScreen extends React.Component {
    state = {
      userid: '',
      username: '',
      bloodgroup:'',
      city:'',
      bloodunits:'',
      mobile:'',
      name:'',
      dataSource: [],
  };
  
    async componentDidMount() {
      const existingProducts = await AsyncStorage.getItem('userid');
      this.setState({
        userid : existingProducts
     });
    // this.fetcdata('','');

  }

  savedata(city,group,units,userid,mobile,name)
  {
    const LOGINurl="http://blookbank.flashcontacts.org/Home/AddBloodBank?city="+city+"&bloodgroup="+group+"&nounit="+units+"&userid="+userid+"&mobile="+mobile+"&name="+name;
    console.log(LOGINurl);
    fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("----"+JSON.stringify(responseJson));
    alert("Data has been saved");
    this.setState({
    dataSource:responseJson
    
    });
    
    });
  }
  handleCity = (text) => {
    this.setState({ city: text })
  }
  
  handleBloodGroup = (text) => {
    this.setState({ bloodgroup: text })
  }
  handleMobile = (text) => {
    this.setState({ mobile: text })
  }
  
  handleName = (text) => {
    this.setState({ name: text })
  }
  handleBloodUnits = (text) => {
    this.setState({ bloodunits: text })
  }
    render() {
   
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
               placeholder = "Mobile Numbar"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleMobile}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Blood Bank Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Total Units"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBloodUnits}/>

                <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.savedata(this.state.city,this.state.bloodgroup,this.state.bloodunits,this.state.userid,this.state.mobile,this.state.name)
               }>
               <Text style = {styles.submitButtonText}> Save</Text>
            </TouchableOpacity>



        

        
      </View>
    
      
    </ScrollView>
  );
      }
}

AddBloodUnitScreen.navigationOptions = {
  title: 'Add Blood Unit',
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
