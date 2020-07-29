import React from "react";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

type IconsModalProps = {
  setIcon: any,
  closeModal: any,
};

export const IconsModal: React.FC<IconsModalProps> = (props: any) => {
  return (
    <div className="container">
      <Picker
        onSelect={emoji => {
          props.setIcon(emoji.id);
          props.closeModal(false);
        }}
        i18n={{
          search: '検索',
          categories: {
            search: '検索結果',
            recent: 'よく使う絵文字',
            people: '顔 & 人',
            nature: '動物 & 自然',
            foods: '食べ物 & 飲み物',
            activity: 'アクティビティ',
            places: '旅行 & 場所',
            objects: 'オブジェクト',
            symbols: '記号',
            flags: '旗',
            custom: 'カスタム',
          },
        }}
      />
      <style jsx>{`
        .container{
          position: absolute;
          top: 100px;
          max-width: 320px;
          left: 16px;
          right: auto;
          z-index: 100;
        }
      `}</style>
    </div>

  );
}
