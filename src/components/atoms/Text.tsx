import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface TextProps {
  theme?: TextThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum TextThemes {
  INIT             = 'INIT',
  IDEA_CARD_TITLE  = 'IDEA_CARD_TITLE',
  IDEA_CARD_DETAIL = 'IDEA_CARD_DETAIL',
}

enum ModifierClassNames {
  INIT             = 'init',
  IDEA_CARD_TITLE  = 'idea-card-title',
  IDEA_CARD_DETAIL = 'idea-card-detail',
}


const Text: React.FC<TextProps> = ({theme = [], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <p className={["init", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .init {
            color: ${CommonStyle.Color.Text};
            white-space: pre-wrap;
            line-height: 1.5rem;
          }

          .idea-card-title {
            line-height: 18px;
            font-size: ${CommonStyle.Size.Text};
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .idea-card-detail {
            line-height: 16px;
            font-size: ${CommonStyle.Size.Caption};
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        `}
      </style>
    </p>
  );
}

export default Text;