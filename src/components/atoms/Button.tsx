import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  propStyle?: {};
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

export enum ButtonThemes {
  INIT     = 'INIT',
}

enum ModifierClassNames {
  INIT     = 'init',
}


const Button: React.FC<ButtonProps> = ({theme = [], children, propStyle = {}, onClick}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <button className={["init", modifierClasses].join(' ')} style={propStyle} onClick={onClick}>
      {children}
      <style jsx>
        {`
          .init {
            cursor: pointer;
            display: inline-block;
            justify-content: center;
            align-items: center;
            font-size: ${CommonStyle.Size.Text};
            color: ${CommonStyle.Color.Text};
            font-weight: bold;
            padding: 0.5rem 4rem;
          }

        `}
      </style>
    </button>
  );
}

export default Button;