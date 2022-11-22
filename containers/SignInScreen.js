import axios from "axios";
import { useState } from "react";

import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import style from "../style";
import logo from "../assets/logo.png";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    if (email === "" || password === "") {
      setError("merci de remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        const userToken = response.data.token;
        // console.log(response.data.token);
        alert("vous êtes connecté");
        setToken(userToken);
      } catch (error) {
        alert("identifiant ou mot de passe incorrect");
      }
    }
  };

  return (
    <ScrollView style={style.background}>
      <View style={style.logo}>
        <Image style={style.logoSignIn} source={logo} resizeMode="contain" />
        <Text style={style.h1SignIn}>Sign in</Text>
      </View>
      <View style={style.inputBloc}>
        <TextInput
          style={style.input}
          value={email}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={style.input}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={style.buttonBloc}>
        <Text style={style.errorMessage}>{error}</Text>
        <TouchableOpacity style={style.signInButton} onPress={handlePress}>
          <Text style={style.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
