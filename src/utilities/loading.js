import React from 'react';
import Loader from 'react-loader-spinner';
import styled from '@emotion/styled/macro';

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => (
  <LoadingWrapper>
    <Loader type="ThreeDots" color="#ffde9b" height={50} width={50} />
  </LoadingWrapper>
);

export default Loading;
