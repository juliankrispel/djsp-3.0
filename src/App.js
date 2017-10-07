import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import logo from './logo.svg';
import Editor from 'draft-js-plugins-editor';
import selectionPositionPlugin from './djsp.selection-position';
import Popover from './djsp.popover';
import times from 'lodash/times';
import autocompletePlugin from './djsp.autocomplete';
import faker from 'faker';
import './App.css';

const List = ({ list }) => <ul>
  {list.map((item, index) => (
    <li key={index}>
      {item.name}
    </li>
  ))}
</ul>

const plugins = [
  selectionPositionPlugin(),
  autocompletePlugin({ trigger: '@' }),
];

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    selectionPosition: false,
    list: [],
  };

  onChange = editorState => this.setState({
    editorState,
  });

  onSelectionPositionChange = selectionPosition => this.setState({ selectionPosition })

  onAutocomplete = match => {
    if (!match) {
      this.setState({ list: [] });
    } else {
      this.setState({
        list: times(10, () => ({
          name: faker.name.findName(),
        }))
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Editor
          editorState={this.state.editorState}
          selectionPosition={this.state.selectionPosition}
          onAutocomplete={this.onAutocomplete}
          plugins={plugins}
          onSelectionPositionChange={this.onSelectionPositionChange}
          onChange={this.onChange}
        />
        <Popover
          className="popover-style"
          position={this.state.selectionPosition}
        >
          <List
            list={this.state.list}
          />
        </Popover>
      </div>
    );
  }
}

export default App;

