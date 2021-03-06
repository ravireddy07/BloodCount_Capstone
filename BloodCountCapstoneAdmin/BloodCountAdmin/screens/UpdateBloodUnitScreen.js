import React from 'react';
import { ScrollView, StyleSheet,AsyncStorage , FlatList,TouchableOpacity,
  ActivityIndicator, View, Text,Button,Image,TextInput,} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Linking } from 'expo';



   export default class UpdateBloodUnitScreen extends React.Component {
    state = {
      userid: '',
      username: '',
      bloodgroup:'',
      city:'',
      bloodunits:'',
      mobile:'',
      name:'',
      bankid:'',
      dataSource: [],
  };
  
    async componentDidMount() {
      const existingProducts = await AsyncStorage.getItem('userid');
      this.setState({
        userid : existingProducts
     });
    // this.fetcdata('','');
    const { navigation } = this.props;  
    const user_name = navigation.getParam('itemId', 'NO-User'); 
    this.setState({
      bankid : user_name
   });
   this.fetcdata();
  }
  fetcdata()
  {
    const LOGINurl="http://blookbank.flashcontacts.org/Home/GetBloodBanksById?id="+this.state.bankid;
    console.log(LOGINurl);
    fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("----"+JSON.stringify(responseJson));
    this.setState({
    dataSource:responseJson,
    
    
    bloodgroup:responseJson.BloodGroup,
    city:responseJson.City,
    bloodunits:responseJson.NumberOfUnits,
    mobile:responseJson.Mobile,
    name:responseJson.BloodBankName,
    bankid:responseJson.Id,
    
    });
    
    });
  }
  savedata(city,group,bloodunits,userid,mobile,name)
  {
    const LOGINurl="http://blookbank.flashcontacts.org/Home/UpdateBloodBank?id="+this.state.bankid+"&city="+city+"&bloodgroup="+group+"&nounit="+bloodunits+"&userid="+userid+"&mobile="+mobile+"&name="+name;
    console.log(LOGINurl);
    fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("----"+JSON.stringify(responseJson));
    alert("Data has been saved");
    this.props.navigation.navigate('Links', {
      itemId: '' ,
      otherParam: 'anything you want here',
  });
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
               value={this.state.city}
               onChangeText = {this.handleCity}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Blood Group"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.bloodgroup}
               onChangeText = {this.handleBloodGroup}/>


<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Mobile Numbar"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.mobile}
               onChangeText = {this.handleMobile}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Blood Bank Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.name}
               onChangeText = {this.handleName}/>

<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Total Units"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.bloodunits.toString()}
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

UpdateBloodUnitScreen.navigationOptions = {
  title: 'Update Blood Unit',
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
