import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface InputProps {
  theme?: InputThemes[];
  propStyle?: {};
  handleChange: any;
  label: string;
  placeholder: string;
  name: string;
}

export enum InputThemes {
  INIT = 'INIT',
}

enum ModifierClassNames {
  INIT = 'input-init',
}


const Input: React.FC<InputProps> = ({ theme = [InputThemes.INIT], propStyle = {}, handleChange, label, placeholder, name }) => {
  const modifierClasses = theme?.map(data => ModifierClassNames[data]).join(' ');
  return (
    <div className={["form-container", modifierClasses].join(' ')} style={propStyle}>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
      <style jsx>{`
        .input-init{
        }
        .input-init input {
        }
        .form-container {
          display: block;
          justify-content: center;
          align-items: center;
          max-width: 400px;
          position: relative;
          padding: 0.5rem 0.75rem;
        }
    
        input {
          width: 100%;
          border: none;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
        }
      `}</style>
    </div>

  );
}

export default Input;