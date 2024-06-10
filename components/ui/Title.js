import { Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;
const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontsize: 24,
    //fontWeight: 'bold',
    color: Colors.accent500,
    textAlign: 'center',
    borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderColor: Colors.accent500,
    padding: 12,
    maxWidth: '80%', // 최대 80% 차지
    width: 300,
  },
});
