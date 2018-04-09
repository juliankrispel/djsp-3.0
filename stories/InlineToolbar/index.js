import React, { Component, PureComponent } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import selectionPositionPlugin from 'djsp.selection-position';
import Button from 'djsp.button'
import Editor from 'draft-js-plugins-editor';
import Popover from 'djsp.popover';
import Utils from 'djsp.utils'
import onClickOutside from "react-onclickoutside";

const plugins = [
  selectionPositionPlugin(),
];

const LinkModal = onClickOutside(class extends PureComponent  {
  handleClickOutside = () => this.props.onClickOutside()

  handleReturn = ev => {
    console.log('yooo', ev.which)
    if (ev.which === 13) {
      this.props.onPressReturn()
    }
  }

  render() {
    return <div className="link-modal">
      <input
        type="text"
        onKeyUp={this.handleReturn}
        onChange={this.props.onChange}
        value={this.props.value}
      />
      <button onClick={this.props.onRemove}>x</button>
    </div>
  }
})


class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    selectionPosition: false,
    isLinkModalOpen: false,
    currentLink: '',
    list: [],
  };

  onSelectionPositionChange = selectionPosition => this.setState({
    selectionPosition
  })

  onChangeLinkText = ev => this.setState({
    currentLink: ev.target.value
  })

  toggleLinkModal = () => this.setState({
    isLinkModalOpen: !this.state.isLinkModalOpen
  })

  onChange = editorState => {
    this.setState({
      editorState,
    });
  }

  onSubmitLink = () => {
    this.toggleLinkModal();
    this.setState({
      editorState: Utils.createLinkAtSelection(this.state.editorState, this.state.currentLink)
      currentLink: '',
    });
  }

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
          isOpen={!this.state.editorState.getSelection().isCollapsed() && !this.state.isLinkModalOpen}
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
          <button onMouseDown={this.toggleLinkModal}>
            LINK
          </button>
        </Popover>
        <Popover
          isOpen={this.state.isLinkModalOpen}
          position={this.state.selectionPosition}
          defaultDirection="above"
        >
          <LinkModal
            onChange={this.onChangeLinkText}
            onPressReturn={this.onSubmitLink}
            onClickOutside={this.onSubmitLink}
            value={this.state.currentLink}
          />
        </Popover>
      </div>
    );
  }
}

export default App
