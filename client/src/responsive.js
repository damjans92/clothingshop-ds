import { css } from "styled-components";

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 992px) {
      ${props}
    }
  `;
};

export const mobilePt = (props) => {
  return css`
    @media only screen and (max-width: 640px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};
