import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../style";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

export default function UpdateProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // JE FAIS MA REQUETE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/update`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <Text>la page est chargée</Text>
    </View>
  );
}
