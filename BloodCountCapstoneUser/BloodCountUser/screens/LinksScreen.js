import React from 'react';
import { ScrollView, StyleSheet,AsyncStorage , FlatList,TouchableOpacity,
  ActivityIndicator, View, Text,Button,Image,TextInput,} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Linking } from 'expo';
import { withNavigation } from 'react-navigation';



   export default class LinksScreen extends React.Component {
    state = {
      userid: '',
      username: '',
      bloodgroup:'',
      city:'',
      dataSource: [],
  };
  

    async componentDidMount() {

      const { navigation } = this.props;
    

      const existingProducts = await AsyncStorage.getItem('userid');

      this.setState({
        userid : existingProducts
     });
     await AsyncStorage.getItem('userid')
     .then((result) => {
console.log(result);
     });
     this.focusListener = navigation.addListener('didFocus', () => {
      console.log("hh");
    
      this.setState({
        userid : existingProducts
     });
    });
     this.fetcdata('','');
     

  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action
      console.log("hh");
      
    }
  }
  addbloodunit =(id)=>
  {
    this.props.navigation.navigate('AddBloodUnit', {
      itemId: id ,
      otherParam: 'anything you want here',
  });
  }
  
  
  fetcdata(city,group)
  {
    const LOGINurl="http://blookbank.flashcontacts.org/Home/GetBloodBanks?city="+city+"&bloodgroup="+group;
    console.log(LOGINurl);
    fetch(LOGINurl)
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("----"+JSON.stringify(responseJson));
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
  btnbloodRequest = (id)=>
  {
    console.log(id);
    this.props.navigation.navigate('RequestBlood', {
      itemId: id ,
      otherParam: 'anything you want here',
    });
  }
  btndonateblood = (id)=>
  {
    console.log(id);
    this.props.navigation.navigate('DonateBlood', {
      itemId: id ,
      otherParam: 'anything you want here',
    });
  }
    render() {
      console.log(this.state.userid);
     
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

                <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.fetcdata(this.state.city,this.state.bloodgroup)
               }>
               <Text style = {styles.submitButtonText}> Search</Text>
            </TouchableOpacity>
          
            {/* <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addbloodunit()
               }>
               <Text style = {styles.submitButtonText}> Add Blood Unit</Text>
            </TouchableOpacity> */}
    



        <FlatList style={styles.FlatList}
          data={this.state.dataSource}
          renderItem={({item}) => {
            const imgurl ='http://qrcode.flashcontacts.org/'+item.Image;
            return (
              <View> 
                {/* <Image
              
              style={styles.image}
              source={{uri:  imgurl}}
            /> */}
                 


                <Text style={styles.info}>{item.City}   {item.NumberOfUnits}  {item.BloodGroup}
                
            
                
                </Text>
                <View style={{flexDirection: "row"}}>
                
                
                 <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.btnbloodRequest(item.Mobile)
               }>
               <Text style = {styles.submitButtonText}> Request Blood Unit</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.btndonateblood(item.Mobile)
               }>
               <Text style = {styles.submitButtonText}> Donate Blood</Text>
            </TouchableOpacity>
                </View>

          
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        
      </View>
    
      
    </ScrollView>
  );
       
      }
}

LinksScreen.navigationOptions = {
  title: 'Blood Banks',
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
