import escapeRegExp from 'lodash/escapeRegExp';
import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

const buildRegExp = trigger => {
  if (isRegExp(trigger)) {
    return trigger;
  } else if (isString(trigger)){
    return new RegExp(String.raw({
      raw: `(?:\\s|^)(?:${escapeRegExp(trigger)})([^\\s]*)$` // eslint-disable-line no-useless-escape
    }));
  } else {
    throw new Error('trigger needs to be string, regexp or matcher method');
  }
}

const buildMatcher = trigger => {
  if (isFunction(trigger)) {
    return trigger;
  } else {
    const regexp = buildRegExp(trigger);

    return text => {
      const match = regexp.exec(text);

      if (match) {
        return match[1];
      }

      return false;
    }
  }
}

export default ({ trigger }) => {
  const matcher = buildMatcher(trigger);

  return {
    onChange: (editorState, { getProps }) => {
      const selection = editorState.getSelection();

      if (selection.isCollapsed()) {
        const { onAutocomplete } = getProps();

        const focusOffset = selection.getFocusOffset();
        const currentBlock = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getFocusKey());

        const textUntilFocus = currentBlock.getText().substr(0, focusOffset);

        onAutocomplete(matcher(textUntilFocus));
      }

      return editorState;
    }
  };
};
