// create Database
const dbName = process.env.INDEXEDDB_ENV
const storeName = 'sample'
const transName = 'customers'

let dbVersion;
let db;
let store;

// db を開く. transaction は別途開始する.
const request = indexedDB.open(dbName, dbVersion)

/**
 * サンプルデータ
 */
const addData = [
  {
    ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" 
  },
  {
    ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" 
  },
  {
    ssn: "666-66-6666", name: "Fox", age: 30, email: "fox@home.org" 
  }
];

/**
 * 検索のインデックスを指定.
 * [
 *   {
 *     key: String, // index 名
 *     unique: Boolean // 一意であるかどうか
 *   }
 * ]
 */
const indexKeys = [
  {
    key: 'name',
    unique: false
  },
  {
    key: 'email',
    unique: true
  }
]

/**
 * db が存在しないときに db を open すると onupgradeneeded イベントが発生.
 * 現在の version よりも高い番号を指定したときもイベントが発生.
 */
request.onupgradeneeded = event => {
  db = event.target.result;
  store = db.createObjectStore(transName, { keyPath: "ssn" });

  // 検索のインデックスを追加
  indexKeys.forEach(({key, unique}) => {
    store.createIndex(key, key, { unique: unique })
  })

  store.transaction.oncomplete = () => {
    const objStore = db.transaction(transName, "readwrite").objectStore(transName)
    addData.forEach(data => {
      objStore.add(data)
    })
  }
}

// 接続に失敗した場合のイベント.
request.onerror = event => {
  console.error(event.target.result);
}

// db に接続できたらこれが発火し、 db を定義する.
request.onsuccess = event => {
  console.log(`db "${event.target.result.name}" open success`)
  db = event.target.result

  store = db.transaction([transName], "readwrite").objectStore(transName);

  addData.forEach(data => {
    store.add(data)
    request.onsuccess = event => {
      console.log(event.target.result)
    }
  })

  db.close();
}

export const add = dbName => db.transaction(dbName)
export const get = dbName => store.get(dbName)

// export const set = (key, payload) => window.localStorage.setItem(key, payload)
// export const get = key => window.localStorage.getItem(key)
// export const remove = key => window.localStorage.removeItem(key)
