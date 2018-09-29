package main

import (
    "github.com/gin-contrib/cors"             
    "github.com/gin-gonic/gin"
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "golang.org/x/crypto/bcrypt"
    "github.com/gorilla/sessions"
	"fmt"
  "os"
  "strconv"
)
var db *gorm.DB                                         
var err error

type User struct {
   Uid int `json:"uid" gorm:AUTO_INCREMENT`
   Name string `json:"name"`
   Password string `json:"password"`
   Super int `json:"super"`
}

type QuizSt struct {
   Zid int `json:"zid" gorm:AUTO_INCREMENT`
   Name string `json:"name"`
   Cid string `json:"cid"`
   Q1id string `json:"q1id"`
   Q2id string `json:"q2id"`
   Q3id string `json:"q3id"`
   Q4id string `json:"q4id"`
   Q5id string `json:"q5id"`
}

type Score struct {
  Uid int `json:"uid"`
  Cid int `json:"cid"`
  Score string `json:"score"`
}

type Leader struct {
  Uname string `json:"name"`
  Score string `json:"score"`
  Category string `json:"category"`
}

type Question struct {
  Q_id int `json:"q_id" gorm:AUTO_INCREMENT`
  Question string `json:"question"`
  Cid string `json:"cid"`
  Choice1 string `json:"choice1"`
  Choice2 string `json:"choice2"`
  Choice3 string `json:"choice3"`
  Choice4 string `json:"choice4"`
  Correct string `json:"correct"`
  Multimedia string `json:"multimedia"`
}

type Category struct{
  Cid int `json:"cid"`
  Category string `json:"category"`
}
type QuizScore struct{
  Score string `json:"score"`
}
type Attempted struct{
  Uid int `json:"uid"`
  Score int `json:"score"`
  Name string `json:"name"`
}
var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
var session *sessions.Session
var categ string = "0"
var quizno string = "0"
var admin int = 0
var cur_uid int 
var question string
var logged_in bool = false
var current_user string  = ""
func main() {
  db, err = gorm.Open("mysql", "root:D@t@b@s3@/quizzer?charset=utf8")
  defer db.Close()
  db.AutoMigrate(&User{},&Score{},&Question{},&Category{}, &QuizSt{} , &Attempted{})
  router := gin.Default()
  router.GET("/view_users", GetPeople)
  router.GET("/viewattempted", GetAttempted)
  router.GET("/isadmin", IsAdmin)
  router.GET("/islogged", IsLogged)
  router.GET("/getallq", GetAllQ)
  router.GET("/logout", Logout)
  router.GET("/getqname", GetQName)
  router.GET("/leaderboard", LeaderBoard)
  router.POST("/leader/:cid", Leaders)
  router.POST("/endquiz", EndQuiz)
  router.GET("/view_questions", GetQuestions)
  router.GET("/get_categories", GetCategories)
  router.POST("/register", RegisterPerson)
  router.POST("/login", LoginPerson)
  router.POST("/addQuestion", AddQuestion)
  router.POST("/addCategory", AddCategory)
  router.DELETE("/users/:uid", DeletePerson)
  router.DELETE("/delquiz/:zid", DeleteQuiz)
  router.DELETE("/question/:uid", DeleteQuestion)
  router.GET("/questionfetch/:cid", FetchQuestion)
  router.POST("/startQuiz/:cid", StartQuiz)
  router.POST("/setques/:q_id", SetQues)
  router.POST("/setCat/:cid", SetCat)
  router.GET("/getques/:cid", QuesByCateg)
  router.GET("/getquest", GetQuest)
  router.POST("/addQuiz", AddQuiz)
  router.POST("/editQuiz", EditQuiz)
  router.POST("/editQuestion", EditQuestion)
  router.GET("/get_quizzes", GetQuiz)
  router.GET("/runQuiz", RunQuiz)
  router.GET("/getcurques",CurrentQuestion)
  router.Use((cors.Default()))
  router.Run(":8000")   

}
func EndQuiz(c *gin.Context) {
   var finalscore QuizScore
   var score Score
   err = c.BindJSON(&finalscore)
   tmp, _ :=strconv.Atoi(categ)
   score.Score = finalscore.Score
   score.Uid = cur_uid
   score.Cid = tmp
   var sc Score
   db.Table("scores").Where("uid = ? AND cid = ?",cur_uid, categ).First(&sc)
   fmt.Println(sc)
   tmp1, _ := strconv.Atoi(sc.Score)
   tmp2, _ := strconv.Atoi(score.Score)
   tmp3 := strconv.Itoa(tmp1+tmp2)
   fmt.Println(tmp1,tmp2,tmp3)
   var attempt Attempted
   attempt.Uid = cur_uid
   tmp , _ =strconv.Atoi(finalscore.Score)
   attempt.Score = tmp
   var qq QuizSt
   db.Where("zid = ?",quizno).Find(&qq)
   attempt.Name = qq.Name
   fmt.Println(attempt)
   db.Create(attempt);
   db.Model(&sc).Where("uid = ? AND cid = ?",cur_uid, categ).Update("score", tmp3)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin})

}

func GetQuiz(c *gin.Context){
  var quizzes []QuizSt
  fmt.Println(categ,"SDAsdasda")
  if categ == "0"{
    if err := db.Find(&quizzes).Error; err != nil {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
      return
    }
    c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"data":quizzes})
     return
  }
   if err := db.Where("cid = ?",categ).Find(&quizzes).Error; err != nil {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
      return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"data":quizzes})
   }
}
func AddQuiz(c *gin.Context){
  var quiz QuizSt
   err = c.BindJSON(&quiz)
   fmt.Println(err)
   fmt.Println(quiz)
   if err != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
   err := db.Create(&quiz)
   if err.Error != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
  c.Header("access-control-allow-origin", "*") 
  c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   return
}

func EditQuiz(c *gin.Context){
  var quiz QuizSt
  var stored QuizSt
   err = c.BindJSON(&quiz)
   if err != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
   if quiz.Cid != ""{
   err := db.Model(&stored).Where("zid = ?",quizno).Update("cid", quiz.Cid)
    fmt.Println(err.Error)
   }
   if quiz.Q1id != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("q1id", quiz.Q1id)
    fmt.Println(err.Error)
   }
   if quiz.Q2id != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("q2id", quiz.Q2id)
    fmt.Println(err.Error)
   }
   if quiz.Q3id != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("q3id", quiz.Q3id)
    fmt.Println(err.Error)
   }
   if quiz.Q4id != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("q4id", quiz.Q4id)
    fmt.Println(err)
   }
   if quiz.Q5id != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("q5id", quiz.Q5id)
    fmt.Println(err.Error)
   }
   if quiz.Name != ""{
   err:=db.Model(&stored).Where("zid = ?",quizno).Update("name", quiz.Name)
    fmt.Println(err.Error)
   }
  c.Header("access-control-allow-origin", "*") 
  c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   fmt.Println("10")
   return
}
func EditQuestion(c *gin.Context){
  var quiz Question
  var stored Question
   err = c.BindJSON(&quiz)
   if err != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
   fmt.Println(question,quiz.Cid,quiz.Choice3)
   if quiz.Cid != ""{
   err := db.Model(&stored).Where("q_id = ?",question).Update("cid", quiz.Cid)
    fmt.Println(err.Error)
   }
   if quiz.Question != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("question", quiz.Question)
    fmt.Println(err.Error)
   }
   if quiz.Choice1 != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("choice1", quiz.Choice1)
    fmt.Println(err.Error)
   }
   if quiz.Choice2 != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("choice2", quiz.Choice2)
    fmt.Println(err.Error)
   }
   if quiz.Choice3 != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("choice3", quiz.Choice3)
    fmt.Println(err)
   }
   if quiz.Choice4 != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("choice4", quiz.Choice4)
    fmt.Println(err.Error)
   }
   if quiz.Correct != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("correct", quiz.Correct)
    fmt.Println(err.Error)
   }
    if quiz.Multimedia != ""{
   err:=db.Model(&stored).Where("q_id = ?",question).Update("multimedia", quiz.Multimedia)
    fmt.Println(err.Error)
   }
  c.Header("access-control-allow-origin", "*") 
  c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   fmt.Println("10")
   return
}
func QuesByCateg(c *gin.Context) {
    if admin == 0{
       c.Header("access-control-allow-origin", "*")
       c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
   id := c.Params.ByName("cid")
   var ques []Question
   d := db.Table("questions").Where("cid = ?", id).Find(&ques)
   fmt.Println(d)
   fmt.Println(ques)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin ,"data": ques})
}

func Leaders(c *gin.Context) {
   categ = c.Params.ByName("cid")
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin})
}
func GetAllQ(c *gin.Context){
  var qq []Question
  db.Find(&qq);
  c.Header("access-control-allow-origin", "*") 
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":qq})
}
func CurrentQuestion(c* gin.Context){
  var qq Question 
   db.Where("q_id = ?", question).Find(&qq)
  c.Header("access-control-allow-origin", "*") 
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":qq})
}
func GetQName(c *gin.Context){
  var temp QuizSt
   err := db.Table("quiz_sts").Where("zid = ?", quizno).Find(&temp)
   fmt.Println(err)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":temp.Name})
}
func GetQuest(c *gin.Context){
  var temp []Question
  var aux Question
  var ques QuizSt
   aux.Q_id = 1
   aux.Cid = "1"
   aux.Choice1 = "1"
   aux.Choice2 = "1"
   aux.Choice3 = "1"
   aux.Choice4 = "1"
   aux.Correct = "1"
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   tmp , _ := strconv.Atoi(quizno)

   db.Table("quiz_sts").Where("zid = ?", tmp).Find(&ques)
    fmt.Println("ques",ques)

   tmp , _ = strconv.Atoi(ques.Q1id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[0])
   tmp , _ = strconv.Atoi(ques.Q2id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[1])
   tmp , _ = strconv.Atoi(ques.Q3id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[2])
   tmp , _ = strconv.Atoi(ques.Q4id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[3])
   tmp , _ = strconv.Atoi(ques.Q5id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[4])
   fmt.Println(temp)
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":temp})
}
func Logout(c *gin.Context){
   categ = "1"
   quizno = "1"
   admin = 0
   cur_uid = 0 
   logged_in = false
    current_user = ""
   admin = 0 
   fmt.Println(logged_in, admin)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin})
}
func LeaderBoard(c *gin.Context) {  
  var score []Score
  var temp []Leader
  var aux Leader
  aux.Uname = "A"
  aux.Score = "0"
  aux.Category = "A"

  var category Category
  var person User
  if categ == "0" {
    db.Order("score desc").Find(&score)
    for i:=0; i<len(score); i++{
      temp = append(temp, aux)
      fmt.Println(score[i].Score)
      temp[i].Score = score[i].Score
      result := db.Table("categories").Where("cid = ?",score[i].Cid).Row()
      result.Scan(&category.Cid,&category.Category)
      temp[i].Category = category.Category

      result = db.Table("users").Where("uid = ?",score[i].Uid).Row()
      result.Scan(&person.Uid,&person.Name, &person.Password, &person.Super)
      temp[i].Uname = person.Name
    }
    if(len(temp) == 0){
    c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin, "data":temp})
      return
    }
    c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":temp})
    fmt.Println(temp)
    return
  }
   db.Order("score desc, score").Where("cid = ?", categ).Find(&score)
    for i:=0; i<len(score); i++{
      temp = append(temp, aux)
      temp[i].Score = score[i].Score
      result := db.Table("categories").Where("cid = ?",score[i].Cid).Row()
      result.Scan(&category.Cid,&category.Category)
      temp[i].Category = category.Category

      result = db.Table("users").Where("uid = ?",score[i].Uid).Row()
      result.Scan(&person.Uid,&person.Name, &person.Password, &person.Super)
      temp[i].Uname = person.Name
    }
    if(len(temp) == 0){
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin, "data":temp})
      return 
    }
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":temp})
    return
}
func RunQuiz(c *gin.Context) {
   var temp []Question
  var aux Question
  var ques QuizSt
   aux.Q_id = 1
   aux.Cid = "1"
   aux.Choice1 = "1"
   aux.Choice2 = "1"
   aux.Choice3 = "1"
   aux.Choice4 = "1"
   aux.Correct = "1"
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   temp = append(temp, aux)
   fmt.Println("quiz",quizno)
   tmp , _ := strconv.Atoi(quizno)

   db.Table("quiz_sts").Where("zid = ?", tmp).Find(&ques)
    fmt.Println("ques",ques)

   tmp , _ = strconv.Atoi(ques.Q1id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[0])
   tmp , _ = strconv.Atoi(ques.Q2id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[1])
   tmp , _ = strconv.Atoi(ques.Q3id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[2])
   tmp , _ = strconv.Atoi(ques.Q4id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[3])
   tmp , _ = strconv.Atoi(ques.Q5id)
   db.Table("questions").Where("q_id = ?", tmp).Find(&temp[4])
   fmt.Println(temp)
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":temp})
}
func SetCat(c *gin.Context) {
   categ = c.Params.ByName("cid")
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}

func StartQuiz(c *gin.Context) {
   quizno = c.Params.ByName("cid")
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}
func SetQues(c *gin.Context){
   question = c.Params.ByName("q_id")
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}
  

func DeleteQuestion(c *gin.Context) {
    if admin == 0{
       c.Header("access-control-allow-origin", "*")
       c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
   id := c.Params.ByName("uid")
   var ques Question
   d := db.Table("questions").Where("q_id = ?", id).Delete(&ques)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}
func FetchQuestion(c *gin.Context) {
   id := categ
   fmt.Println(id)
   var ques Question
   var try int =0
   for try<10{
     d := db.Table("questions").First(&ques, "rand()")
   fmt.Println(d)
    if(ques.Q_id != 0){
      break;
    }
  }
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin, "data":ques})
}

func DeletePerson(c *gin.Context) {
    if admin == 0{
        c.Header("access-control-allow-origin", "*")
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
    id := c.Params.ByName("uid")
   var user User
   d := db.Table("users").Where("uid = ?", id).Delete(&user)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}

func DeleteQuiz(c *gin.Context) {
  fmt.Println("aaaaaasaddfsda")
    if admin == 0{
        c.Header("access-control-allow-origin", "*")
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
    id := c.Params.ByName("zid")
    fmt.Println(id)
   var quiz QuizSt
   d := db.Table("quiz_sts").Where("zid = ?", id).Delete(&quiz)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
}

func AddCategory(c *gin.Context){
  if admin == 0{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"UNAUTH", "admin":admin})
     return
    }
  var category Category
   var users []User
   var score Score
   err = c.BindJSON(&category)
   fmt.Println(category)
   fmt.Println(err)
   if err != nil{
    c.Header("access-control-allow-origin", "*") 
     c.JSON(200,map[string]interface{}{"status":"FAILURE", "admin":admin})
     return
   }
   err := db.Create(&category)
   fmt.Println(err)
   if err.Error != nil{
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
     return
   }
   db.Find(&users)
   result := db.Table("categories").Where("category = ?",category.Category).Row()
   result.Scan(&category.Cid,&category.Category)
   aux := category.Cid
   score.Cid = aux
  for i:=0; i<len(users); i++ {
      score.Uid = users[i].Uid
      score.Score = "0"
      db.Create(score)
   }
   c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   return
}

func AddQuestion(c *gin.Context){
   if admin == 0{
      c.Header("access-control-allow-origin", "*")
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      // c.AbortWithStatus(404)
      return
    }
  var ques Question
   err = c.BindJSON(&ques)
   if err != nil{
     c.Header("access-control-allow-origin", "*")
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
     return
      // c.AbortWithStatus(404)
   }
   db.Create(&ques)
   fmt.Println(ques)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, &ques)
   return
}

func comparePasswords(hashedPwd string, plainPwd string) bool {
    byteHash := []byte(hashedPwd)
    byteHash2 := []byte(plainPwd)
    err := bcrypt.CompareHashAndPassword(byteHash, byteHash2)
    if err != nil {
        fmt.Println(err)
        return false
    }
    
    return true
}

func hashAndSalt(pwd []byte) string {
    hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
    if err != nil {
        fmt.Println(err)
    }
    return string(hash)
}

func RegisterPerson(c *gin.Context) {
   var person User
   var score Score
   var cat []Category
   err = c.BindJSON(&person)
   if err != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
   db.Find(&cat)
   fmt.Println(cat)
   tmp := []byte(person.Password)
   person.Password = hashAndSalt(tmp)
   err := db.Create(&person)
   person.Super = 0
   fmt.Println(err.Error)
   if err.Error != nil{
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
   }
  result := db.Table("users").Where("name = ?",person.Name).Row()
  result.Scan(&person.Uid,&person.Name,&person.Password,&person.Super)

   aux := person.Uid
   score.Uid = aux
   score.Score = "0"
   for i:=0; i<len(cat); i++ {
      score.Cid = cat[i].Cid
      err := db.Create(score)
      fmt.Println(err.Error)
   }
  c.Header("access-control-allow-origin", "*") 
  c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   return
}

func LoginPerson(c *gin.Context) {
  var received User
  var stored User
  err = c.BindJSON(&received)
   if err != nil{
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
     return
   }
    

  result := db.Table("users").Where("name = ?",received.Name).Row()
  err := result.Scan(&stored.Uid,&stored.Name,&stored.Password,&stored.Super)
    if err != nil{
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
    return
  }
   response := comparePasswords(stored.Password, received.Password)
   if response == true{
    session, _ := store.Get(c.Request, received.Name)
    session.Values["name"] = received.Name 
    cur_uid = stored.Uid
    logged_in = true
    fmt.Println(stored.Name)
    current_user = stored.Name
    session.Values["id"] = stored.Uid
    session.Values["super"] = stored.Super
    session.Save(c.Request, c.Writer)
    if stored.Super == 1{
        admin = 1
    }
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"SUCCESS", "admin":admin})
   }
   if response == false{
     c.Header("access-control-allow-origin", "*") 
    c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
   }
   return
}
func GetPeople(c *gin.Context) {
     if admin == 0{
       c.Header("access-control-allow-origin", "*")
       c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
   var people []User
   if err := db.Find(&people).Error; err != nil {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
     return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"data" : people})
   }
}
func GetAttempted(c *gin.Context) {
   var attempt []Attempted
   if err := db.Where("uid = ?",cur_uid).Find(&attempt).Error; err != nil {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
     return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"data" : attempt})
   }
}
func GetQuestions(c *gin.Context) {
   if admin == 0{
     c.Header("access-control-allow-origin", "*")
       c.JSON(200, map[string]interface{}{"status":"FAILURE", "admin":admin})
      return
    }
   var questions []Question
   if err := db.Find(&questions).Error; err != nil {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
     return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin, "data":questions})
   }
}

func GetCategories(c *gin.Context) {
   var category []Category
   if err := db.Find(&category).Error; err != nil {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
      return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"data":category})
   }
}
func IsAdmin(c *gin.Context) {
   if admin == 0 {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
      return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin })
   }
}
func IsLogged(c *gin.Context) {
    fmt.Println(logged_in)
    fmt.Println(current_user)
   if logged_in == false {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"FAILURE" , "admin":admin})
      return
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, map[string]interface{}{"status":"SUCCESS" , "admin":admin ,"user":current_user})
   }
}
