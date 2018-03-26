import React, { Component, PureComponent } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import selectionPositionPlugin from 'djsp.selection-position';
import Editor from 'draft-js-plugins-editor';
import Popover from 'djsp.popover';

const plugins = [
  selectionPositionPlugin(),
];

class InlineStyleButton extends PureComponent {
  onChange = (ev) => {
    ev.preventDefault()
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, this.props.style))
  }

  render () {
    const {
      editorState,
      style,
      renderButton,
    } = this.props

    const hasStyle = editorState.getCurrentInlineStyle().has(style)

    return renderButton({
      onPress: this.onChange,
      style,
      hasStyle
    })
  }
}

InlineStyleButton.defaultProps = {
  renderButton: ({ onPress, style, hasStyle }) => (
    <button
      onClick={onPress}
      className={hasStyle ? "active" : "non-active"}>{style}</button>
  )
}

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
          <InlineStyleButton
            style="BOLD"
            onChange={this.onChange}
            editorState={this.state.editorState}
          />

        </Popover>
      </div>
    );
  }
}

export default App
