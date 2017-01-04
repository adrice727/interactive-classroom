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

  // TODO: Combine with getAllClassrooms using optional param
  val getInstructorClassrooms: Endpoint[Map[String, Classroom]] = get("classrooms" / string) { instructorId: String =>
    Classroom.getAll(instructorId).map(Ok)
  }

  val createClassroom: Endpoint[Classroom] = post("classroom" :: body.as[Classroom]) { classroom: Classroom =>
    Classroom.create(classroom).map(Ok)
  } handle {
    case e: Exception => InternalServerError(e)
  }

  val removeClassroom: Endpoint[String] = delete("classroom" / string) { (classroomId: String) =>
    Classroom.remove(classroomId).map(Ok)
  } handle {
    case e: Exception => InternalServerError(e)
  }

  val service: Service[Request, Response] = (
    validateUser :+:
      getClassroom :+:
      getAllClassrooms :+:
      getInstructorClassrooms :+:
      createClassroom :+:
      removeClassroom
    ).toServiceAs[Application.Json]

  //Set up CORS
  val policy: Cors.Policy = Cors.Policy(
    allowsOrigin = _ => Some("*"),
    allowsMethods = _ => Some(Seq("GET", "POST", "DELETE")),
    allowsHeaders = _ => Some(Seq("Accept", "Content-Type"))
  )
  val api: Service[Request, Response] = new Cors.HttpFilter(policy).andThen(service)

  // Listen
  Await.ready(Http.server.serve(":3030", api))
}