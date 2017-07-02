import React, { Component } from 'react';
import { Text, View, StyleSheet,Button,TouchableOpacity,AsyncStorage,TextInput,Image } from 'react-native';

import { Router, Scene } from 'react-native-router-flux'
import { Actions } from 'react-native-router-flux';


import HomeScreen from './app/HomeScreen';
import ModalScreen from './app/ModalScreen';


class App extends React.Component {
  // constructor 
  /*
  /*
  /* @state = > open (switch ON /OFF ) , Tmp ( 36 )°C
  /*/
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      open:false,
      tmp:0,
      data:""
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

  onChange = (data) => {
   this.setState({ data });
    console.log(`\n\nData ${this.state.data} changes to  ${data} !`);
        AsyncStorage.setItem("data", data);
        this.setState({ data });
        // AsyncStorage.setItem("text", value);
        // this.setState({"text": value});
  }

   // 
   /*
   /* runder 
   /$ @Root   = > HomeScreen
   /$ @scenes = > (modal,home)
   /* SWITCH (ON/OFF)
   /* state   = > Open 
   /*/
  render() {
    const { data } = this.state;
    console.log(`parent ----------- Data is ${this.state.data}`);
    console.log(`parent --------------------Data is ${data}  ${this.props.atest}`);
  return (
    <Router>
      <Scene key="root" hideNavBar>
       <Scene
          key="home"
          component={HomeScreen}
          tmp={this.state.tmp}
          open={this.state.open}
          title="Home"
          hideNavBar
        />
        <Scene
          key="modal"
          direction="vertical"
          component={Modal}
          title="Modal"
          data={data}
          onChange={this.onChange}
          hideNavBar
        />
      </Scene>
    </Router>
  );
  }
}


class Modal extends React.Component {
  constructor(props){
     super(props);
    this.state = {
      inputValue: ''
    }
   }
    render() {
    const { data } = this.props;
    console.log(`Other >>> -----------  ${this.props.data} Data is ${this.state.inputValue}`);
    const goTohome = () => Actions.home({atest: this.state.adress}); 
    return (
        <Image
        source={require('./assets/back.png')}
        style={styles.container}>
        <Text style={styles.wel} onPress={goTohome}>Adress IP Settings </Text>
        <TextInput style={styles.buttonBorder}  placeholder={data} 
                   returnKeyLabel = {"next"}   onChangeText={inputValue => this.setState({inputValue})}
        />
        <Text style={styles.welcome} onPress={goTohome}>Black Screen</Text>
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
  wel:{
  color: '#ffffff'
  },
  welcome: {
    position: 'absolute',
    bottom: 40,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
    buttonBorder: {
    position: 'absolute',
    color: '#ffffff',
    backgroundColor:'transparent',
    width:200,
    bottom: 150,
    },
});
export default App;