import { css } from '@emotion/core';
import { bps as breakpoints } from './breakpoints';

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label] - 1}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default {
  media
};
