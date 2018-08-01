import React, { Component } from 'react';
import { Picker, Text, View, Button } from 'react-native';
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
        this.state = {FollowUp:undefined,
        };
    }

    _validateInput = () =>{
        if(this.state.FollowUp == undefined){
            alert("Invalid input");
            return false;
        }
        return true;
    }

    _handlePress = () => {
        if(this._validateInput()){
            DataStore.updateRegFollowUp(this.state.FollowUp);
            this.props.navigation.navigate('Display');
        }
    }

    render(){
        const items = [
            {label:'No',value:'5',},
            {label:'Yes', value:'0',},
        ];
        return(
            <View
                style={styles.container}>
                <RNPickerSelect 
                    placeholder={{
                        label:'Good Follow-up, Once in 3 Months',
                        value:null,
                        }}
                    items={items}
                    value={this.state.FollowUp}
                    onValueChange={(value) => this.setState({FollowUp:value})} />
                <Button
                    style={styles.button}
                    title="Next"
                    onPress={() => this._handlePress()}/>
            </View>
        );
    }
}