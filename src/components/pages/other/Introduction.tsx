import React from 'react';
import { Link } from 'react-router-dom';
import Logotype from './../../../../src/components/images/logotype.svg'
import About01 from './../../../../src/components/images/about-01.png'
import About02 from './../../../../src/components/images/about-02.png'
import About03 from './../../../../src/components/images/about-03.png'
import FeaturesNum01 from './../../../../src/components/images/features-num01.png'
import FeaturesNum02 from './../../../../src/components/images/features-num02.png'
import FeaturesNum03 from './../../../../src/components/images/features-num03.png'
import FeaturesImg01 from './../../../../src/components/images/features-img01.png'
import FeaturesImg02 from './../../../../src/components/images/features-img02.png'
import FeaturesImg03 from './../../../../src/components/images/features-img03.png'
import FeaturesMock01 from './../../../../src/components/images/features-mock01.png'
import FeaturesMock02 from './../../../../src/components/images/features-mock02.png'
import FeaturesMock03 from './../../../../src/components/images/features-mock03.png'
import Note from './../../../../src/components/images/first-view-note.svg'
import Appicon from './../../../../src/components/images/app-icon.png'
import AboutTitle from './../../../../src/components/images/about-title.svg'
import FeaturesTitle from './../../../../src/components/images/features-title.svg'
import RecommendTitle from './../../../../src/components/images/recommend-title.svg'
import Recommend from './../../../../src/components/images/recommend.png'
import Begin from './../../../../src/components/images/begin.svg'
import PartitionTop from './../../../../src/components/images/Partition-top.svg'
import PartitionBottom from './../../../../src/components/images/Partition-bottom.svg'
import FooterLogo from './../../../../src/components/images/footer-logo.svg'

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
    <div className="body">
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
        {/* about */}
        <section className="page-section">
            <div className="page-title_wrapper">
                <img className="page-title" src={ AboutTitle } alt="About"/>
            </div>
            <section className="about-subsection">
                <h2 className="about-subtitle">ひらめきをストックする<br/>メモアプリ</h2>
                <p className="about-sentence">
                    欲しい洋服、SNSのネタ、事業のアイデア…<br/>
                    STOCKROOMは、あなたの様々な「ひらめき」を一ヶ所にまとめるメモアプリです。
                </p>
                <div className="about-img_wrapper01">
                    <img className="about-img" src={ About01 } alt=""/>
                </div>

            </section>
            <section className="about-subsection">
                <h2 className="about-subtitle">タグ機能で頭の中を<br/>整理しよう</h2>
                <p className="about-sentence">
                    ひらめきはタグ機能を使って整理できます。さらに、絞り込み機能でいつでも探してるひらめきを探し出すことができます。
                </p>
                <div className="about-img_wrapper02">
                    <img className="about-img" src={ About02 } alt=""/>
                </div>
            </section>
            <section className="about-subsection_last">
                <h2 className="about-subtitle">プロジェクトを超えて<br/>ひらめきを活用しよう</h2>
                <p className="about-sentence">
                    ひらめきを一箇所にまとめることで、プロジェクトを超えて柔軟にひらめきを活用することができます！
                </p>
                <div className="about-img_wrapper03">
                    <img className="about-img" src={ About03 } alt=""/>
                </div>
            </section>
        </section>
        {/* reccomend */}
        <section className="page-section">
            <div className="page-title_wrapper">
                <img className="page-title" src={ RecommendTitle } alt="Recommend"/>
            </div>
            <h2 className="recommend-subtitle">ホーム画面に追加する</h2>
            <p className="recommend-sentence">STOCKROOMはホーム画面に追加することでアプリのように使うことが出来ます。是非ホーム画面に追加してご利用ください！</p>
            <img className="recommend-img" src={ Recommend } alt=""/>
            <div className="recommend-btn_wrapper">
                <button className="recommend-btn">ホーム画面に追加する方法</button>
            </div>
            
        </section>  
        {/* features */}
        <section className="page-section features-section">
            <div className="page-title_wrapper">
                <img className="page-title" src={ FeaturesTitle } alt="Features"/>
            </div>
            <img className="features-partition" src={ PartitionBottom } alt=""/>
            <section className="features-subsection">
                <img className="features-num" src={ FeaturesNum01 } alt="01"/>
                <h2 className="features-subtitle">ひらめきをストックする</h2>
                <div className="features-img_wrapper01">
                    <img className="features-img" src={ FeaturesImg01 } alt=""/>
                </div>
                <p className="features-sentense">何かをひらめいた瞬間に、サクッと手軽にメモができます。ひらめきにはタグをつけることができ、頭の中の整理整頓に役立ちます。</p>
                <img className="features-mock-img" src={ FeaturesMock01 } alt=""/>
            </section>
            <img className="features-partition partition-top" src={ PartitionTop } alt=""/>
            <img className="features-partition" src={ PartitionBottom } alt=""/>
            <section className="features-subsection">
                <img className="features-num" src={ FeaturesNum02 } alt="02"/>
                <h2 className="features-subtitle">ひらめきを見返す</h2>
                <div className="features-img_wrapper02">
                    <img className="features-img" src={ FeaturesImg02 } alt=""/>
                </div>
                <p className="features-sentense">何かをひらめいた瞬間に、サクッと手軽にメモができます。ひらめきにはタグをつけることができ、頭の中の整理整頓に役立ちます。</p>
                <img className="features-mock-img" src={ FeaturesMock02 } alt=""/>
            </section>
            <img className="features-partition partition-top" src={ PartitionTop } alt=""/>
            <img className="features-partition" src={ PartitionBottom } alt=""/>
            <section className="features-subsection">
                <img className="features-num" src={ FeaturesNum03 } alt="03"/>
                <h2 className="features-subtitle">新しく、ひらめく</h2>
                <div className="features-img_wrapper03">
                    <img className="features-img" src={ FeaturesImg03 } alt=""/>
                </div>
                <p className="features-sentense">新しいアイデアがなかなか出てこない時、「シャッフル機能」でランダムなアイデアの組み合わせを提案。あなたの新たなひらめきをサポートします！</p>
                <img className="features-mock-img" src={ FeaturesMock03 } alt=""/>
            </section>
        </section>
        <img className="demand-partition" src={ PartitionTop } alt=""/>
        <section className="page-section demand-section">
            <div className="demand-title_wrapper">
                <img className="demand-title" src={ Begin } alt="begin"/>
            </div>
            <p className="demand-sentence">
                STOCKROOMを使って、<br/>
                創作活動を充実させましょう!
            </p>
            <div className="demand-btn_wrapper">
                <button className="demand-btn">
                    さっそく始める
                </button>
            </div>

        </section>
        <footer>
            <div className="footer-content">
                <img className="footer-logo" src={ FooterLogo } alt="STOCKROOM"/>
                <div className="footer-menu">
                    <ul className="footer-login">
                        <li className="footer-option">会員登録</li>
                        <li className="footer-option">ログイン</li>
                    </ul>
                    <ul className="footer-help">
                        <li className="footer-option">お問い合わせ</li>
                        <li className="footer-option">利用規約</li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright_wrapper">
                <small className="footer-copyright">&copy; 2020 STOCKROOM</small>
            </div>
            
        </footer>
        <style jsx>{`
            *{
                font-family: 'Sawarabi Gothic', sans-serif;
            }
            p{
                font-size: 16px;
                line-height: 1.6em;
            }
            .body{
                width: 100%;
                overflow-x: hidden;
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
                width: 100%;
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
                transform:rotate(-1deg);
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
                line-height: 1.4em;
                font-weight: bold;
                letter: spacing: 2em;
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

            .page-section{
                padding: 0 32px;
                margin-bottom: 120px;
            }
            .page-title_wrapper{
                margin: 0 auto 72px auto;
                padding-left: 32px;
                text-align: center;
            }

            //about
            
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

            // recommend
            .recommend-subtitle{
                font-size: 24px;
                line-height: 1.4em;
                font-weight: bold;
                color: #FEB342;
                margin-bottom: 20px;
                text-align: center;
            }
            .recommend-sentence{
                text-align: justify;
                line-height: 1.6em;
                margin-bottom: 32px;
            }
            .recommend-img{
                width: 100%;
                height: auto;
                margin-bottom: 40px;
            }
            .recommend-btn_wrapper{
                text-align:center;
            }
            .recommend-btn{
                background-color: #FEB342;
                width: 220px;
                height: 32px;
                font-weight: bold;
                border-radius: 4px;
            }

            //festures
            .features-section{
                padding: 0;
                padding-top: 64px;
                background-color: #FEB342;
                z-index: 10;
            }
            .partition-top{
                margin-bottom: 60px;
            }
            .features-partition{
                width: 100%;
                height: auto;
            }
            .features-subsection{
                padding: 0 32px;
                background-color: white;
                margin-top: -20px;
            }
            .features-num{
                width: 64px;
                height: auto;
                margin-bottom: 32px;
            }
            .features-subtitle{
                font-size: 24px;
                line-height: 1.4em;
                font-weight: bold;
                color: black;
                margin-bottom: 20px;
            }
            .features-mock-img{
                width: 100%;
                height: auto;
            }
            .features-sentense{
                text-align: justify;
                line-height: 1.6em;
                margin-bottom: 40px;
            }
            .features-img_wrapper01{
                width: 270px;
                margin: 0 auto 44px auto;
            }
            .features-img_wrapper02{
                width: 320px;
                margin: 0 auto 44px auto;
            }
            .features-img_wrapper03{
                width: 240px;
                margin: 0 auto 44px auto;
            }
            .features-img{
                width: 100%;
                height: auto;
            }

            .demand-partition{
                width: 100%;
                height: auto;
                background-color: #FEB342;
                margin-top: -30px;
                z-index: 1;
            }

            //demand
            .demand-section{
                background-color: #FEB342;
                padding: 150px 0;
                z-index: 10;
                margin-top: -30px;
                margin-bottom: 0;
            }
            .demand-title_wrapper{
                width: 220px;
                margin: 0 auto 40px auto;
            }
            .demand-title{
                width: 100%;
                height: auto;
            }
            .demand-sentence{
                text-align: center;
                font-weight: bold;
                margin-bottom: 72px;
            }
            .demand-btn{
                background-color: white;
                width: 120px;
                height: 32px;
                font-weight: bold;
                border-radius: 4px;
                
            }
            .demand-btn_wrapper{
                margin: 0 auto;
                text-align: center;
            }
            footer{
                padding: 32px 32px 44px 32px;
            }
            .footer-content{
                display: flex;
                margin-bottom: 24px;
            }
            .footer-logo{
                widthn: 64px;
                height: auto;
                margin-right: 44px;
            }
            .footer-menu{
                margin-top: 32px;
            }
            .footer-login{
                margin-bottom: 32px;
            }
            .footer-option{
                margin-bottom: 18px;
            }
            .footer-copyright_wrapper{
                text-align:center;
            }
            .footer-copyright{
                color: #333;
            }
        `}</style>
    </div>
  );
}