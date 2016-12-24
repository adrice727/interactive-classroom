import io.finch._
import scala.collection.JavaConverters._
import com.twitter.finagle.http.filter.Cors
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.http.{Request, Response}
import com.twitter.util.{Await, Future, Promise}
import io.finch.circe._
import io.circe.generic.auto._
import io.circe.syntax._

object Api extends App {

  val validateUser: Endpoint[User] = post("user" :: body.as[User]) { user: User =>
    User.existsOrCreate(user).map(Ok)
  } handle {
    case e: Exception => NotFound(e)
  }

  val getClassroom: Endpoint[Classroom] = get("classroom" / string) { (classroomId: String) =>
    Classroom.get(classroomId).map(Ok)
  }

  val getAllClassrooms: Endpoint[Map[String, Classroom]] = get("classrooms") {
    Classroom.getAll().map(Ok)
  }
  val createClassroom: Endpoint[Classroom] = post("classroom" :: body.as[Classroom]) { classroom: Classroom =>
    Classroom.create(classroom).map(Ok)
  } handle {
    case e: FirebaseException => InternalServerError(e)
  }
//  val removeClassroom: Endpoint[String] = delete("classroom") {
//    ???
//  }

  val api: Service[Request, Response] = (
    validateUser :+: getClassroom :+: getAllClassrooms :+: createClassroom
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