# Todo API

## Description
A Node.js-powered 🍀 RESTful API for managing a to-do list, utilizing MongoDB for data persistence 🌱.

## Features
- CRUD operations for to-do items.
- BLoC pattern for state management.
- User authentication for data protection.
- Real-time data synchronization.

## Installation
- Install
```bash
git clone https://github.com/priyanshupatra02/task_ninja_backend_nodejs
npm install
```
- Add your .env file
```bash
DB_CONNECT = "<mongoDb-database-link>"
DB_NAME = "<name-of-your-backend"
JWT_SECRET = "<jwt-secret>"
```
- Start your npm app
```bash
npm install
```


## API Endpoints

- **POST /api/todo/:userId**: Create a new todo
- **GET /api/todo/:userId**: Get all you todo
- **PUT /api/todo/:userId/:todoId**: Update a task
- **DELETE /api/todo/:userId/:todoId**: Delete a task

## Usage

Use a tool like 
1. `curl`
2. [Postman](https://www.postman.com/)
3. [Api Dog](https://apidog.com/)
4. [Thunder Client](https://www.thunderclient.com/)

to interact with the API endpoints.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README according to your project's specifics. Happy coding! 🚀
