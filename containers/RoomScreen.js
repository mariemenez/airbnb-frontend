import {
  Button,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../style";
import { Entypo } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView, { Marker } from "react-native-maps";

import ReadMore from "@fawazahmed/react-native-read-more";

export default function RoomScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  const [data, setData] = useState();
  const id = params.roomId;
  //   console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

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
    <ScrollView style={style.background}>
      <View>
        <SwiperFlatList
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
            <View>
              <ImageBackground
                source={{
                  uri: item.url,
                }}
                style={style.imageCarouselCard}
                resizeMode="cover"
              >
                <Text style={style.roomCardPrice}>{data.price} €</Text>
              </ImageBackground>
            </View>
          )}
        />
      </View>
      <View style={[style.roomCardBottom, style.roomDetailsPadding]}>
        <View style={style.roomInfos}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.roomTitle}>
            {data.title}
          </Text>
          <View style={style.rating}>
            <Text>{generateStars(data.ratingValue)}</Text>
            <Text style={style.reviewsText}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={style.avatar}
          resizeMode="cover"
        />
      </View>
      <ReadMore
        style={style.roomDescription}
        seeLessStyle={style.seeLessStyle}
        seeMoreStyle={style.seeMoreStyle}
        numberOfLines={3}
      >
        {data.description}
      </ReadMore>
      <View style={style.mapContainer}>
        <MapView
          style={style.roomMap}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}
