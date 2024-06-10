import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const dimension = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center', //기본 중심축인 위에서 아래로 요소 배치
    alignItems: 'center', //가로축의 중심에 배치
    //alignItems의 기본값이 stretch이기에 나 확장된 버전으로 존재한다.

    marginTop: dimension < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
