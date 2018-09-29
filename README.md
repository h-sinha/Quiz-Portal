# Quiczar - Quiz Portal made with Go and React

### Features
  * Registration and login for users
  * Multiple genre of quizzes
  * Multiple types of question-
     * MCQ Single Correct
     * MCQ Multiple Correct
  * Leaderboard for the users in each genre, and an overall leaderboard across genres
  * Admin mode for adding, editing and deleting genres, questions, quizzes


### Links to Packages Used in Go
  * github.com/gin-contrib/cors             
  * github.com/gin-gonic/gin
  * github.com/jinzhu/gorm
  * github.com/jinzhu/gorm/dialects/mysql
  * golang.org/x/crypto/bcrypt
  * github.com/gorilla/sessions

### Directory Structure
    Quiz-Portal
    ├── go          
    ├── react-app     
    └── README.md

### Instructions for Running 
* ```
  git clone https://github.com/h-sinha/Quiz-Portal.git
  cd Quiz-Portal/react-app
  yarn install
  ```
* run backend server by running
    ```
    go run main.go
    ```
    in the go folder
* run front-end server by running
    ```    
    yarn start
    ```
    in the react-app folder

