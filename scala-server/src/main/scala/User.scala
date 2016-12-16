import scala.beans.BeanProperty
import com.twitter.util.{Await, Future, Promise}
import com.google.firebase.database._

case class UserNotFoundException(s: String) extends Exception(s)

object User {
  def create(user: UserCase) : Future[UserCase] = {
    val ref = Firebase.ref(s"users/${user.id}")
    val userRecord = user.toClass
    val p = new Promise[UserCase]
    ref.setValue(userRecord, new DatabaseReference.CompletionListener() {
      override def onComplete(databaseError: DatabaseError, databaseReference: DatabaseReference) {
        if (databaseError != null) {
          p.setException(new FirebaseException(databaseError.getMessage()))
        } else {
          p.setValue(user)
        }
      }
    })
    p
  }

  def get(id: String): Future[UserCase] = {
    val ref = Firebase.ref(s"users/${id}")
    val p = new Promise[UserCase]
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        val userRecord: User = snapshot.getValue(classOf[User])
        if (userRecord != null) {
          p.setValue(userRecord.toCase)
        } else {
          p.setException(new Exception(s"User ${id} not found."))
        }
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }
}

case class UserCase(id: String, name: String, email: String, imageURL: Option[String] = None) {
  def toClass = {
    val user = new User()
    user.id = id
    user.name = name
    user.email = email
    user.imageURL = imageURL getOrElse ""
    user
  }
}

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
