import io.finch._
import scala.collection.JavaConverters._
import com.twitter.finagle.http.filter.Cors
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.http.{Request, Response}
import com.twitter.util.{Await, Future, Promise}
import io.finch.circe._
import io.circe.generic.auto._
import io.circe.syntax._
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database._


object Main extends App {

  val validateUser: Endpoint[UserCase] = post("user" :: body.as[UserCase]) { user: UserCase =>
    User.get(user.id).map(Ok)
  }

  val getClassroom: Endpoint[ClassroomCase] = get("classroom" / string) { (classroomId: String) =>
    Classroom.get(classroomId).map(Ok)
  }

  val getIndex: Endpoint[String] = get(/) {
    Ok("Hello, Index!")
  }

  val getAllClassrooms: Endpoint[String] = get("classrooms") {
    Ok("Hello, Index!")
  }
  val createClassroom: Endpoint[String] = post("classroom") {
    Ok("Hello, Index!")
  }
  val removeClassroom: Endpoint[String] = delete("classroom") {
    Ok("Hello, Index!")
  }

  val api: Service[Request, Response] = (
    validateUser :+: getIndex :+: validateUser :+: getClassroom :+: getAllClassrooms :+: createClassroom :+: removeClassroom
    ).toServiceAs[Application.Json]


  // Set up CORS
  //  val policy: Cors.Policy = Cors.Policy(
  //    allowsOrigin = _ => Some("*"),
  //    allowsMethods = _ => Some(Seq("GET", "POST")),
  //    allowsHeaders = _ => Some(Seq("Accept"))
  //  )
  //  val corsService: Service[Request, Response] = new Cors.HttpFilter(policy).andThen(api)

  // Listen
  Await.ready(Http.server.serve(":8080", api))
}