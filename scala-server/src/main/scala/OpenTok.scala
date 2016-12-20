import java.io.InputStream
import scala.io.Source
import com.opentok.OpenTok
import com.opentok.Session
import com.opentok.SessionProperties
import com.opentok.MediaMode
import io.circe._, io.circe.parser._, io.circe.generic.semiauto._, io.circe.parser.decode
import cats.syntax.either._


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

  def createSession = {
    val session: Session = opentok.createSession(new SessionProperties.Builder()
      .mediaMode(MediaMode.ROUTED)
      .build());
    session
  }
}






