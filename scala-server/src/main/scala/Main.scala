import io.finch._
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.http.{Request, Response}
import com.twitter.util.Await

object Main extends App {
  val getHello: Endpoint[String] = get("hello") { Ok("Hello, World!") }
  val getIndex: Endpoint[String] = get(/) { Ok("Hello, Index!") }

  val api: Service[Request, Response] = (
    getHello :+: getIndex
  ).toServiceAs[Text.Plain]

  Await.ready(Http.server.serve(":8080", api))
}