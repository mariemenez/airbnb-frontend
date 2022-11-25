import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../style";
import { TextInput } from "react-native-paper";

export default function ProfileScreen() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // JE RECUPERE MON L'ID DE L'UTILISATEUR
  const getId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
  };
  getId();

  // JE RECUPERE MON LE TOKEN DE L'UTILISATEUR
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setUserToken(userToken);
  };
  getToken();

  // JE FAIS MA REQUETE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,

          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(data.token);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return isLoading ? (
    <Text>en chargement</Text>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={style.profileTop}>
        <Image
          source={{ uri: data.photo.url }}
          style={style.profilePicture}
          resizeMode="cover"
        />
        <View>
          <Text>appareil photo</Text>
          <Text>galerie</Text>
        </View>
      </View>
      <View style={style.profileMiddle}>
        <TextInput style={style.profileInput} value={data.email} />
        <TextInput style={style.profileInput} value={data.username} />
        <TextInput
          style={style.profileDescriptionInput}
          value={data.description}
        />
      </View>
      <View style={style.profileBottom}>
        <TouchableOpacity style={style.profileUpdateButton}>
          <Text style={style.profileButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.profileLogOutButton}>
          <Text style={style.profileButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
