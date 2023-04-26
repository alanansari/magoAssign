# Shortify

### EC2 hosted server base url: [http://65.2.180.248:8080](http://65.2.180.248:8080)
 
test get request api: [http://65.2.180.248:8080/api/test](http://65.2.180.248:8080/api/test)

should display: {"success":true,"msg":"Welcome to Shortify!"}

### Features
- Authentication APIs: Sign-in, Sign-up, Sign-out. Usage of JSON Web Tokens
- Authorization: Protected routes for access to resources.
- Error Handling: Anything breaks: the errors should be carefully handled
- Rate Limiting: A user will only be allowed to create a maximum of 10 short URLs per hour
- Deploy the server on AWS EC2 (use t2.micro - the free instance type)


## RUNNING THE SERVER


1. Clone the repository:

```CMD
git clone https://github.com/alanansari/magoAssign.git
```
To run the server, you need to have NodeJS installed on your machine. If you don't have it installed, you can follow the instructions [here](https://nodejs.org/en//) to install it.



2. Install the dependencies: 

```CMD
npm install
```


4. Setup .env file in base directory:

```
PORT = "8080"
DB_URI = ""
// base url of hosted server
BASE = "http://localhost:8080"

JWT_KEY = ""

// for nodemailer otp mail
MAIL_ID = ""
MAIL_PASS = ""

```


5. Run the backend server on localhost:

```CMD
node index.js
```

## API Endpoints

### Login: POST request
```url
<base>/api/login
```
```
// Example JSON request body:
{
    "email":"example@gmail.com",
    "password":"Password@1234"
}
```
### Send Otp in mail for signup : POST request
```url
<base>/api/email
```
```
// Example JSON request body:
{
    "email":"example@gmail.com"
}
```
### Otp verification + Signup : POST request
```url
<base>/api/signup
```
```
// Example JSON request body:
    valid email and 8 digit password with 1 Caps, number & special character each

{
    "email":"example@gmail.com",
    "otp":"123456",
    "name":"alan",
    "password":"Password@1234"
}
```
### Generate short url : POST request
```url
<base>/short
```
```
// Example JSON request body:
{
    "originalUrl":"https://www.youtube.com/watch?v=shW9i6k8cB0"
}
```
```
// Example JSON response body:
{
    "success": true,
    "msg": "Created short url",
    "url": "http://65.2.180.248:8080/Yv6ObA1c0"
}
```