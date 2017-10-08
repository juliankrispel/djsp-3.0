import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SimpleMentionsEditor from './SimpleMentionsEditor';

storiesOf('Mentions Editor', module)
  .add('A simple mentions editor', () => <SimpleMentionsEditor />)
