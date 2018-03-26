import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SimpleMentionsEditor from './SimpleMentionsEditor';
import InlineToolbar from './InlineToolbar';

storiesOf('Mentions Editor', module)
  .add('A simple mentions editor', () => <SimpleMentionsEditor />)
  .add('A simple inline toolbar editor', () => <InlineToolbar />)
