import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

// style을 prop으로 받는데, style prop은 스타일 객체뿐만 아니라 스타일 객체의 배열도 취함.
// 배열 마지막에 선언된 객체가 앞의 객체에 합쳐지는데, 동일 속성이 있을 때는, 뒤에 들어가는 style 객체의 속성이 우선시 됨.

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
