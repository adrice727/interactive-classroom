
import io.finch._
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.http.{Request, Response}
import com.twitter.util.Await

object Main extends App {
  val getHello: Endpoint[String] = get("hello") { Ok("Hello, World!") }
  val getIndex: Endpoint[String] = get(/) { Ok("Hello, Index!") }

  val validateUser: Endpoint[String] = post("user") { Ok("Hello, Index!") }
  val getClassroom: Endpoint[String] = get("classroom") { Ok("Hello, Index!") }
  val getAllClassrooms: Endpoint[String] = get("classrooms") { Ok("Hello, Index!") }
  val createClassroom: Endpoint[String] = post("classroom") { Ok("Hello, Index!") }
  val removeClassroom: Endpoint[String] = delete("classroom") { Ok("Hello, Index!") }

  val api: Service[Request, Response] = (
    getHello :+: getIndex :+: validateUser :+: getClassroom :+: getAllClassrooms :+: createClassroom :+: removeClassroom
  ).toServiceAs[Text.Plain]

  Await.ready(Http.server.serve(":8080", api))
}