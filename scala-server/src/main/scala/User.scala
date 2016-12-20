import scala.beans.BeanProperty
import com.twitter.util.{Await, Future, Promise}
import com.google.firebase.database._

case class UserNotFoundException(s: String) extends Exception(s)

object User {
  def create(user: User) : Future[User] = {
    val ref = Firebase.ref(s"users/${user.id}")
    val userRecord = user.toBean
    val p = new Promise[User]
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

  def get(id: String): Future[User] = {
    val ref = Firebase.ref(s"users/${id}")
    val p = new Promise[User]
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        val userRecord: UserBean = snapshot.getValue(classOf[UserBean])
        if (userRecord != null) {
          p.setValue(userRecord.toCase)
        } else {
          p.setException(new UserNotFoundException(s"User ${id} not found."))
        }
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new FirebaseException(databaseError.getMessage()))
      }
    })
    p
  }

  def existsOrCreate(user: User): Future[User] = {
    val p = new Promise[User]
    get(user.id).map(userRecord => p.setValue(userRecord)).rescue {
      case e: UserNotFoundException => {
        create(user).map(userRecord => p.setValue(userRecord))
        // TODO handle user creation failure
      }
    }
    p
  }
}

case class User(id: String, name: String, email: String, role: Option[String] = None, imageURL: Option[String] = None) {
  def toBean = {
    val user = new UserBean()
    user.id = id
    user.name = name
    user.email = email
    user.role = role getOrElse null
    user.imageURL = imageURL getOrElse ""
    user
  }
}

/** Plain class required for parsing Firebase DataSnapshot */
class UserBean() {
  @BeanProperty var id: String = null
  @BeanProperty var name: String = null
  @BeanProperty var email: String = null
  @BeanProperty var role: String = null
  @BeanProperty var imageURL: String = null
  def toCase: User = {
    val hasImage = !imageURL.isEmpty
    val maybeRole: Option[String] = if (role != null) Some(role) else None
    val maybeImageURL: Option[String] = if (imageURL != null) Some(imageURL) else None
        User(id, name, email, maybeRole, maybeImageURL)
  }
  override def toString = s"${id}: ${name}, ${email}, ${imageURL}"
}
