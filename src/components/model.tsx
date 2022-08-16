import styled from 'styled-components';

interface ModelNameProps {}

export const ModelName: React.FC<ModelNameProps> = (props) => {
  const functionModel = (): void => {};
  return <ModelComponent></ModelComponent>;
};

ModelName.displayName = 'ModelName';

const ModelComponent = styled.view``;
