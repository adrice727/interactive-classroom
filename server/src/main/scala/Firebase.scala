import java.io.InputStream
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database._

case class FirebaseException(s: String) extends Exception(s)

object Firebase {
  val credentials : InputStream = getClass.getResourceAsStream("/firebaseCredentials.json")
  val options = new FirebaseOptions.Builder()
    .setDatabaseUrl("https://opentok-classroom.firebaseio.com")
    .setServiceAccount(credentials)
    .build();
  FirebaseApp.initializeApp(options)
  def ref(path: String): DatabaseReference = {
    val database = FirebaseDatabase.getInstance()
    database.getReference(path)
  }
}