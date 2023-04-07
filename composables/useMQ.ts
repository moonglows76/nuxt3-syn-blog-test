export function useMQ() {
  // 初期値を指定
  let breakpoint = '768px'
  // ブラウザ側で動作
  if (process.client) {
    // ルート要素を取得
    const $el = document.querySelector(':root')
    // nullを除外
    if ($el != null) {
      // CSS変数からブレークポイントを取得（値がスペース込みで入ってくるためトリミングする）
      breakpoint = getComputedStyle($el).getPropertyValue("--breakpoint").trim()
    }
  }
  // useMediaQueryにブレークポイントを設定して結果を戻す
  return useMediaQuery(`(min-width: ${breakpoint})`)
}
