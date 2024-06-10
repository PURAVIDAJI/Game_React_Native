import {
  KeyboardAvoidingView,
  useWindowDimensions,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    //컨펌버튼 눌렀을 때, 숫자이고, 0,이나 -1등의 유효하지 않은 값이 아니면,
    //아래의 리스트에 추가되게 하는 로직
    const chosenNumber = parseInt(enteredNumber);
    console.log(chosenNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', '유효하지 않은 값입니다.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  }
  const marginTopDistance = height < 380 ? 30 : 100;
  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess my number</Title>
          <Card>
            <InstructionText>Enter the number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonDisplay}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;
//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    //marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },

  numberInput: {
    height: 50,
    width: 100,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisplay: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
//elevation은 안드로이드에 적용
//shadow 관련은 ios에 적용됨.
