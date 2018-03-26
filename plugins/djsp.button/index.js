import React, { PureComponent } from 'react';
import { RichUtils } from 'draft-js'

const buttonStyle = {
  border: 'none',
  background: 'none',
  padding: 0,
}

class Button extends PureComponent {
  onChange = (ev) => {
    ev.preventDefault()
    if (this.props.inlineStyle) {
      this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, this.props.inlineStyle))
    } else if (this.props.blockType) {
      this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, this.props.blockType))
    }
  }

  render () {
    const {
      editorState,
      blockType,
      inlineStyle,
      renderButton,
    } = this.props

    if (!inlineStyle && !blockType) {
      throw new Error('djsp.button needs either an inlineStype or a blockType prop to work')
    }

    const hasStyle = editorState.getCurrentInlineStyle().has(inlineStyle)

    return <button style={buttonStyle} onMouseDown={this.onChange}>{renderButton({
      inlineStyle,
      blockType,
      hasStyle
    })}</button>
  }
}

Button.defaultProps = {
  renderButton: ({ inlineStyle, hasStyle, blockType }) => inlineStyle || blockType
}

export default Button
