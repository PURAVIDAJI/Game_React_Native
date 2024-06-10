import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title';
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Entypo from '@expo/vector-icons/Entypo';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  //여기는 계속 리렌더링 되는데,
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRound, setGuessRound] = useState([initialGuess]);
  //내가 먼저 인풋값을 주는데 그걸 핸드폰이 알아맞추는 게임이다..
  //밑에 useEffect 함수는 리렌더링이 끝난 후에 사용되는데, 리렌더링에서 오류난다 (min,maxboundary로 사용하면)
  //최대 최소값을 하드코딩하자..! 하드 코딩 시 리렌더링해도 min max값이 바뀌는 일이 없으니까, 오류가 일어 나지 않고, useEffect가 실행된다.
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRound.length);
    }
  }, [currentGuess, userNumber, onGameOver]);
  //의존성을 추가해서 effect 함수를 언제 실행할 지 제어할 수 있도록 설정. 위의 3개가 변할 때 마다 effect 함수가 재실행되고 게임 종료 여부 확인함.

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  //새 게임이 시작되는 경우 변수가 재설정되어야 함.
  //이 컴포넌트가 처음 렌더링 될 때만 실행되도록 하자.

  function nextGuessHandler(direction) {
    //direction =>'lower', 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRound((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRound.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
        {/* 스타일 프로퍼티 컴포넌트에 전달하고, 새로운 스타일과 기존 스타일 병합시킴 */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Entypo name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>

          {/* 위의 함수에 들어갈 매개변수를 매칭해주기 위해서 bind를 사용하는데, 이 함수라는 뜻으로 this를 쓰고, 매개변수를 넣어줌 */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Entypo name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Entypo name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          {/* 위의 함수에 들어갈 매개변수를 매칭해주기 위해서 bind를 사용하는데, 이 함수라는 뜻으로 this를 쓰고, 매개변수를 넣어줌 */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Entypo name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* 추측된 숫자 출력*/}
      {content}
      <View style={styles.listContainer}>
        {/* {guessRound.map((guessRound) => (<Text key={guessRound}>{guessRound}</Text>))} */}
        <FlatList
          data={guessRound}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
        {/* renderItem은 개별 항목을 렌더링하는 함수를 수신함 , itemData는 객체고 그 객체에서 아이템 빼와야 함.*/}
        {/* item에 설정된 키가 따로 없으므로, 아이템이 그 자체가 숫자이고 고유하므로 key로 설정 가능 */}
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
});
