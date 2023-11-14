import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const quizData = [
  {
    question: 'Qual é a montadora mais antiga do Brasil?',
    options: ['Fiat', 'Chevrolet', 'Volkswagen', 'Ford'],
    correctAnswer: 'Fiat',
  },
  {
    question: 'Qual modelo ficou conhecido como "Fusca brasileiro"?',
    options: ['Chevette', 'Opala', 'Fusca', 'Maverick'],
    correctAnswer: 'Chevette',
  },
  {
    question: 'Em que ano foi lançado o primeiro carro flex no Brasil?',
    options: ['2000', '2001', '2002', '2003'],
    correctAnswer: '2003',
  },
  {
    question: 'Qual é o carro mais vendido da história do Brasil?',
    options: ['Fiat Uno', 'Volkswagen Gol', 'Chevrolet Onix', 'Ford Fiesta'],
    correctAnswer: 'Volkswagen Gol',
  },
];

export default function App() {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    quizCompleted: false,
  });

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[quizState.currentQuestion].correctAnswer) {
      setQuizState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    }

    if (quizState.currentQuestion < quizData.length - 1) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
      }));
    } else {
      // Fim do quiz
      setQuizState((prevState) => ({
        ...prevState,
        quizCompleted: true,
      }));
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      quizCompleted: false,
    });
  };

  return (
    <View style={styles.container}>
      {quizState.quizCompleted ? (
        <View>
          <Text style={styles.title}>Quiz finalizado!</Text>
          <Text style={styles.subtitle}>
            Sua pontuação: {quizState.score}/{quizData.length}
          </Text>
          <Button title="Reiniciar Quiz" onPress={handleRestartQuiz} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Quiz sobre Carros Brasileiros</Text>
          <Text style={styles.question}>
            {quizData[quizState.currentQuestion].question}
          </Text>
          <View style={styles.options}>
            {quizData[quizState.currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleAnswerClick(option)}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  options: {
    width: '80%',
  },
});
