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
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  //   const ratingTab = [];
  // console.log(data.photos[2].url);

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
            {data.ratingValue === 1 ? (
              <View>
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
              </View>
            ) : data.ratingValue === 2 ? (
              <View style={style.starsView}>
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
              </View>
            ) : data.ratingValue === 3 ? (
              <View style={style.starsView}>
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#BCBCBC" />
                <Entypo name="star" size={28} color="#BCBCBC" />
              </View>
            ) : data.ratingValue === 4 ? (
              <View style={style.starsView}>
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#BCBCBC" />
              </View>
            ) : data.ratingValue === 5 ? (
              <View style={style.starsView}>
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
                <Entypo name="star" size={28} color="#FFB100" />
              </View>
            ) : null}
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
      <View style={style.map}>
        <Text>Ceci sera la carte</Text>
      </View>
    </ScrollView>
  );
}
