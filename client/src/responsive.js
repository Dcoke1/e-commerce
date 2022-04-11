import {css} from 'styled-components'

export const mobile = (props) => {
  return css`
    @media only screen and (max-width:450px){
        ${props}
    }
    `;
};

export const mobile_lg = (props) => {
  return css`
    @media only screen and (max-width:600px){
        ${props}
    }
    `;
};

export const tablet = (props) => {
    return css`
      @media only screen and (max-width:798px){
          ${props}
      }
      `;
  };

  export const tablet_mobile = (props) => {
    return css`
      @media only screen and (min-width:798px){
          ${props}
      }
      `;
  };

  export const large = (props) => {
    return css`
      @media only screen and (max-width:1024px){
          ${props}
      }
      `;
  };

