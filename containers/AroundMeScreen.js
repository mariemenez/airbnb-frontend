import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import style from "../style";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import maison from "../assets/maison.png";

export default function AroundMeScreen() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          setData(response.data);
          setIsLoading(false);
        } else {
          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around`
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <View style={style.activityIndicator}>
      <ActivityIndicator size="large" color="#EB5A62" />
    </View>
  ) : (
    <View>
      <View style={style.aroundMemapContainer}>
        <MapView
          style={style.aroundMeMap}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          {data.map((item) => {
            return (
              <Marker
                key={item.location[1]}
                coordinate={{
                  latitude: item.location[1],
                  longitude: item.location[0],
                }}
                title={item.title}
                description={item.description}
                onCalloutPress={() => {
                  navigation.navigate("Room", { roomId: item._id });
                }}
              >
                <Image source={maison} style={{ height: 20, width: 20 }} />
              </Marker>
            );
          })}
        </MapView>
      </View>
    </View>
  );
}
