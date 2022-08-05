import React from 'react';
import {TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import {inputBackgroundColor, primary, fontSizes} from '../lib/theme';
import {VerticalSpacing} from '../components/spacing';

export const Test: React.FC = () => {
  return (
    <StyleKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <TexteInputTest placeholder="Input1" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input2" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input3" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input4" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input5" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input6" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input7" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input8" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input9" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input10" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input11" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input12" />
          <VerticalSpacing height={50} />
          <TexteInputTest placeholder="Input13" />
        </StyledScrollView>
      </TouchableWithoutFeedback>
    </StyleKeyboardAvoidingView>
  );
};
Test.displayName = 'Test';

const StyleKeyboardAvoidingView = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${primary};
`;

const StyleInput = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  justify-content: space-around;
  background-color: ${primary};
`;

const TexteInputTest = styled.TextInput`
  font-size: ${fontSizes.large};
  text-align: center;
  height: 40;
  background-color: ${inputBackgroundColor};
`;
