import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <TextLine>Tu pues 🤢🤮</TextLine>
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b1b1b;
  color: #eee;
  width: 100%;
  height: 100%;
`;

const TextLine = styled.Text`
  background-color: #ffffff22;
  margin: 2px;
  padding: 4px 8px;
`;
