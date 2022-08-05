import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import {spacing, inputBackgroundColor, primary} from '../lib/theme';

export const Test: React.FC = () => {
  return (
    <Wrapper>
      <TexteInputTest placeholder="Input..." />
    </Wrapper>
  );
};
Test.displayName = 'Test';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${primary};
`;

const TexteInputTest = styled.TextInput`
  height: 40;
  background-color: ${inputBackgroundColor};
`;
