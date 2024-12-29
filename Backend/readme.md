# Backend API Documentation

## Endpoint
/user/register`

## Description
This endpoint is used to register a new user. It validates the input data, hashes the password, and stores the user information in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

## Request Body
The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
    - `firstname`: A string with a minimum length of 3 characters (required).
    - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

### Example
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Body**:
    ```json
    {
        "token": "JWT_TOKEN_HERE",
        "user": {
            "_id": "USER_ID",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**:
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name must be at least 3 characters long",
                "param": "fullname.firstname",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

### Email Already Exists
- **Status Code**: `400 Bad Request`
- **Body**:
    ```json
    {
        "message": "Email already exists"
    }
    ```

### Internal Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
    ```json
    {
        "message": "Internal server error"
    }
    ```


## Validation
- Validates that `email` is a valid email address.
- Validates that `fullname.firstname` is at least 3 characters long.
- Validates that `password` is at least 6 characters long.

## Controller
- Handles the registration logic, including validation, password hashing, and user creation.
- Generates a JWT token upon successful registration.

## Services
- Contains the `createUser` function which handles the creation of the user in the database.

## Model
- Defines the `User` schema with fields for `fullname`, `email`, `password`, and `socketId`.
- Includes methods for generating a JWT token, comparing passwords, and hashing passwords.

## Endpoint
`/user/login`

## Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) and the user details upon successful authentication.

## Request Body
The request body must be a JSON object containing the following fields:

- `email`: A valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

### Example
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "token": "JWT_TOKEN_HERE",
        "user": {
            "_id": "USER_ID",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**:
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

### Invalid Credentials
- **Status Code**: `401 Unauthorized`
- **Body**:
    ```json
    {
        "message": "Invalid email or password"
    }
    ```

### Internal Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
    ```json
    {
        "message": "Internal server error"
    }
    ```

## Validation
- Validates that `email` is a valid email address.
- Validates that `password` is at least 6 characters long.

## Controller
- Handles the login logic, including validation and user authentication.
- Generates a JWT token upon successful authentication.

## Services
- Contains the `findUser` function which handles the retrieval of the user from the database.

## Model
- Defines the `User` schema with fields for `fullname`, `email`, `password`, and `socketId`.
- Includes methods for generating a JWT token, comparing passwords, and hashing passwords.