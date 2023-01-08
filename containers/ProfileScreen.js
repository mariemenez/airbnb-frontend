import { useRoute } from "@react-navigation/core";
import {
  View,
  Image,
  ActivityIndicator,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "../style";
import { useNavigation } from "@react-navigation/core";
import gallerie from "../assets/gallerie.png";
import photo from "../assets/photo.png";

export default function ProfileScreen({ userToken, userId, setToken, setId }) {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  // JE FAIS MA REQUETE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,

          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("non");
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={style.activityIndicator}>
      <ActivityIndicator size="large" color="#EB5A62" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={style.profileTop}>
        <Image
          source={{ uri: "https://cutt.ly/J2QJVaT" }}
          style={style.profilePicture}
          resizeMode="cover"
        />
        <View style={style.iconePicture}>
          <Image
            style={{ width: 40, height: 40 }}
            source={gallerie}
            resizeMode="contain"
          />
          <Image
            style={{ width: 40, height: 40 }}
            source={photo}
            resizeMode="contain"
          />
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
        <TouchableOpacity
          style={style.profileLogOutButton}
          onPress={() => {
            setToken(null);
            setId(null);
          }}
        >
          <Text style={style.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
