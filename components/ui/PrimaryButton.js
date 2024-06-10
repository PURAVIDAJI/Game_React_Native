import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function PrimaryButton({ children, onPress }) {
  // 객체 구조분해를 이용해서 props.children이 아니라 children으로 매개변수 받아온다.
  // 들어오는 props객체에서 children 프로퍼티 추출가능

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        {/* 스타일에서 pressData를 받게 되는데, 이걸 재구조화해서 preeData의 pressed 프로퍼티를 
        매개변수로 받는데 pressed 는 버튼 누르면 true, 아니면 false가 되는 boolean 프로퍼티임.  */}
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,

    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,

    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  //text성질은 text 컴포넌트에 넣어야 함. 아니면 안됨.
});

export default PrimaryButton;
