<script setup lang="ts">
const formatted = useDateWithTime(Date.now())
// import { xml2js } from "xml2js";
// データを取得
// const cityName = 'kagoshima'
// const APIkey = 'bec7720eb6429bd39f103573d1af2894'
// const { data: weather, error } = await useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&lang=ja`)


  // useFetch用の設定
  let contents = ''
  await useFetch('http://localhost:3000/blog.xml')
    .then((response) => {
      console.log('response')
      let strXml = ''
      // console.log(response.data.value)
      if (typeof response.data.value === 'string') {
        strXml = response.data.value
      }
      const parser = new DOMParser();
      let xmlData  = parser.parseFromString(strXml, "text/xml");
      let xmlDataItems = xmlData.querySelectorAll('item')
      console.log(xmlData);
      // console.log(xmlData.querySelectorAll('item'));
      // console.log(xmlData0.querySelector('title')!.textContent);

      xmlDataItems.forEach(item => {
        contents +=
        `
          <article class="article-list__item">
            <div class="article-list__date">
              ${ item.querySelector('dc\\:date')!.textContent }
            </div>
            <h2 class="article-list__title">
              <a
                href="${ item.querySelector('link')!.textContent }"
                target="_blank"
                class="article-list__title-link"
              >
                ${ item.querySelector('title')!.textContent }
              </a>
            </h2>
            <div class="article-list__publisher">
              <p class="article-list__publisher-text">
                From <a href="${ item.querySelector('dc\\:identifier')!.textContent }"
                target="_blank"
                class="article-list__publisher-link"
                >
                  ${ item.querySelector('dc\\:publisher')!.textContent }
                </a>
              </p>
            </div>
          </article>
        `
      });
      // console.log(contents)

      // let jsonData;
      // XMLをJSONに変換するオブジェクトのインスタンスを作成
      // async: 非同期かどうか
      // explicitArray: trueの場合、常に子ノードを配列に配置。それ以外の場合、配列は複数ある場合にのみ作成
      // const parser = new xml2js.Parser({
      //   async: false,
      //   explicitArray: false,
      //   trim: true,
      // });
      // console.log(parser)
      // 変換を実行
      // data: 取得したxml
      // json: 変換結果(jsonデータ)
      // parser.parseString(response.data.value, (error, json) => {
      //   jsonData = json;
      // });
      // console.log(jsonData)
      // transformResponseの実行結果を戻す
      // return jsonData;

      // contents = response.data["rdf:RDF"].item
    })
    .catch((e) => console.error(e));
</script>

<template>
  <div class="wrapper">
    <h1 id="top">トップページ</h1>
    <p>
      <span>これは</span><span>テスト</span><span>です</span><br>
      <NuxtLink to="/blog">blogページ</NuxtLink>
    </p>
    <div>
      <!-- この`to`はNuxtLinkのパラメーターで`href`とほぼ同じ役割だが、`href`がないとスクロールされないのでちゃんと両方書く -->
      <NuxtLink to="#scroll">スクロールする</NuxtLink>
    </div>
    <p>アイコンの表示<br>
      <nuxt-icon name="chat" class="icon-chat" />
    </p>
    <!--
      ブラウザの状態によって表示が変わるところは
      client-onlyコンポーネントを使わないとwarningが表示される
    -->
    <client-only>
      <div>現在時刻の表示<br>
        {{ formatted }}</div>
      <div>
        メディアクエリの判定<br>
        大きい画面か？: {{ useMQ() }}<br>
      </div>
    </client-only>
    <div class="article-list" v-html="contents"></div>
    <!-- {{ contents }} -->
    <!-- <h1>{{ weather.name }}</h1>
    <p>{{ weather.weather[0].description }}</p>
    <p>{{ weather.main.temp }} °C</p> -->
    <div id="scroll">ようこそ　<NuxtLink to="#top">ページの先頭へ戻る</NuxtLink></div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat non rerum illum unde, error veritatis sit voluptatibus tenetur perferendis eum vero temporibus similique quaerat tempora repudiandae! Delectus porro vitae id.</p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: math.div(80,100)*100%;
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
