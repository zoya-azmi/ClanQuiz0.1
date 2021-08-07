import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,ScrollView,KeyboardAvoidingView,Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';
import firebase from "firebase";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let stories = require('./temp_stories.json');

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isModalVisible:false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("Feed");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  componentDidMount() {
    this._loadFontsAsync();
  }

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  keyExtractor = (item, index) => index.toString();
showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.clanRegister}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.clanRegisterHeader}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Admin Name"}
                maxLength={8}
                onChangeText={text => {
                  this.setState({
                    adminName: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Clan Name"}
                maxLength={8}
                onChangeText={text => {
                  this.setState({
                    clanName: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({
                    contact: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={text => {
                  this.setState({
                    emailId: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({
                    password: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Confrim Password"}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({
                    confirmPassword: text
                  });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Text style={{ color: "#ff5722" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };









  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>CLAN QUIZ</Text>
            </View>
          </View>
          {
            this.showModal()
          }

          <View style={styles.cardContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:100 }}>
              <View>
                <TextInput
                  style={styles.loginBox}
                  placeholder="abc@example.com"
                  keyboardType="email-address"
                  placeholderTextColor="#ebebeb"
                  onChangeText={(text) => {
                    this.setState({
                      emailId: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.loginBox}
                  secureTextEntry={true}
                  placeholder="enter Password"
                    placeholderTextColor="#ebebeb"
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                />

                <TouchableOpacity
                  style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                  onPress={() => {
                    this.userLogin(this.state.emailId, this.state.password);
                  }}>
                  <Text style={styles.buttonText}>Log into your clan</Text>
                </TouchableOpacity>


  <TouchableOpacity
                  style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                  onPress={() => {
                    this.setState({ isModalVisible: true})
                  }}>
                  <Text style={styles.buttonText}>Register your clan</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
  },
  cardContainer: {
    flex: 0.93,
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#ff8a65',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ff9800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
  },
});
