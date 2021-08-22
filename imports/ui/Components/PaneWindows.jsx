import React from 'react';
import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

const StyledReflexContainer = styled(ReflexContainer)`
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ({ topLeft, topRight, bottomLeft, bottomRight }) => {
  return (
    <ReflexContainer orientation="vertical" style={{ height: '93vh' }}>
      <ReflexElement>
        <ReflexContainer orientation="horizontal">
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
        </ReflexContainer>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane" flex={0.5}>
        <ReflexContainer orientation="horizontal">
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
        </ReflexContainer>
      </ReflexElement>
    </ReflexContainer>
  );
};
