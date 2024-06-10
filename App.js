import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartGameScreen from './screen/StartGameScreen';
import GameScreen from './screen/GameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screen/GameOver';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundNumbers] = useState(0);
  const [fontLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  // 불리언을 통해 AppLoading 컴포넌트 렌더링하면 글꼴이 모두 로딩될 때까지 스플래시 화면 보여줌.

  if (!fontLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setRoundNumbers(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setRoundNumbers(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundNumbers={roundsNumber}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <StatusBar style="light">
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMethod="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </StatusBar>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

// Index.tsx는 리액트 네이티브가 가장 먼저 로딩하는 파일이기에
// Index.tsx가 내보낸 컴포넌트가 주요 랜더링 컴포넌트가 된다.

//View는 콘텐츠가 들어갈 만큼의 공간만 차지함. => <StartGameScreen>을 차지하는 영역에만 적용됨.
//이것을 해결하기 위해서는 flex:1 적용해주면 됨
