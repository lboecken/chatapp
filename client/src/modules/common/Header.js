/** @jsxImportSource @emotion/react */
import Logo from 'modules/icons/code-break.svg';
import { css } from '@emotion/react';

function Header() {
  return (
    <div css={titleWrapper}>
      <h1 css={titleText}>ChatApp</h1>
      <img src={Logo} alt='Icon' css={titleLogo} />
    </div>
  );
}

export default Header;

const titleLogo = css`
  width: auto;
  height: 4.5rem;
  margin: auto 0;
`;

const titleWrapper = css`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
const titleText = css`
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
`;
