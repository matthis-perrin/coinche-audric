import styled from 'styled-components/native';

interface ModelNameProps {}

export const ModelName: React.FC<ModelNameProps> = (props) => {
  //______________ STORE & STATE ______________

  //______________ FUNCTIONS ______________
  const functionModel = (): void => {};

  //______________ HTML ______________
  return <ModelComponent></ModelComponent>;
};

ModelName.displayName = 'ModelName';

//______________ CSS ______________
const ModelComponent = styled.View``;
