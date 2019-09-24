/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
          img {
            max-width: 100%;
          }
        }
        *,
        ::before,
        ::after {
          box-sizing: inherit;
        }
        html,
        body {
          scroll-behavior: smooth;
          padding: 0;
          margin: 0;
        }
        body {
          background: #488bf4;
        }
      `}
    />
  );
};

export default GlobalStyles;
