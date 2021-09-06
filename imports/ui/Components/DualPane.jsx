import React from 'react';
import styled from 'styled-components';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

const StyledReflexContainer = styled(ReflexContainer)`
  background: #1d1d1d;
`;

export default ({ left, middle, right }) => {
  return (
    <StyledReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 48px)' }}>
      <ReflexElement flex={0.25} className="left-pane">
        <div className="pane-content">{left}</div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="middle-pane" flex={0.5}>
        <div className="pane-content">{middle}</div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane" flex={0.25}>
        <div className="pane-content">{right}</div>
      </ReflexElement>
    </StyledReflexContainer>
  );
};
