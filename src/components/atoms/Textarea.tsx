import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface TextareaProps {
  theme?: TextareaThemes[];
  propStyle?: {};
  handleChange: any;
  label: string;
  rows?: number;
  content: string;
  name: string;
}

export enum TextareaThemes {
  INIT     = 'INIT',
  REQUIRED = 'REQUIRED',
}

enum ModifierClassNames {
  INIT     = 'textarea-init',
  REQUIRED = 'textarea-required',
}

const Textarea: React.FC<TextareaProps> = ({ theme = [], propStyle = {}, handleChange, label, rows = 5, content, name }) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <div className={["textarea", modifierClasses].join(' ')} style={propStyle}>
      <label>{label}</label>
      <textarea onChange={handleChange} rows={rows} name={name}>{content}</textarea>
      <style jsx>
        {`
          .textarea-init{
          }
          .textarea-init textarea {
            background: ${CommonStyle.Color.White};
          }
          .textarea {
            display: block;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 0.75rem;
            max-width: 400px;
          }
          .textarea label {
            color: ${CommonStyle.Color.Text};
            font-size: ${CommonStyle.Size.Caption};
            font-weight: bold;
            text-align: left;
            display: block;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            margin: 16px 0 16px 8px;
            text-align: left;
            font-size: 14px;
          }
          .textarea textarea {
            border: 1px solid ${CommonStyle.Color.LightGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
          }
          .textarea-required label span {
            display: inline;
            color: ${CommonStyle.Color.Accent};
          }
        `}
      </style>
    </div>

  );
}

export default Textarea;