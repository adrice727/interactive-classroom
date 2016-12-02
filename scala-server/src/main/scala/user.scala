import scala.beans.BeanProperty

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

case class UserCase(id: String, name: String, email: String, imageURL: Option[String] = None)