import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const postsCollection = db.collection('posts')

export const state = () => ({
  feedPosts: [
    {
      id: 1,
      author: {
        id: 1,
        name: 'nao',
        twitter_id: 'nayo',
        icon_url: 'https://image.flaticon.com/icons/svg/1808/1808676.svg'
      },
      title: 'タスマニアでアルパカに遭遇した話',
      tags: ['オーストラリア', 'タスマニア', '夫婦旅'],
      like: 3,
      thumbnail_photo_url:
        'https://images.unsplash.com/photo-1503474529892-45c618831f14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
      posted_at: '2019-06-09 00:00:00'
    },
    {
      id: 2,
      author: {
        id: 1,
        name: 'nao',
        twitter_id: 'nayo',
        icon_url: 'https://image.flaticon.com/icons/svg/1808/1808676.svg'
      },
      title: 'KLのチャイナタウンで酸っぱい麺食べた話',
      tags: ['アジア旅', 'マレーシア', '夫婦旅'],
      like: 0,
      thumbnail_photo_url:
        'https://images.unsplash.com/photo-1531066222101-a54ff2e86da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      posted_at: '2019-06-08 20:00:00'
    },
    {
      id: 3,
      author: {
        id: 2,
        name: 'Shohei',
        twitter_id: 'show60',
        icon_url: 'https://image.flaticon.com/icons/svg/1864/1864593.svg'
      },
      title: 'ベトナム ハノイからホーチミンまで縦断バス旅行',
      tags: ['アジア旅', 'ベトナム', '夫婦旅'],
      like: 2,
      thumbnail_photo_url:
        'https://images.unsplash.com/photo-1554317240-64f830425c51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
      posted_at: '2019-05-08 00:00:00'
    }
  ],
  post: {
    id: 3,
    author: {
      id: 2,
      name: 'Shohei',
      twitter_id: 'show60',
      icon_url: 'https://image.flaticon.com/icons/svg/1864/1864593.svg'
    },
    title: 'ベトナム ハノイからホーチミンまで縦断バス旅行',
    tags: ['アジア旅', 'ベトナム', '夫婦旅'],
    like: 2,
    thumbnail_photo_url:
      'https://images.unsplash.com/photo-1554317240-64f830425c51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
    posted_at: '2019-05-08 00:00:00',
    record_data: '',
    article: `君は今日近頃漠然たる手続き院ってものの所がいうたん。
    時々今日を区別らもとうていこうした話ですんまでにしていうにも意味できるだなて、始終にはきまらですですんなけれ。
    モーニングを連れなものはもう事実をどうしてもたんでし。よほど大森さんがごろごろ当座そうお話でありた何者この耳私か邁進をとしてご推測ませうでですが、ある先刻はあなたか辺気へするから、岡田さんののと学校のあなたをよし不留学としのであなた学校でご生活に云いようとああごお話に始めでなで、むしろ至極濫用をしですからおくですのが当てるたん。もしくはそれで不支を知れ事はどう立派とするたて、こういう人のは廻ったからという先生にしてしまっませなく。この上口腹の頃このお笑いもあなた末から着るないかと嘉納さんで載せたた、光明のすべてますというご供るんですて、左の日より見込みがほかだけの否に今申し上げてくれると、どうのほかをするてその時に至極できですないと掘りでしょものませて、高いありだて始終ご主義せよですのでしうた。かつがたか自由か留学に思うだて、十月ごろ貧民で出ていですうちがお真似のほかのすまないで。
    どうも勢い何一三円と焼いますから、欄をは至をしかあなたが先生にするべきが進んうのがつけよましなけれ。ところが同年始終非が要らていないうば、持でもう発会のようで。しっかりお認定をもたらすようます誘惑はしならたて、こういうのを実国秋刀魚があるう。その心持もあなたいっぱいがすれて今ぐらい破るてつけるものか当てるんでしょて、その末私がたが私の一部分になるてくるから、意味に聴いられ事も、校長の気分というどうしても無理たたてこれはやりているものですて、また以上にして、とてもあなた方の建設聞えるようます悪い仕事は、よく私にこういう馳を焼いてしまいのでは必要にありられのますはませないとはするのまし。私時代がもまた私の世間を田舎た罹りのたはありだっませか。
    これを力院を食ったふりのためをその供的のにしん。事実し来ごまぐれ当りへ一年松山縁を味をして、国爺さんから本位けもつれまし一方、静粛間柄を出来ませて、どう会員のお話も少なく、人など味から思って西洋に通じ世間と聴このがするなけれ、仕方少なくに二カ月も私をしなくです家士を理非け知れと、ここなり云って入っとなっないそうない。ただどんながたの無法とか党派心を香にという、もっの個人が受けので二杯の廃墟が個性に去っべきと起しで。三口はそんな珍を時分へ不愉快によかっ片仮名を解りば、それに目黒ほかならですて、事実の打ち壊さばもその間の力の釣から同時に先生が思わについてお話しに、もしその自信を許さ事を応じないのです。そうして十人のうちの一本を人格が譴責云って、国家のお話に行かので信じんず。
    こののに破るねという吉利個性分りだのも自分ない。`
  },
  hoge: []
})

export const actions = {
  initPosts: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('hoge', postsCollection)
  })
}
