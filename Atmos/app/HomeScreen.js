import React, { Component } from 'react';
import { Text, View, StyleSheet,Button,TouchableOpacity,AsyncStorage,TextInput,Image } from 'react-native';

import { Actions } from 'react-native-router-flux';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class GoldScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      open:false,
      tmp:0,
      text: 'Useless Placeholder'
    }
    this.switch = this.switch.bind(this)
  }
   componentDidMount(){
     this.timer = setInterval(()=> this.getTmp(), 1000);
     AsyncStorage.getItem("data").then((value) => {
            this.setState({"data": value});
     }).done();
   }
   // 
   /*
   /* function 
   /* @method = > GET 
   /* state   = > Tmp -> responseData.val
   /*/
   async getTmp(){
     fetch('http://192.168.1.24:3001/tmp', {method: "GET"}).then((response) => response.json()).then((responseData) =>{
      //set  TMP =>  state 
      this.setState({
        tmp: responseData.val
      })
      // alert(responseData.val);
      }).catch((error) => {
        console.error(error);
      });
   }
   // 
   /*
   /* function 
   /$ @value  = > open (state ) , Url ( API - GET )
   /* SWITCH (ON/OFF)
   /* state   = > Open 
   /*/
  switch() {
    //  Edit state  => open
    this.setState({
      counter: this.state.counter + 1,
      open: !this.state.open
    })
    // 
    let url;
    // condition
    if(this.state.open ){
      url = 'http://192.168.1.24:3001/switchOn';
    }
    if(this.state.open==false){
        url = 'http://192.168.1.24:3001/switchOff';
    }
    //  Fetch API 
    fetch(url, {method: "GET"}).catch((error) => {
          console.error(error);
    });
  }

  render() {
  return (
        <Image
        source={require('../assets/back.png')}
        style={styles.container}>
        <Text style={styles.paragraph}>
          { this.state.tmp } 
          <Text style={styles.subpar}>°c</Text>
        </Text>
        <ActionButton buttonColor="#6F45E9" onPress={() => Actions.modal()}>   
            <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton>

        <View style={{paddingVertical: 10, paddingHorizontal: 50, position: 'absolute', bottom: 150, left: 0, right: 0}}>
            <TouchableOpacity style={styles.buttonBorderWrapper} onPress={this.switch}>
                <View style={styles.buttonBorder} shadowColor={'#FFF'} shadowOffset={{width: 10, height: 10}} shadowOpacity={0.2} shadowRadius={30}>
                    <Text style={styles.buttonBorderText}>{this.state.open ? "Turn on" : "Turn off"}</Text>
                </View>
            </TouchableOpacity>
        </View>
      </Image>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    position:'absolute',
    top:220,
    fontSize: 40,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#FFF',
  },
  button:{
    width:50,
    color:'#21ba45',
    backgroundColor: '#5a3ede',
    padding:80,
  },
  buttonBorder: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',

      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderRadius: 30,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonBorderText:{
      color: '#FFF'
    },
    subpar:{
      fontSize: 20,
      fontWeight: '100',

    },

    saved: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        marginTop: 5,
    },
});


export default GoldScreen;
