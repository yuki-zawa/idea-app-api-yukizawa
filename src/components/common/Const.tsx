/* インストラクター用 請求カテゴリ */
export class Icons {

  public static readonly LESSON              = 1 // レッスン
  public static readonly LESSON_PREPARATION  = 2 // レッスン前後対応

  // 生徒あり/時間あり/コースあり/レッスンなし
  public static readonly QUESTION            = 3 // 質問対応(担当生徒)
  public static readonly CURRICULUM          = 4 // カリキュラム作成
  public static readonly LESSON_CANCEL       = 5 // レッスンキャンセル

  // 生徒なし/時間あり/コースなし/レッスンなし
  public static readonly CATCHUP             = 6  // キャッチアップ
  public static readonly CONSULTING          = 7  // コンサル相談
  public static readonly MENTORING           = 8  // メンタリング
  public static readonly QUESTION_GENERAL    = 9  // 質問対応(Q&A)
  public static readonly REQUEST             = 10 // 運営側依頼対応

  // 生徒なし/時間なし/コースなし/レッスンなし
  public static readonly TEACHING_MATERIAL   = 11 // 書籍(教材)費用
  public static readonly REFERRAL_INCENTIVE  = 12 // リファラルインセンティブ
  public static readonly OTHER               = 13 // その他
}

export class Icon {
  public static readonly icons = [
    "😆",
    "😅",
    "💦",
    "😄",
    "😱",
  ]
}