# フォルダ体系と クライアント / サーバー 分類

Next.js App Router では、**`"use client"` が先頭にあるファイル = クライアント**、**それ以外 = サーバー（または共有モジュール）** です。

---

## 判定ルール

| 種別 | 条件 | 実行場所 |
|------|------|----------|
| **クライアント** | ファイル先頭に `"use client"` がある | ブラウザ |
| **サーバー** | `"use client"` がない（ページ・レイアウト・API・設定など） | サーバー |

---

## フォルダ別一覧

### `app/` — ルート・ページ・API（原則サーバー）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `app/layout.tsx` | サーバー | ルートレイアウト |
| `app/(landing)/page.tsx` | サーバー | ランディングページ |
| `app/(dashboard)/dashboard/layout.tsx` | サーバー | ダッシュボードレイアウト |
| `app/(dashboard)/dashboard/page.tsx` | サーバー | ダッシュボードトップ |
| `app/(dashboard)/dashboard/tools/[tool]/page.tsx` | サーバー | ツール動的ページ |
| `app/api/generate-image/route.ts` | サーバー | API ルート（常にサーバー） |

---

### `components/dashboard/` — ダッシュボード用コンポーネント

| ファイル | 種別 | 備考 |
|----------|------|------|
| `nav.tsx` | **クライアント** | `usePathname()` 等のフック使用 |
| `mobile-nav.tsx` | **クライアント** | モバイル用ナビ・インタラクション |
| `tools/image-generator.tsx` | **クライアント** | フォーム・状態・イベント |
| `page-container.tsx` | サーバー | ラッパー |
| `page-header.tsx` | サーバー | 見出し表示 |
| `loading-spinner.tsx` | サーバー | ローディング表示 |
| `tools/optimize.tsx` | サーバー | 静的表示 |
| `tools/remove-bg.tsx` | サーバー | 静的表示 |

---

### `components/ui/` — UI プリミティブ

**クライアント**（`"use client"` あり）:
`accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `calendar`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `direction`, `drawer`, `dropdown-menu`, `field`, `form`, `hover-card`, `input-group`, `input-otp`, `label`, `menubar`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `slider`, `sonner`, `switch`, `table`, `tabs`, `toggle`, `tooltip`, `combobox`, `toggle-group`

**サーバー**（`"use client"` なし）:
`alert`, `badge`, `breadcrumb`, `button`, `button-group`, `card`, `empty`, `input`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `skeleton`, `spinner`, `textarea`

※ UI コンポーネントはクライアントから import されるとクライアントバンドルに入ります。

---

### `config/` — 設定（サーバー・共有）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `config/nav.ts` | サーバー/共有 | ナビ項目定義 |
| `config/tools.ts` | サーバー/共有 | ツール定義・コンポーネント参照 |

---

### `lib/` — ユーティリティ（サーバー・共有）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `lib/utils.ts` | サーバー/共有 | `cn()` 等、どちらからでも利用可 |

---

### `types/` — 型定義（サーバー・共有）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `types/nav.ts` | サーバー/共有 | 型のみ |
| `types/actions.ts` | サーバー/共有 | 型のみ |

---

### `actions/` — Server Actions（サーバー）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `actions/actions.ts` | サーバー | Server Action 定義 |

---

### `hooks/` — フック（利用元がクライアントならクライアントで実行）

| ファイル | 種別 | 備考 |
|----------|------|------|
| `hooks/use-mobile.ts` | クライアントで使用 | クライアントコンポーネントから呼ばれる想定 |

---

### その他

| ファイル | 種別 |
|----------|------|
| `next.config.ts` | ビルド設定（サーバー） |
| `next-env.d.ts` | 型定義（ビルド時） |

---

## まとめ

- **クライアント**: `"use client"` があるコンポーネント（主に `components/dashboard` のナビ・画像生成、`components/ui` のインタラクティブな UI）。
- **サーバー**: `app/` のページ・レイアウト・API、`config`・`lib`・`types`・`actions`、および `"use client"` のないコンポーネント。
