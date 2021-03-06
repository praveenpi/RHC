import React, { Component } from 'react';
import { View, Button , Text} from 'react-native';
import styles from '../CSS/css';
import RNPickerSelect from 'react-native-picker-select';
import { observer } from 'mobx-react';
import DataStore from '../Store/DataStore';

@observer
export default class FollowUpPage extends React.Component{
  static navigationOptions = {
    title: 'Good Follow-up',
  };

  constructor(props){
    super(props);
    this.state = {FollowUp:{value:undefined,label:undefined}};
  }

  _validateInput = () =>{
    if(this.state.FollowUp.value == undefined){
      alert("Invalid input");
      return false;
    }
    return true;
  }

  _handlePress = () => {
    if(this._validateInput()){
      DataStore.updateRegFollowUp(this.state.FollowUp);
      this.props.navigation.navigate('Years');
    }
  }

  _getLabelFollowup = (val,items) => {
    if(val == 5)
      return items[0].label;
    return items[1].label;
  }
  render(){
    const items = [
      {label:'No',value:5,},
      {label:'Yes', value:0,},
    ];
    const val = (this.state.FollowUp.value == undefined)?<Text></Text>:<Text style={styles.text}>Good Follow-Up, Once in 3 Months: {this.state.FollowUp.label}</Text>;
    return(
      <View
        style={styles.container}>
          <RNPickerSelect 
            style={{...styles}}
            placeholder={{label:'Good Follow-up, Once in 3 Months',value:null}}
            items={items}
            value={this.state.FollowUp.value}
            onValueChange={(val) => this.setState({FollowUp:{value:val,label:this._getLabelFollowup(val,items)}})} />
          <Button
            style={styles.button}
            title="Next"
            onPress={() => this._handlePress()}/>
          <Text style={styles.text}>HBA1C: {DataStore.hlthParams.hba1c}</Text>
          <Text style={styles.text}>Serum Cholestrol: {DataStore.hlthParams.serchol}</Text>
          <Text style={styles.text}>Renal Involvement: {DataStore.hlthParams.reninv.label}</Text>
          <Text style={styles.text}>Smoking: {DataStore.hlthParams.smoke.label}</Text>
          <Text style={styles.text}>Duration: {DataStore.hlthParams.dur.label}</Text>
          <Text style={styles.text}>History of Coronary Artery Disease/Stroke: {DataStore.hlthParams.cordis.label}</Text>
          {val}
      </View>
    );
  }
}