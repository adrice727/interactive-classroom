import scala.beans.BeanProperty
import com.twitter.util.Promise
import com.google.firebase.database._

object User {
  def get(id: String): Promise[UserCase] = {
    val ref = Firebase.ref(s"users/${id}")
    val p = new Promise[UserCase]
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        val userSnapshot = snapshot.getValue(classOf[User])
        p.setValue(userSnapshot.toCase)
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }
}

case class UserCase(id: String, name: String, email: String, imageURL: Option[String] = None)

/** Plain class required for parsing Firebase DataSnapshot */
class User() {
  @BeanProperty var id: String = ""
  @BeanProperty var name: String = ""
  @BeanProperty var email: String = ""
  @BeanProperty var imageURL: String = ""
  def toCase: UserCase = {
    val hasImage = !imageURL.isEmpty
    val maybeImageURL: Option[String] = if (hasImage) Some(imageURL) else None
    UserCase(id, name, email, maybeImageURL)
  }
  override def toString = s"${id}: ${name}, ${email}, ${imageURL}"
}
