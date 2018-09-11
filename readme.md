# API DOCUMENTATION

### List of routes:

| Route                                     |  HTTP  | Desription                                                       |
| ----------------------------------------- |:------:| ---------------------------------------------------------------- |
| /login                                    | POST   | body: email, password                                            |
| /register                                 | POST   | body: name, email, password                                      |
| /loginWithFacebook                        | POST   | body: token                                                      |
| /api/get-list?token=YOUR TOKEN            | GET    | Show All Your Todo List                                          |
| /api/edit-todo?token=YOUR TOKEN           | PUT    | body: name, description, status, todoId                          |
| /api/create-todo?token=YOUR TOKEN         | POST   | body: name, description, dueDate (yyyy-mm-dd)                    |
| /api/remove-todo?token=YOUR TOKEN         | DELETE | body: todoId                                                     |


demo : https://todo-fancy-1536427031886.firebaseapp.com/login/