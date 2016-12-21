import java.io.InputStream
import scala.io.Source
import com.opentok.OpenTok
import com.opentok.Session
import com.opentok.SessionProperties
import com.opentok.MediaMode
import com.opentok.TokenOptions;
import com.opentok.Role;
import io.circe._, io.circe.parser._, io.circe.generic.semiauto._, io.circe.parser.decode, io.circe.syntax._
import cats._
import cats.implicits._


case class OpentokCredentials(apiKey: Int, apiSecret: String)

object Opentok {
  /** Initialize */
  val credentialsJSON: String = {
    val stream: InputStream = getClass.getResourceAsStream("/opentokCredentials.json")
    scala.io.Source.fromInputStream(stream).mkString
  }
  implicit val credentialsDecoder: Decoder[OpentokCredentials] = deriveDecoder[OpentokCredentials]
  val credentials = decode[OpentokCredentials](credentialsJSON).getOrElse(null);

  val opentok: OpenTok = new OpenTok(credentials.apiKey, credentials.apiSecret)

  def createSession: String = {
    val session: Session = opentok.createSession(new SessionProperties.Builder()
      .mediaMode(MediaMode.ROUTED)
      .build());
    session.getSessionId
  }

  def createToken(sessionId: String, user: User): String = {

    val role = user.role.get match {
      case "instructor" => Role.MODERATOR
      case "student" => Role.PUBLISHER
      case "auditor" => Role.SUBSCRIBER
    }
    
    val tokenData: String = Map(
      "id" -> user.id,
      "role" -> user.role.get,
      "name" -> user.name
    ).asJson.noSpaces

    val token = opentok.generateToken(sessionId, new TokenOptions.Builder()
      .role(role)
      .data(tokenData)
      .build());

    token
  }
}






