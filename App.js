import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, ActivityIndicator, Image, Alert } from 'react-native';

import { CoinBalance } from './CoinBalance';
import { CoinMarketCap } from './markets/CoinMarketCap';
import { GarlicoinAddress } from './ledgers/GarlicoinAddress';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPrice: '', balance: '', totalValue: '', priceLoading: false, addressLoading: false, key: ''};
  }

  getBalance(address) {
    let coinBalance = new CoinBalance(new GarlicoinAddress(), new CoinMarketCap());

    this.setState({priceLoading: true, addressLoading: true, currentPrice: '', balance: '', totalValue: ''});

    return coinBalance.getPrice('garlicoin')
      .then((price) => {
        this.setState({currentPrice: price, priceLoading: false});
        return coinBalance.getBalance(address)
      })
      .then((balance)=>{
        let total = balance * this.state.currentPrice;
        this.setState({totalValue: total, balance: balance, addressLoading: false});
      })
      .catch((error) => {
        this.setState({addressLoading: false, priceLoading: false});
        Alert.alert(error.message);
      });
  }



  render() {

    let pic = {uri: 'https://garlicoin.io/static/logo.040b5384.png'};

    if (this.state.priceLoading || this.state.addressLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: "column", marginTop: 30, marginHorizontal: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex:1}}>
            <Image source={pic} style={{width: 60, height: 60}}/>
          </View>
          <View style={{flex: 5}}>
            <Text style={{fontSize: 20}}>
              Current Price: {this.state.currentPrice}{"\n"}
              Garlicoins: {this.state.balance}{"\n"}
              Total address value: {this.state.totalValue}
          </Text>
          </View>
        </View>

        <View style={{flex: 6}}>
          <TextInput
            style={{height: 40, fontSize: 20}}
            placeholder="Enter your garlicoin public key"
            onChangeText={(text) => this.setState({key: text})}
          />
          <Button
            onPress={() => {this.getBalance(this.state.key);}}
            title="Get total value"
            color="#841584"
            style={{fontSize: 20}}
          />
        </View>
      </View>
    );
  }
}