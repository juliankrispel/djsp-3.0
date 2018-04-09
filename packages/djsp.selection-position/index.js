import getVisibleSelectionRect from 'draft-js/lib/getVisibleSelectionRect';

const getCursorPosition = (selection, editor) => {
    let position = getVisibleSelectionRect(window);
    return position;
};

const onPositionChanged = ({ getEditorState, getEditorRef, getProps }) => {
  const editorState = getEditorState();
  const { onSelectionPositionChange } = getProps();

  if (!onSelectionPositionChange) {
    // TODO: consider having a setPropTypes api to set prop types dynamically for the editor
    throw new Error('The onSelectionPositionChanged prop is empty.');
  }

  setTimeout(() => {
    const position = getVisibleSelectionRect(window)
    position && onSelectionPositionChange(position);
  });
}

export default () => ({
  onChange: (editorState, context) => {
    // only fire when editor ref is defined
    if (context.getEditorRef()) onPositionChanged(context);
    return editorState;
  }
});
