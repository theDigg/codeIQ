import React from 'react';
import styled from 'styled-components';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

const StyledReflexContainer = styled(ReflexContainer)`
  background: #1d1d1d;
`;

export default ({ topLeft, topRight, bottomLeft, bottomRight }) => {
  return (
    <StyledReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 48px)' }}>
      <ReflexElement>
        <StyledReflexContainer orientation="horizontal">
          <ReflexElement propagateDimensionsRate={200} propagateDimensions={true} flex={0.5}>
            <div className="pane-content">
              {/* <label>Top Left Pane</label> */}
              {topLeft}
            </div>
          </ReflexElement>

          <ReflexSplitter />

          <ReflexElement className="bottom-pane">
            <div className="pane-content">
              {/* <label>Bottom Left Pane</label> */}
              {bottomLeft}
            </div>
          </ReflexElement>
        </StyledReflexContainer>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane" flex={0.5}>
        <StyledReflexContainer orientation="horizontal">
          <ReflexElement propagateDimensionsRate={200} propagateDimensions={true} flex={0.5}>
            <div className="pane-content">
              {/* <label> Top Right Pane </label> */}
              {topRight}
            </div>
          </ReflexElement>

          <ReflexSplitter />

          <ReflexElement className="bottom-pane">
            <div className="pane-content">
              {/* <label>Bottom Right Pane</label> */}
              {bottomRight}
            </div>
          </ReflexElement>
        </StyledReflexContainer>
      </ReflexElement>
    </StyledReflexContainer>
  );
};
