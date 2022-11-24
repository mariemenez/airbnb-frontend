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
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude),
          setLongitude(location.coords.longitude);
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://express-airbnb-api.herokuapp.com/rooms?latitude=${latitude}&longitude=${longitude}`
            );
            setData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchData();
      } else {
        setError(true);
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
            latitude: latitude,
            longitude: longitude,
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
