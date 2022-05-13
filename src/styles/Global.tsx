import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
  --background: ${(props) => props.theme.colors.background};
  --secondary: ${(props) => props.theme.colors.secondary};
  --text: ${(props) => props.theme.colors.text};
  --title: ${(props) => props.theme.colors.title}
}
`;
