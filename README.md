

Create Product
curl -d '{"name":"Test XXX", "slug":"xxx", "sku": "13333", "brand": { "id" : "1"}}' -H "Content-Type: application/json" -X POST http://localhost:3000/products




 curl http://localhost:3000/products/\?slug\=touch-p 
 
 
    "@types/sequelize": "^4.27.24",
    
    
    
    Create TODO
    curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"# Write your query or mutation here\nmutation {\n  addTodo(todoInput: { title: \"Todo 1\", description: \"This is my todo\" }) {\n    title\n    description\n    status\n  }\n}"}' --compressed
    
    Get TODO
    
    curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"{\n  getTodos {\n    title\n    description\n    status\n  }\n}"}' --compressed