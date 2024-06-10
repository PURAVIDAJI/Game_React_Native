import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ roundNumbers, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GameOver</Title>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/success.png')}
            style={[styles.image, imageStyle]}
          />
        </View>
        <View>
          <Text style={styles.summaryText}>
            당신은 <Text style={styles.highlight}>{userNumber}</Text>를 추측하기 위해{' '}
            <Text style={styles.highlight}>{roundNumbers}</Text> 라운드를 진행하였습니다.
          </Text>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
        {/* Text 컴포넌트안의 Text컴포넌트는 부모 Text 컴포넌트의 영향 받게 됨.=> 상속이 아니고 이 때만 허용됨 */}
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,

    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
