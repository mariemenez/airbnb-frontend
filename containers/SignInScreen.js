import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import style from "../style";
import logo from "../assets/logo.png";
import { AntDesign } from "@expo/vector-icons";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const handlePress = async () => {
    if (email === "" || password === "") {
      setError("merci de remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        alert("vous êtes connecté");
        const userToken = response.data.token;
        const userId = response.data.id;
        setToken(userToken);
        setId(userId);
        console.log(response.data.id);
      } catch (error) {
        alert("identifiant ou mot de passe incorrect");
      }
    }
  };

  return (
    <ScrollView style={style.background}>
      <View style={style.logoPageSignIn}>
        <Image style={style.logoSignIn} source={logo} resizeMode="contain" />
        <Text style={style.h1SignIn}>Sign in</Text>
      </View>
      <View style={style.inputBloc}>
        <TextInput
          style={style.input}
          autoCapitalize="none"
          value={email}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <View style={style.passwordInputBloc}>
          <TextInput
            style={style.passwordInput}
            value={password}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <AntDesign
            onPress={() => {
              setsecureTextEntry(!secureTextEntry);
            }}
            name="eye"
            size={24}
            color="black"
          />
        </View>
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
