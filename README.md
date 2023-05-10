# Kenzie-Brand-Cars 💻

> API voltada cadastro e criação de anuncios de carros, onde é feita a criação de um anuncio por um cliente onde outros podem verificar as fotos do carro cadastrado, as informaçoes e outras pessoas podem fazer comentários dentro do anuncio, alem de ser possivel acessar o perfil do vendedor para entrar em contato.

* Na pasta do projeto, instale as dependências necessárias utilizando o comando:
npm install ou yarn install.

* Para testar o conteudo do backend utilizar o comando:
yarn run dev.



## TECHS E BIBLIOTECAS

|      TECHS       |     BIBLIOTECAS      |
| :--------------: | :------------------: |
|    Typescript    |       bcryptjs       |
|     Node.js      |        cors          |
|      Shell       |        dotenv        |
|     Express      |       express        |
|    PostgreSQL    |     jsonwebtoken     |
|    Nodemailer    |     ts-node-dev      |
| Class Transformer|       typeorm        |
| Reflect Metadata |        uuid          |
|  Email Validator |         yup          |
|       CORS       | express-async-errors |
|                  |         pg           |
|                  |       mailgen        |
|                  |     nodemailer       |
|                  |                      |


## ROTA USER

> **Cadastro/registro de usuário**

```
POST - /user

> envio

{
  "name": "Luis",
  "email": "luis@mail.com",
  "password": "senha1235",
  "cpf": "12345678900",
  "phone": "+55 11 12345-6789",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "description": "Desenvolvedor Web",
  "type": "buyer",
	"admin": "false",
  "address":
    {
      "street": "15 de Novembro",
      "number": 223,
      "complement": "Portao Vermelho",
      "neighborhood": "Sr do bonfim",
      "city": "Bela Vista de Minas",
      "state": "MG",
      "zipCode": "11111111"
    }
}

> retorno

{
	"name": "Luis",
	"email": "luis@mail.com",
	"cpf": "12345678900",
	"phone": "+55 11 12345-6789",
	"birthDate": "1990-01-01T00:00:00.000Z",
	"description": "Desenvolvedor Web",
	"type": "buyer",
	"admin": false,
	"address": {
		"state": "MG",
		"city": "Bela Vista de Minas",
		"neighborhood": "Sr do bonfim",
		"street": "15 de Novembro",
		"number": 223,
		"complement": "Portao Vermelho",
		"zipCode": "11111111"
	},
	"reset_token": null,
	"id": "b174bb67-729a-4bed-945b-03c754b90eab"
}

status - 201

> erro

status - 409

{

 message: "Email already exists!"

}
```

> **Atualização de usuário**

```
PATCH - /user/:id

> envio

{
  "name": "Luisssss",
  "email": "luiss@mail.com",
  "password": "senha1235",
  "cpf": "12345678900",
  "phone": "+55 11 12345-6789",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "description": "Desenvolvedor Web",
  "type": "buyer",
	"admin": "false",
  "address":
    {
      "street": "15 de Novembro",
      "number": 223,
      "complement": "Portao Vermelho",
      "neighborhood": "Sr do bonfim",
      "city": "Bela Vista de Minas",
      "state": "MG",
      "zipCode": "11111111"
    }
}

> resposta

status - 200
{
	"id": "b174bb67-729a-4bed-945b-03c754b90eab",
	"name": "Luisssss",
	"email": "luiss@mail.com",
	"reset_token": null,
	"cpf": "12345678900",
	"phone": "+55 11 12345-6789",
	"birthDate": "1990-01-01T00:00:00.000Z",
	"description": "Desenvolvedor Web",
	"type": "buyer",
	"admin": false,
	"address": {
		"state": "MG",
		"city": "Bela Vista de Minas",
		"neighborhood": "Sr do bonfim",
		"street": "15 de Novembro",
		"number": 223,
		"complement": "Portao Vermelho",
		"zipCode": "11111111"
	}
}

> erro

status - 401

{

 message: "Token invalido"

}

```

> **Deleção de usuário**

```
DELETE - /user/:id

> resposta

status - 200 

{

	"message": "User deleted"
  
}

> erro

status - 401

{

 message: "Token invalido"

}

status - 400

{

 message: "User is not active"

}

```

> **Reset password**

```

POST - /user/reset_password

> envio

{
  "email": "luis@mail.com"
}

> resposta

status - 200

{
	"message": "Token sended to your email."
}

status - 404

{
	"message": "User Not Found!"
}

--------

PATCH - /user/reset_password/:token

> envio

{
  "password": "luis@mail.com"
}

> resposta

status - 200

{ 
   "message": "Password changed sucessfully." 
}

status - 404

{
	"message": "User Not Found!"
}

```

---

## ROTA LOGIN

```
POST - /login

> envio

{
	"email": "luis@mail.com",
  "password": "senha1235"
}

> resposta

status - 200

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNzRiYjY3LTcyOWEtNGJlZC05NDViLTAzYzc1NGI5MGVhYiIsImFkbWluIjpmYWxzZSwidXNlciI6eyJpZCI6ImIxNzRiYjY3LTcyOWEtNGJlZC05NDViLTAzYzc1NGI5MGVhYiIsIm5hbWUiOiJMdWlzIiwiZW1haWwiOiJsdWlzQG1haWwuY29tIiwicmVzZXRfdG9rZW4iOm51bGwsImNwZiI6IjEyMzQ1Njc4OTAwIiwicGhvbmUiOiIrNTUgMTEgMTIzNDUtNjc4OSIsImJpcnRoRGF0ZSI6IjE5OTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImRlc2NyaXB0aW9uIjoiRGVzZW52b2x2ZWRvciBXZWIiLCJ0eXBlIjoiYnV5ZXIiLCJhZG1pbiI6ZmFsc2V9LCJpYXQiOjE2ODM3NDkyMzgsImV4cCI6MTY4Mzc1MjgzOCwic3ViIjoiYjE3NGJiNjctNzI5YS00YmVkLTk0NWItMDNjNzU0YjkwZWFiIn0.BeJxc5a7uo__A42Idf4pQaKocvPNoPg_VXRVPL0HOS0",
	"admin": false,
	"id": "b174bb67-729a-4bed-945b-03c754b90eab",
	"user": {
		"id": "b174bb67-729a-4bed-945b-03c754b90eab",
		"name": "Luis",
		"email": "luis@mail.com",
		"reset_token": null,
		"cpf": "12345678900",
		"phone": "+55 11 12345-6789",
		"birthDate": "1990-01-01T00:00:00.000Z",
		"description": "Desenvolvedor Web",
		"type": "buyer",
		"admin": false
	}
}

> erro

status - 403

{
	"message": "User or password invalid!"
}

status - 400

{
    "message": "User or password invalid!"
}

```

## ROTA ANNOUNCE

```
POST - /announce

> envio

{
  "year": 2010,
  "km": 8500,
  "price_fipe": 34000,
  "price": 44000,
  "description": "Carro",
  "image": "https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg",
  "mark": "Volkswagen",
  "model": "Passat",
  "fuel": "Gasolina",
  "color":  "Preto",
  "gallery": 
  {
    "images": 
		[
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
	}
}

> resposta

status - 201

{
	"km": 8500,
	"price_fipe": 34000,
	"price": 44000,
	"description": "Carro",
	"image": "https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg",
	"owner": {
		"id": "b174bb67-729a-4bed-945b-03c754b90eab",
		"name": "Luis",
		"email": "luis@mail.com",
		"reset_token": null,
		"cpf": "12345678900",
		"phone": "+55 11 12345-6789",
		"birthDate": "1990-01-01T00:00:00.000Z",
		"description": "Desenvolvedor Web",
		"type": "buyer",
		"admin": false
	},
	"mark": {
		"name": "Volkswagen"
	},
	"model": {
		"name": "Passat"
	},
	"fuel": {
		"type": "Gasolina"
	},
	"color": {
		"name": "Preto"
	},
	"year": {
		"year": "2010"
	},
	"gallery": {
		"images": [
			"https://example.com/image1.jpg",
			"https://example.com/image2.jpg",
			"https://example.com/image3.jpg"
		]
	},
	"withinFipe": false,
	"deletedAt": null,
	"id": 1,
	"createdAt": "2023-05-10T13:35:16.372Z",
	"updatedAt": "2023-05-10T13:35:16.372Z",
	"softDeleted": false,
	"publishedAt": true
}

> erro

status - 401

{
	"message": "Token invalido"
}

```

```
GET - /announce

retorno

status 200 - retorna todos os anuncios criados

> erro

status - 404

{
	"message": "Invalid Id"
}

```

GET - /announce/:id

```

retorno

status - 200

{
	"id": 1,
	"year": 2021,
	"km": 9500,
	"price_fipe": 34000,
	"price": 44000,
	"description": "Carro bonito",
	"image": "https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg",
	"withinFipe": false,
	"createdAt": "2023-05-08T17:13:11.805Z",
	"updatedAt": "2023-05-08T17:13:11.805Z",
	"deletedAt": null,
	"softDeleted": false,
	"publishedAt": true,
	"mark": "Volkswagen",
	"model": "Passat",
	"fuel": "Gasolina",
	"color": "Preto",
	"owner": {
		"name": "Luis",
		"email": "luis@mail.com",
		"cpf": "12345678900",
		"phone": "+55 11 12345-6789",
		"birthDate": "1990-01-01T00:00:00.000Z",
		"description": "Desenvolvedor Web",
		"type": "buyer",
		"admin": false
	},
	"comments": []
}

> erro

status - 404

{
	"message": "Invalid Id"
}

> **Atualização de anuncio**

```

PATCH - /announce/:id

```

> envio

{
  "year": 2010,
  "km": 125000,
  "price_fipe": 28500,
  "price": 28000,
  "description": "Carro legal",
  "image": "https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg",
  "mark": "Volkswagen",
  "model": "Gol",
  "fuel": "Flex",
  "color":  "Rosa",
  "gallery": 
  {
    "images": 
		[
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
	},
	"publishedAt": "true"
}

> resposta

status - 200

{
  "year": 2010,
  "km": 125000,
  "price_fipe": 28500,
  "price": 28000,
  "description": "Carro legal",
  "image": "https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg",
  "mark": "Volkswagen",
  "model": "Gol",
  "fuel": "Flex",
  "color":  "Rosa",
  "gallery": 
  {
    "images": 
		[
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
	},
	"publishedAt": "true"
}

> erro

status - 401

{

 message: "Token invalido"

}

```

> **Deleção de anuncio**

```
DELETE - /announce/:id

```

> resposta

status - 200 

{

	"message": "Announce deleted"
  
}

> erro

status - 404

{

 message: "Announce not found"

}

status - 401

{

 message: "Unauthorized"

}


```
POST - /announce/:id/comments

> envio

{
	"text":"legal",
	"id_ann":"2"
}

>retorno

status - 201 

{
	"announceId": "2",
	"text": "legal",
	"createdAt": "2023-05-08T18:05:58.652Z",
	"author": {
		"id": "6aee8eb6-9526-44c4-b273-9ac0f787aa47",
		"name": "Luis",
		"email": "luis@mail.com",
		"password": "$2a$10$3U38u5P70gRY5yUN2MuU4uRi8ddRkfBM9MI/OpdkXHGs3Dg06X6w.",
		"reset_token": null,
		"cpf": "12345678900",
		"phone": "+55 11 12345-6789",
		"birthDate": "1990-01-01T00:00:00.000Z",
		"description": "Desenvolvedor Web",
		"type": "buyer",
		"admin": false
	},
	"id": 8
}

status - 400

{
	"message": "id_ann is a required field"
}

```
GET - /announce/:id/comments

>retorno

status - 200

- anuncio completo selecionado pelo id

status - 404

{
	"message": "Announce not found"
}

```
## ROTA FILTER

```
GET - /filter

>retorno

status - 200

- lista de produtos filtrados

```
---
