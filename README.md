

# Stock API 
Stock API is responsible of handling the Product and its related things.

# Technologies

* Node JS 14: Run time
* Express Js: Restful server
* Database: MYSQL
* sequelize: ORM functionlilty ith MYSQL
* GraphQL

# How to setup
## Pre requisites
* Install Docker/Docker Compose

## Running on Dev Mode
* First time: docker-compose up --build

Run the following curl to make sure app is started properly
```curl -X GET http://localhost:3000```
```
If there are any issues like missing dependancies, probabaly do a npm install in root directory and start the
docker compose.
```

## API Design Document
Please copy the content of stock_api_definitions.json to https://editor.swagger.io/

# Rest API Curls

### 1.0 Get All Products
```
 curl -X GET http://localhost:3000/products
 ```
### 2.0 Return a single product
#### 2.1 By ID 
```
 curl -X GET http://localhost:3000/products/<productId>
 ```
#### 2.2 By Sug

```
curl -X GET http://localhost:3000/products?slug=xxx
```
### 3.0 Create a New Product

```
curl -d '{"name":"Test XXX", "slug":"xxx", "sku": "htt2", "brand": { "id" : "1"}}' -H "Content-Type: application/json" -X POST http://localhost:3000/products
```

### 4.0 Delete a Product
```
curl -X DELETE http://localhost:3000/products/6

```

### 5.0 Update a Product
```

curl -d '{"name":"Test Product 111", "slug":"xxx", "sku": "13333", "brand": { "id" : "1"}}' -H "Content-Type: application/json" -X PUT http://localhost:3000/products/1
```
 curl http://localhost:3000/products/\?slug\=touch-p 
 
 
### 6.0 Create Multiple Product by CSV
Please note that you will have to change the file location
```
curl --location --request POST 'http://localhost:3000/products/uploads' \
--form 'file=@"/Users/eshansudharaka/Documents/Personal/sample/stock-api/product_uploads.csv"' -v
```

# GraphQL APIs
Load the ApolloServer 
`http://localhost:3000/graphql`
### 1.0 Add Product
Add following and do the execution
```
mutation {
  addProduct(productData: {  name: "My Graph 111", slug: "fff-11", sku:"22223332", brand: { id:1} }) {
    id
  }
}
```

### 2.0 Get Products
Add following and do the execution
```
{
  returnProducts {
    products {
      id,
      name,
      brand {
        name,
        id
      }
    }
  }
}
```
## How to run test case
```
npm run test
```
