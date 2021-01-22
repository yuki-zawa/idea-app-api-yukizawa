import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface SubTitleProps {
  theme?: SubTitleThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum SubTitleThemes {
  INIT = 'INIT',
}

enum ModifierClassNames {
  INIT = 'init',
}


const SubTitle: React.FC<SubTitleProps> = ({theme = [], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <h2 className={["init", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .init {
            color: ${CommonStyle.Color.Text};
            font-size: ${CommonStyle.Size.SubTitle};
            padding: 0.75rem 0;
          }
        `}
      </style>
    </h2>
  );
}

export default SubTitle;