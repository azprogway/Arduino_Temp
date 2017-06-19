import React, { Component } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import { Constants } from 'expo';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      open:false,
      tmp:0
    }
    this.switch = this.switch.bind(this)
  }
   componentDidMount(){
  this.timer = setInterval(()=> this.getMovies(), 1000)
 }
// 
async getMovies(){

 fetch('http://192.168.1.24:3001/tmp', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) =>
  {
    //set your data 
    this.setState({
      tmp: responseData.val
    })
    // alert(responseData.val);
  })
  .catch((error) => {
      console.error(error);
  });

}
 switch() {
    this.setState({
      counter: this.state.counter + 1,
      open: !this.state.open
    })
      let url;
   if(this.state.open ){
     url = 'http://192.168.1.24:3001/switchOn';
   }
   if(this.state.open==false){
      url = 'http://192.168.1.24:3001/switchOff';
   }
  fetch(url, {method: "GET"})
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          { this.state.tmp }

        </Text>
          <Button
          onPress={this.switch}
          title={this.state.open ? "Turn on" : "Turn off"}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
