import React, { Component, PureComponent } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import selectionPositionPlugin from 'djsp.selection-position';
import Button from 'djsp.button'
import Editor from 'draft-js-plugins-editor';
import Popover from 'djsp.popover';

const plugins = [
  selectionPositionPlugin(),
];


class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    selectionPosition: false,
    list: [],
  };

  onSelectionPositionChange = selectionPosition => {
    console.log('yo', selectionPosition)
    this.setState({ selectionPosition })
  }

  onChange = editorState => this.setState({
    editorState,
  });

  render() {
    return (
      <div className="App">
        <Editor
          editorState={this.state.editorState}
          selectionPosition={this.state.selectionPosition}
          plugins={plugins}
          onSelectionPositionChange={this.onSelectionPositionChange}
          onChange={this.onChange}
        />
        <Popover
          className="popover-style"
          position={this.state.selectionPosition}
          isOpen={!this.state.editorState.getSelection().isCollapsed()}
          defaultDirection="above"
        >
          <Button
            inlineStyle="BOLD"
            onChange={this.onChange}
            editorState={this.state.editorState}
          />
          <Button
            inlineStyle="ITALIC"
            onChange={this.onChange}
            editorState={this.state.editorState}
          />
          <Button
            blockType="code-block"
            onChange={this.onChange}
            editorState={this.state.editorState}
          />
        </Popover>
      </div>
    );
  }
}

export default App
