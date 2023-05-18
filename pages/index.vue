<script setup lang="ts">
// XMLの読み込み
let contents = "";
const { data } = await useFetch("http://localhost:3000/blog.xml");
let strXml = "";
// データの型チェック
if (typeof data.value === "string") {
  strXml = data.value;
}
// DOMはクライアント側でのみ処理するため、process.clientで処理を切り分け
if (process.client) {
  // 文字列をXMLとして読めるようにする
  const parser = new DOMParser();
  let xmlData = parser.parseFromString(strXml, "text/xml");
  let xmlDataItems = xmlData.querySelectorAll("item");
  // 画面表示用のHTMLを組み立てる
  xmlDataItems.forEach((item) => {
    contents += `
      <article class="article-list__item">
        <div class="article-list__date">
          ${useDateWithTime(item.querySelector("date")!.textContent).value}
        </div>
        <h2 class="article-list__title">
          <a
            href="${item
              .querySelector("link")!
              .textContent?.replace(
                "http://www.synapse.jp/blog/cgi/go.cgi?url=",
                ""
              )}"
            target="_blank"
            class="article-list__title-link"
          >
            ${item.querySelector("title")!.textContent}
          </a>
        </h2>
        <div class="article-list__publisher">
          <p class="article-list__publisher-text">
            From <a href="${item.querySelector("identifier")!.textContent}"
            target="_blank"
            class="article-list__publisher-link"
            >
              ${item.querySelector("publisher")!.textContent}
            </a>
          </p>
        </div>
      </article>
    `;
  });
}
</script>

<template>
  <div class="wrapper">
    <h1 id="top">トップページ</h1>
    <AppLink />
    <p>
      <span>これは</span><span>テスト</span><span>です</span><br />
      <NuxtLink to="/blog">blogページ</NuxtLink>
    </p>
    <div>
      <!-- この`to`はNuxtLinkのパラメーターで`href`とほぼ同じ役割だが、`href`がないとスクロールされないのでちゃんと両方書く -->
      <NuxtLink to="#scroll">スクロールする</NuxtLink>
    </div>
    <p>
      アイコンの表示<br />
      <nuxt-icon name="chat" class="icon-chat" />
    </p>
    <!--
      windowオブジェクトやdocumentオブジェクトなどブラウザの機能を使うところは
      client-onlyコンポーネントで囲う
    -->
    <client-only>
      <div>
        メディアクエリの判定<br />
        大きい画面か？: {{ useMQ() }}<br />
      </div>
      <p>XMLを読み込んで表示</p>
      <div class="article-list" v-html="contents"></div>
    </client-only>
    <div id="scroll">
      ようこそ　<NuxtLink to="#top">ページの先頭へ戻る</NuxtLink>
    </div>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat non rerum
      illum unde, error veritatis sit voluptatibus tenetur perferendis eum vero
      temporibus similique quaerat tempora repudiandae! Delectus porro vitae id.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: math.div(80, 100) * 100%;
}
p {
  span {
    &:nth-child(1) {
      color: $red;
    }
    &:nth-child(2) {
      color: $blue;
    }
    &:nth-child(3) {
      color: $purple;
    }
  }
}
#scroll {
  margin-top: 1500px;
}
@include for-sp {
  p {
    span {
      &:nth-child(1) {
        color: pink;
      }
    }
  }
}
@include for-pc {
  p {
    span {
      &:nth-child(1) {
        color: skyblue;
      }
    }
  }
}
</style>
