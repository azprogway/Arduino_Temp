import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Modal extends React.Component {
  constructor(props){
     super(props);
     this.doParentToggleFromChild = this.saveData.bind(this);
   }
  doParentToggleFromChild(){	
   		this.props.saveData()
   }
    render() {
  return (
    <View style={styles.container}>
     <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.props.saveData("aa")}
        value={this.props.propsname}
      />
        {alert(this.props.propsname)}
       <Text
        style={styles.welcome}
        onPress={() => Actions.home()}
      >
        Black Screen
      </Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8200',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Modal;
