import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "../style";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen({ userToken, userId }) {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const navigation = useNavigation();

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
        console.log(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return isLoading ? (
    <View style={style.activityIndicator}>
      <ActivityIndicator size="large" color="#EB5A62" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={style.profileTop}>
        <Image
          source={{ uri: "https://cutt.ly/G2QPkPg" }}
          style={style.profilePicture}
          resizeMode="cover"
        />
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
          style={style.profileUpdateButton}
          onPress={() => {
            navigation.navigate("UpdateMyProfile");
          }}
        >
          <Text style={style.profileButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.profileLogOutButton}>
          <Text style={style.profileButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
