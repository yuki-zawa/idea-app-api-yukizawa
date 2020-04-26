import React from 'react';
import { Link } from 'react-router-dom';
import Logotype from './../../../../src/components/images/logotype.svg'
import About01 from './../../../../src/components/images/about-01.png'
import About02 from './../../../../src/components/images/about-02.png'
import About03 from './../../../../src/components/images/about-03.png'
import Features01 from './../../../../src/components/images/features-01.png'
import Features02 from './../../../../src/components/images/features-02.png'
import Features03 from './../../../../src/components/images/features-03.png'
import Note from './../../../../src/components/images/first-view-note.svg'
import Appicon from './../../../../src/components/images/app-icon.png'
import AboutTitle from './../../../../src/components/images/about-title.svg'
import FeaturesTitle from './../../../../src/components/images/features-title.svg'
import RecommendTitle from './../../../../src/components/images/recommend-title.svg'

const body = {
    background: "#fff",
    textAlign: "center" as "center",
    display: "block",
    height: "8vh",
    lineHeight: "8vh",
    paddingLeft: "10px",
    float: "left" as "left",
    cursor: "pointer",
};

export const Introduction: React.FC = () => {
  return (
    <div>
        <link href="https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap" rel="stylesheet"></link>
        <header className="header">
            <img className="header-title-logo" src={ Logotype } alt="STOCKROOM"/>
            <div className="header-link-container">
                <p className="header-link">ログイン</p>
                <p className="header-link">会員登録</p>
            </div>
        </header>
        <section className="firstview-section">
            <div className="firstview-note">
                <img className="firstview-note_bg" src={ Note } alt=""/>
                <div className="firstview-note_content">
                    <img className="firstview-appname" src={ Logotype } alt="STOCKROOM"/>
                    <img className="firstview-appicon" src={ Appicon } alt=""/>
                    <div className="firstview-caption">
                        <p className="firstview-caption-body">あなただけの、</p><br/>
                        <p className="firstview-caption-body">ひらめきをストックする場所。</p>
                    </div>
                    <button className="firstview-btn">さっそく始める</button>
                </div>
            </div>
        </section>
        <section className="about-section">
            <div className="about-title_wrapper">
                <img className="about-title" src={ AboutTitle } alt="About"/>
            </div>
            <section className="about-subsection">
                <h2 className="about-subtitle">ひらめきをストックする<br/>メモアプリ</h2>
                <p className="about-sentence">
                    欲しい洋服、SNSのネタ、事業のアイデア…<br/>
                    STOCKROOMは様々な「ひらめき」を一ヶ所にまとめることができるメモアプリです。
                </p>
                <div className="about-img_wrapper01">
                    <img className="about-img" src={ About01 } alt=""/>
                </div>

            </section>
            <section className="about-subsection">
                <h2 className="about-subtitle">タグ機能で頭の中を<br/>整理しよう</h2>
                <p className="about-sentence">
                    ひらめきはタグ機能で整理できます。さらに、絞り込み機能でいつでも探してるひらめきを探し出すことができます。
                </p>
                <div className="about-img_wrapper02">
                    <img className="about-img" src={ About02 } alt=""/>
                </div>
            </section>
            <section className="about-subsection_last">
                <h2 className="about-subtitle">プロジェクトを超えて<br/>ひらめきを活用しよう</h2>
                <p className="about-sentence">
                    欲しい洋服、SNSのネタ、事業のアイデア…<br/>
                    STOCKROOMは様々な「ひらめき」を一ヶ所にまとめることができるメモアプリです。
                </p>
                <div className="about-img_wrapper03">
                    <img className="about-img" src={ About03 } alt=""/>
                </div>
            </section>
        </section>
        <section className="recommend-section">
            <div className="recommend-title_wrapper">
                <img className="recommend-title" src={ RecommendTitle } alt="Recommend"/>
            </div>
            <h2 className="recommend-subtitle">ホーム画面に追加する</h2>
            <p className="recommend-sentence">STOCKROOMはホーム画面に追加することでアプリのように使うことが出来ます。是非ホーム画面に追加してご利用ください！</p>
            <img className="recommend-img" src="recommend-img" alt=""/>
            <button className="recommend-img">ホーム画面に追加する方法</button>
        </section>
        <section className="features-section">
            <div className="about-title_wrapper">
                <img className="about-title" src={ AboutTitle } alt="About"/>
            </div>
            <section className="features-section">
                <img className="features-num" src="img/features-num01.png" alt="01"/>
                <h2>ひらめきをストックする</h2>
                <img className="features-img" src="img/features-img01.png" alt=""/>
                <p className="features-sentense">何かをひらめいた瞬間に、サクッと手軽にメモができます。ひらめきにはタグをつけることができ、頭の中の整理整頓に役立ちます。</p>
                <img className="features-mock-img" src="img/features-mock01.png" alt=""/>
            </section>
            <section className="features-section">
                <img className="features-num" src="img/features-num02.png" alt="02"/>
                <h2 className="features-subtitle">ひらめきをストックする</h2>
                <img className="features-img" src="img/features-img02.png" alt=""/>
                <p className="features-sentense">何かをひらめいた瞬間に、サクッと手軽にメモができます。ひらめきにはタグをつけることができ、頭の中の整理整頓に役立ちます。</p>
                <img className="features-mock-img" src="img/features-mock02.png" alt=""/>
            </section>
            <section className="features-section">
                <img className="features-num" src="img/features-num03.png" alt="03"/>
                <h2 className="features-subtitle">新しく、ひらめく</h2>
                <img className="features-img" src="img/features-img03.png" alt=""/>
                <p className="features-sentense">新しいアイデアがなかなか出てこない時、「シャッフル機能」でランダムなアイデアの組み合わせを提案。あなたの新たなひらめきをサポートします！</p>
                <img className="features-mock-img" src="img/features-mock03.png" alt=""/>
            </section>
        </section>
        <section className="demand-section">
            <h1 className="demand-title">Let's begin</h1>
            <p className="demand-sentence">
                STOCKROOMを使って、<br/>
                創作活動を充実させましょう!
            </p>
            <button className="demand-btn">
                さっそく始める
            </button>
        </section>
        <footer>
            <img src="img/fotter-logo/png" alt="STOCKROOM"/>
            <ul className="footer-menu">
                <li className="footer-option">会員登録</li>
                <li className="footer-option">ログイン</li>
                <li className="footer-option">お問い合わせ</li>
                <li className="footer-option">利用規約</li>
            </ul>
        </footer>
        <style jsx>{`
            *{
                font-family: 'Sawarabi Gothic', sans-serif;
            }
            p{
                font-size: 16px;
            }
            .header{
                background-color: white;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 8px 12px;
                border-bottom: black solid 3px;
                position: fixed;
                width: 100%;
                box-sizing: border-box;
                height: 46px;
                z-index: 1000;
            }
            .header-title-logo{
                width: 120px;
                height: auto;
            }
            .header-link-container{
                display: flex;
                margin-top: 8px;
            }
            .header-link{
                border-bottom: 3px #feb342 solid;
                margin-right: 12px;
                font-size: 14px;
                font-weight: bold;
            }
            //ファーストビュー
            .firstview-section{
                top: 46px;
                height: 460px;
                position: relative;
                background-color: #FEB342;
                margin-bottom: 100px;
            }
            .firstview-note{
                display: flex;
                flex-direction: column;
                width: 380px;
                height: auto;
                transform:rotate(-6deg);
            }
            .firstview-note_content{
                z-index: 100;
                padding: 88px 40px 0 40px;
                display: flex;
                flex-direction: column;
            }
            .firstview-note_bg{
                z-index: 1;
                width: 100%;
                height: auto;
                position: absolute;
            }
            .firstview-appname{
                width: 200px;
                height: auto;
                margin-bottom: 32px;
            }
            .firstview-appicon{
                width: 100px;
                height: auto;
                margin-bottom: 16px;
                margin-left: 8px;
            }
            .firstview-caption-body{
                line-height: 1.4em;
                border-bottom: black solid 2px;
                display: inline-block;
                margin-bottom: 16px;
            }
            .firstview-caption{
                margin-bottom: 24px;
            }
            .firstview-btn{
                background-color: #FEB342;
                width: 120px;
                height: 32px;
                font-weight: bold;
                border-radius: 4px;
                margin-right: 0;
                margin-left: auto;
            }
            //about
            .about-section{
                padding: 0 32px;
            }
            .about-title_wrapper{
                margin: 0 auto 72px auto;
                padding-left: 32px;
                text-align: center;
            }
            .about-subsection{
                margin-bottom: 80px;
            }
            .about-subtitle{
                font-size: 24px;
                line-height: 1.4em;
                font-weight: bold;
                color: #FEB342;
                margin-bottom: 20px;
            }
            .about-sentence{
                text-align: justify;
                line-height: 1.6em;
                margin-bottom: 20px;
            }
            .about-img_wrapper01{
                width: 270px;
                margin: 0 auto;
            }
            .about-img_wrapper02{
                width: 240px;
                margin: 0 auto;
            }
            .about-img_wrapper03{
                width: 260px;
                margin: 0 auto;
            }
            .about-img{
                width: 100%;
                height: auto;
            }
        `}</style>
    </div>
  );
}