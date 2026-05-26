# 相互リンク

相互リンクの追加はこのリポジトリにIssueを立てるか、下記に従ってデータを追加し、PRを送信していただけると嬉しいです。

## 追加方法

相互リンクは `/mutual_links/links.ts` に追加します。

```ts
export const mutualLinks = [
  {
    name: "Example Site",
    author: "Example",
    addedAt: "2026-05-27",
    url: "https://example.com",
    image: "/mutual_links/example.png",
  },
];
```

- `name`: サイト名
- `author`: 管理者名
- `addedAt`: 追加日`YYYY-MM-DD` 形式で記録します
- `url`: リンク先URL
- `image`: アイコン画像のパス。画像は `/public/mutual_links/` に置きます
- `image` を省略すると、`name` の一文字目がアイコン代わりに表示されます
