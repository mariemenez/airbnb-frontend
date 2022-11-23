import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  KeyboardAwareScrollView,
} from "react-native";
import { useState } from "react";
import style from "../style";
import axios from "axios";
import logo from "../assets/logo.png";
import { AntDesign } from "@expo/vector-icons";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const handlePress = async () => {
    if (
      email === "" ||
      password === "" ||
      description === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return setError("Merci de remplir tous les champs");
    }
    if (password !== confirmPassword) {
      return setError("Les mots de passe doivent être identiques");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        const userToken = response.data.token;
        setToken(userToken);
        alert("Votre compte a bien été créé");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <ScrollView style={style.background}>
      <View style={style.logoPageSignUp}>
        <Image style={style.logoSignIn} source={logo} resizeMode="contain" />
        <Text style={style.h1SignIn}>Sign up</Text>
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
          value={username}
          placeholder="username"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={style.input}
          value={description}
          placeholder="Describe yourself in a few words"
          onChangeText={(text) => {
            setDescription(text);
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
        <View style={style.passwordInputBloc}>
          <TextInput
            style={style.passwordInput}
            value={confirmPassword}
            placeholder="Confirm assword"
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => {
              setConfirmpassword(text);
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
          <Text style={style.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIp");
          }}
        >
          <Text>Already an account ? Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}