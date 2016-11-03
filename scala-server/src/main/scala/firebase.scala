import java.io.FileInputStream
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database._

object Firebase {
  val options = new FirebaseOptions.Builder()
    .setDatabaseUrl("https://opentok-classroom.firebaseio.com")
    .setServiceAccount(new FileInputStream("../config/firebaseCredentials.json"))
    .build();
  FirebaseApp.initializeApp(options)
  def ref(path: String): DatabaseReference = {
    FirebaseDatabase.getInstance().getReference(path)
  }
}