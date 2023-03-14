import { View, Pressable, Text, Button } from "react-native";
import { styles } from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  interpolateColor,
  withSequence,
} from "react-native-reanimated";

/**
 * useAnimatedStyles
 * useSharedValue
 * Animated.View
 * withSpring: efeito de mola
 * withTiming: transição suave
 * Easing: elastic(n), bounce
 * interpolateColor: transição de cores
 */

/**
 * Criar elementos animados caso não esteja disponível
 * const PressableAnimated = Animated.createAnimatedComponent(Pressable);
 */

export default function App() {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  function handleScaleAnimation(value: number) {
    scale.value = withTiming(value, {
      duration: 700,
      easing: Easing.bounce,
    });
  }

  function handleTranslateXAnimation() {
    scale.value = withTiming(1.5, { duration: 3000 }, (finished) => {
      if (finished) {
        translateX.value = withSequence(
          withTiming(150),
          withTiming(-150),
          withSpring(0, undefined, (finished) => {
            if (finished) {
              scale.value = withSpring(1);
            }
          })
        );
      }
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
    backgroundColor: interpolateColor(scale.value, [1, 1.5], ["blue", "red"]),
  }));

  const pressableAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(scale.value, [1, 1.5], ["blue", "red"]),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Pressable
        onPressIn={() => handleScaleAnimation(1.5)}
        onPressOut={() => handleScaleAnimation(1)}
      >
        <Text style={styles.button}>Clique aqui</Text>
      </Pressable>
      <Button title="Animar" onPress={handleTranslateXAnimation} />
    </View>
  );
}
