import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface TitleProps {
  theme?: TitleThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum TitleThemes {
  INIT = 'INIT',
}

enum ModifierClassNames {
  INIT = 'init',
}


const Title: React.FC<TitleProps> = ({theme = [TitleThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <h1 className={["init", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .init {
            color: ${CommonStyle.Color.Text};
            font-size: ${CommonStyle.Size.Title};
            padding: 3rem;
          }
        `}
      </style>
    </h1>
  );
}

export default Title;