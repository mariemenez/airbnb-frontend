import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import style from "../style";
import logo from "../assets/logo.png";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);

        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Entypo name="star" size={24} color="#DAA520" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={24} color="grey" key={i} />);
      }
    }

    return starsArray;
  };

  return isLoading ? (
    <View style={style.activityIndicator}>
      <ActivityIndicator size="large" color="#EB5A62" />
    </View>
  ) : (
    <View style={[style.background, style.roomDetailsPadding]}>
      {/* <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Room", { roomId: item._id });
            }}
          >
            <View style={style.roomCard}>
              <View style={style.roomCardTop}>
                <ImageBackground
                  source={{
                    uri: item.photos[0].url,
                  }}
                  style={style.imageAnnonce}
                  resizeMode="cover"
                >
                  <Text style={style.roomCardPrice}>{item.price} €</Text>
                </ImageBackground>
              </View>
              <View style={style.roomCardBottom}>
                <View style={style.roomInfos}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={style.roomTitle}
                  >
                    {item.title}
                  </Text>
                  <View style={style.rating}>
                    <Text>{generateStars(item.ratingValue)}</Text>
                    <Text style={style.reviewsText}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>

                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={style.avatar}
                  resizeMode="cover"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
