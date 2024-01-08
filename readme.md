# Installation guide
## Prerequisites
- nodejs 20 or higher
- npm 6.14 or higher
- mongodb 4.4 or higher
- jwt
## Installation
1. Clone the repository
2. Install the dependencies
3. Run the server
## Configuration
- Create a .env file in the root directory
- Add the following variables
```bash
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your_db_name
JWT_SECRET=your_secret
```
## Usage
- Run the server
- Open the browser and go to http://localhost:3000
- You can use Postman to test the API
## API

### Authentication
#### Login
- URL: /api/auth/login
- Method: POST
- Body:
```json
{
    "email": "your_email",
    "password": "your_password"
}
```
- Response:
```json
{
    "token": "your_token"
}
```

### Movies
#### Create a movie
- URL: /api/movies
- Method: POST
- Body:
```json
{
    "title": "your_title",
    "description": "your_description",
    "image": "your_image_url",
    "rating": "your_rating"
}
```json
headers: {
    "Authorization": "your_token",
    "Content-Type": "application/json"
}
```

- Response:
```json
{
    "message": "Movie created successfully",
    "movie": {
        "title": "your_title",
        "description": "your_description",
        "image": "your_image_url",
        "rating": "your_rating",
        "_id": "your_movie_id",
        "createdAt": "your_movie_created_date",
        "updatedAt": "your_movie_updated_date",
        "__v": 0
    }
}
```