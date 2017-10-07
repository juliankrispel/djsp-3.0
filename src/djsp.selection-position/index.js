import getVisibleSelectionRect from 'draft-js/lib/getVisibleSelectionRect';

const getCursorPosition = (selection, editor) => {
    let position = getVisibleSelectionRect(window);
    if (!position) {
        position = editor.refs.editor.querySelector(`[data-block="true"][data-offset-key="${selection.getFocusKey()}-0-0"]`).getBoundingClientRect();
    }

    return position;
};

export default () => ({
  onChange: (editorState, { getEditorRef, getProps }) => {
    setTimeout(() => {
      const { onSelectionPositionChange } = getProps();

      if (!onSelectionPositionChange) {
        // TODO: consider having a setPropTypes api to set prop types dynamically for the editor
        throw new Error('The onSelectionPositionChanged prop is empty.');
      }

      const position = getCursorPosition(
        editorState.getSelection(),
        getEditorRef(),
      );

      onSelectionPositionChange(position);
    });

    return editorState;
  }
});
