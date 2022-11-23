import { Button, Text, View, Image, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../style";

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

  return isLoading ? (
    <View>
      <Text>en cours de chargement</Text>
    </View>
  ) : (
    <View style={style.background}>
      <View>
        <ImageBackground
          source={{
            uri: data.photos[0].url,
          }}
          style={style.roomPictures}
          resizeMode="cover"
        >
          <Text style={style.roomCardPrice}>{data.price} €</Text>
        </ImageBackground>
      </View>
      <View style={[style.roomCardBottom, style.roomDetailsPadding]}>
        <View style={style.roomInfos}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.roomTitle}>
            {data.title}
          </Text>
          <View style={style.rating}>
            <Text>stars</Text>
            <Text> 68reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={style.avatar}
          resizeMode="cover"
        />
      </View>
      <Text
        style={style.roomDescription}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {data.description}
      </Text>
      <View style={style.map}>
        <Text>Ceci sera la carte</Text>
      </View>
    </View>
  );
}
