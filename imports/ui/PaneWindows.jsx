import React from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import Editor from '@monaco-editor/react';

export default ({ topLeft, topRight, bottomLeft, bottomRight }) => {
  return (
    <ReflexContainer orientation="vertical" style={{ height: '100vh' }}>
      <ReflexElement>
        <ReflexContainer orientation="horizontal">
          <ReflexElement propagateDimensionsRate={200} propagateDimensions={true} flex={0.8}>
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

      <ReflexElement className="right-pane" flex={0.2}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement propagateDimensionsRate={200} propagateDimensions={true} flex={0.8}>
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
