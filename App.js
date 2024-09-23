import { View, StyleSheet, Button } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";

export default function App() {
  const valorInicial = useSharedValue(0);
  const OFFSET = 40;
  const TIME = 250;
  const DELAY = 450;

  const handlePress = () => {
    valorInicial.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        withTiming(0, { duration: TIME / 2 })
      )
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: valorInicial.value }],
  }));

  return (
    <>
      <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      <View style={styles.container}>
        <Button title="Shake!" onPress={handlePress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 50,
  },
});
