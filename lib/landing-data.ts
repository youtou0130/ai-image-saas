/**
 * ランディングページ用の静的データ
 * 機能説明・FAQ・ユースケース・フッターリンクなど
 */

export const SITE_NAME = "AI Image Studio";

export const NAV_SECTIONS = [
  { label: "機能", href: "#features" },
  { label: "活用例", href: "#use-cases" },
  { label: "料金", href: "#pricing" },
  { label: "よくある質問", href: "#faq" },
] as const;

export const FEATURES = [
  {
    id: "ai-generate",
    title: "AI画像生成",
    description:
      "テキストプロンプトから高品質な画像を生成。デザイン案・アイデアを即座にビジュアル化できます。",
    icon: "ImageIcon",
    highlights: ["テキストから画像生成", "複数スタイル対応", "高解像度出力"],
  },
  {
    id: "background-remove",
    title: "背景除去",
    description:
      "ワンクリックで人物・商品の背景を自動除去。切り抜き作業を短時間で完了します。",
    icon: "Scissors",
    highlights: ["1クリックで除去", "エッジの自然な処理", "バッチ処理対応"],
  },
  {
    id: "compress",
    title: "画像圧縮",
    description:
      "画質を維持したままファイルサイズを最適化。Web・SNS向けの軽量化が可能です。",
    icon: "FileImage",
    highlights: ["画質維持", "一括圧縮", "形式変換"],
  },
  {
    id: "edit",
    title: "その他編集",
    description:
      "リサイズ・フィルター・形式変換など、よく使う画像編集をブラウザ上で完結。",
    icon: "Wand2",
    highlights: ["リサイズ", "フィルター", "形式変換"],
  },
] as const;

export const USE_CASES = [
  {
    title: "デザイナー・クリエイター",
    description: "モックアップやコンセプトビジュアルの素早い作成、クライアント提案用素材の準備に。",
    icon: "Palette",
  },
  {
    title: "マーケター",
    description: "広告バナー・LP用画像の生成と最適化、A/Bテスト用素材の大量作成に。",
    icon: "TrendingUp",
  },
  {
    title: "SNS運用者",
    description: "投稿用画像の統一感ある生成、背景除去によるプロフィール・商品写真の整備に。",
    icon: "Share2",
  },
  {
    title: "個人・小規模事業者",
    description: "少ない工数でプロ品質の画像を制作。EC・名刺・チラシにそのまま使える素材に。",
    icon: "Store",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "無料枠では何ができますか？",
    answer:
      "登録後、毎月一定数のクレジットが付与されます。画像生成・背景除去・圧縮など全機能を無料でお試しいただけます。クレジットを使い切った後は有料プランへ移行いただくか、翌月の付与をお待ちください。",
  },
  {
    question: "クレジットの有効期限はありますか？",
    answer:
      "毎月付与されるクレジットは当月末日まで有効です。翌月には新しいクレジットが付与され、未使用分は繰り越されません。",
  },
  {
    question: "データの保持期間はどのくらいですか？",
    answer:
      "生成・アップロードいただいた画像は、アカウント削除または最終利用から一定期間経過後に削除されます。詳細はプライバシーポリシーをご確認ください。",
  },
  {
    question: "APIの利用制限はありますか？",
    answer:
      "Proプラン以上でAPIをご利用いただけます。レート制限と月間クレジット上限がプランごとに設定されています。Enterpriseプランでは制限のカスタマイズが可能です。",
  },
  {
    question: "解約・プラン変更はいつでもできますか？",
    answer:
      "はい。いつでもダッシュボードから解約またはプラン変更が可能です。解約後も当期満了まではご利用いただけます。",
  },
] as const;

export const FOOTER_LINKS = {
  legal: [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
  ],
  support: [
    { label: "お問い合わせ", href: "/contact" },
    { label: "ステータス", href: "/status" },
  ],
  social: [
    { label: "X (Twitter)", href: "https://twitter.com", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
  ],
} as const;

export const COMPANY = {
  name: "AI Image Studio",
  description: "生成AIで画像を制作・編集するクラウドサービス",
} as const;

export const FREE_PLAN = {
  name: "無料",
  price: "￥0",
  description: "まずはお試しに",
  features: [
    "月10クレジット付与",
    "画像生成・背景除去・圧縮",
    "コミュニティサポート",
  ],
  buttonText: "無料で始める",
  credits: 10,
} as const;
