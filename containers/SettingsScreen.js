import { Button, Text, View } from "react-native";
import style from "../style";

export default function SettingsScreen({ setToken }) {
  return (
    <View style={style.settingsContainer}>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
