strapi日本語インテグレーションガイド(クライアント側はreactを使用)  
  
  
# Contents

1. 前提の環境  
1. strapiをインストールする(グローバル)
1. strapi newコマンドでプロジェクトをスタートする

# links

1. https://qiita.com/eysmnje/items/d873c0a90501b318691d
  
  
## このサンプルで使用している環境
  
```
記入時点のバージョン

node -v
v10.9.0

mongo -version
v4.0.0

strapi -v
3.0.0-alpha.14
```
  
## strapiをインストールする(グローバル)

```
npm install strapi@alpha -g
```

```
strapi new <project-name>

ここでは
strapi new login-sample
```

#### 設定のサンプル ↓
  
```
ここで失敗する場合はMongoDBとの接続がうまくいかない場合

? Choose your main database: MongoDB (recommended)
? Database name: some-mongo-db
? Host: 127.0.0.1
? +srv connection: false
? Port (It will be ignored if you enable +srv): 27017
? Username: strapi-user
? Password: password
? Authentication database: some-mongo-db
? Enable SSL connection: false
```

## cd cd login-sample して、strapi start してみる
```
cd login-sample
strapi start
```
