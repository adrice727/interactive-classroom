import io.finch._
import com.twitter.finagle.http.filter.Cors
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.http.{Request, Response}
import com.twitter.util.Await
import io.finch.circe._
import io.circe.generic.auto._
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database._

object Main extends App {

  case class User(id:String , name: String, email: String, photoUrl: Option[String] = None)

  val test: Endpoint[User] = post("user" :: body.as[User]) { user: User =>
    val ref = Firebase.ref("users/" + user.id)
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        val userSnapshot = snapshot.getValue()
        println(snapshot.getChildren())
      }
      override def onCancelled(databaseError: DatabaseError) = {
        println("The read failed: " + databaseError.getCode())
      }
    })
    Ok(User("waodfu", "tim", "tim@tim.com"))
  }

  val getIndex: Endpoint[String] = get(/) { Ok("Hello, Index!") }

  val validateUser: Endpoint[String] = post("user") { Ok("Hello, Index!") }
  val getClassroom: Endpoint[String] = get("classroom") { Ok("Hello, Index!") }
  val getAllClassrooms: Endpoint[String] = get("classrooms") { Ok("Hello, Index!") }
  val createClassroom: Endpoint[String] = post("classroom") { Ok("Hello, Index!") }
  val removeClassroom: Endpoint[String] = delete("classroom") { Ok("Hello, Index!") }

  val api: Service[Request, Response] = (
    test :+: getIndex :+: validateUser :+: getClassroom :+: getAllClassrooms :+: createClassroom :+: removeClassroom
  ).toServiceAs[Application.Json]


  // Set up CORS
  val policy: Cors.Policy = Cors.Policy(
    allowsOrigin = _ => Some("*"),
    allowsMethods = _ => Some(Seq("GET", "POST")),
    allowsHeaders = _ => Some(Seq("Accept"))
  )
  val corsService: Service[Request, Response] = new Cors.HttpFilter(policy).andThen(api)

  // Listen
  Await.ready(Http.server.serve(":8080", corsService))
}