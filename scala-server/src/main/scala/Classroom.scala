import scala.beans.BeanProperty
import com.twitter.util.Promise
import com.google.firebase.database._
import scala.collection.JavaConverters._
import scala.collection.breakOut


object Classroom {
  def get(id: String): Promise[ClassroomCase] = {
    val ref = Firebase.ref(s"classrooms/${id}")
    val p = new Promise[ClassroomCase]
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        p.setValue(snapshot.getValue(classOf[Classroom]).toCase)
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }
  def getAll(): Promise[Map[String, ClassroomCase]] = {
    val p = new Promise[Map[String, ClassroomCase]]
    val ref = Firebase.ref("classrooms")
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        // This will be an empty list if there are no children
        val classroomList = snapshot.getChildren().asScala.toList map { c => c.getValue(classOf[Classroom]) }

        if (classroomList.length == 0) {
          p.setValue(Map[String, ClassroomCase]())
        } else {
          val classrooms: Map[String, ClassroomCase] = (for {
            c <- classroomList
            id = c.getId
            cc = c.toCase
          } yield (id -> cc)) (breakOut)
          p.setValue(classrooms)
        }
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }
}


case class ClassroomCase(
                          id: String,
                          title: String,
                          description: String,
                          instructorId: String,
                          instructorName: String,
                          sessionId: String,
                          imageURL: Option[String] = None
                        )

/** Plain class required for parsing Firebase DataSnapshot */
class Classroom() {
  @BeanProperty var id: String = ""
  @BeanProperty var title: String = ""
  @BeanProperty var description: String = ""
  @BeanProperty var instructorId: String = ""
  @BeanProperty var instructorName: String = ""
  @BeanProperty var sessionId: String = ""
  @BeanProperty var imageURL: String = ""
  def toCase: ClassroomCase = {
    val hasImage = !imageURL.isEmpty
    val maybeImageURL: Option[String] = if (hasImage) Some(imageURL) else None
    ClassroomCase(id, title, description, instructorId, instructorName, sessionId, maybeImageURL)
  }
  override def toString = s"${title} with ${instructorName}"
}


