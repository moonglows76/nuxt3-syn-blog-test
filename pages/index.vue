<script setup lang="ts">
// nuxt.config.tsのruntimeConfigを読み込み
const runtimeConfig = useRuntimeConfig();
// サーバで動作するときとクライアントで動作するときでURLを変更する
const siteUrl = process.server ? runtimeConfig.serverUrl : runtimeConfig.public.localUrl;

// リアクティブな変数の定義
const blog_contents: Ref<{
  date: string;
  url: string | undefined;
  title: string | null;
  publisher?: string | null;
  identifier?: string | null;
}[]> = ref([]);

onMounted(async () => {
  // XMLの読み込み
  const blog_response = await fetch(`${siteUrl}blog.xml`);
  const blog_text = await blog_response.text();

  // 文字列をXMLとして読めるようにする
  const parser = new DOMParser();
  const dom = parser.parseFromString(blog_text, "application/xml");
  const tag = dom.querySelectorAll("item");

  // 画面表示用の配列を組み立てる
  tag.forEach((item) => {
    blog_contents.value.push({
      date: useDateWithTime(item.querySelector("date")!.textContent).value,
      url: item.querySelector("link")!.textContent?.replace("http://www.synapse.jp/blog/cgi/go.cgi?url=", ""),
      title: item.querySelector("title")!.textContent,
      publisher: item.querySelector("publisher")!.textContent,
      identifier: item.querySelector("identifier")!.textContent,
    });
  });
});
</script>

<template>
  <div class="wrapper">
    <h1 id="top">
      トップページ
    </h1>
    <AppLink />
    <p>
      <span>これは</span><span>テスト</span><span>です</span><br>
      <NuxtLink to="/blog">
        blogページ
      </NuxtLink><br>
      <NuxtLink to="/swr">
        SWRページ
      </NuxtLink><br>
      <NuxtLink to="/isr">
        ISRページ
      </NuxtLink><br>
    </p>
    <div>
      <!-- この`to`はNuxtLinkのパラメーターで`href`とほぼ同じ役割だが、`href`がないとスクロールされないのでちゃんと両方書く -->
      <NuxtLink to="#scroll">
        スクロールする
      </NuxtLink>
    </div>
    <p>
      アイコンの表示<br>
      <nuxt-icon
        name="chat"
        class="icon-chat"
      />
    </p>
    <!--
      windowオブジェクトやdocumentオブジェクトなどブラウザの機能を使うところは
      client-onlyコンポーネントで囲う
    -->
    <client-only>
      <div>
        メディアクエリの判定<br>
        大きい画面か？: {{ useMQ() }}<br>
      </div>
    </client-only>
    <p>XMLを読み込んで表示</p>
    <div class="article-list">
      <article
        v-for="content in blog_contents"
        :key="content.date"
        class="article-list__item"
      >
        <div class="article-list__date">
          {{ content.date }}
        </div>
        <h2 class="article-list__title">
          <a
            :href="content.url"
            target="_blank"
            class="article-list__title-link"
          >
            {{ content.title }}
          </a>
        </h2>
        <div
          v-if="content.publisher"
          class="article-list__publisher"
        >
          <p class="article-list__publisher-text">
            From
            <a
              v-if="content.identifier"
              :href="content.identifier"
              target="_blank"
              class="article-list__publisher-link"
            >
              {{ content.publisher }}
            </a>
            <span
              v-else
              class="article-list__publisher-link"
            >
              {{ content.publisher }}
            </span>
          </p>
        </div>
      </article>
    </div>
    <div id="scroll">
      ようこそ <NuxtLink to="#top">
        ページの先頭へ戻る
      </NuxtLink>
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
}</style>
