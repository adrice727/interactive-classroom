import scala.beans.BeanProperty
import com.twitter.util.Promise
import com.google.firebase.database._
import scala.collection.JavaConverters._
import scala.collection.breakOut




object Classroom {

//  def create(title: String, description: String, instructorId: String) : Future[ClassroomCase] = {
//    val ref = Firebase.ref(s"users/${user.id}")
//    val fake = ClassroomCase("akdjf", "asldjf", "aldjf", "adlf", "adfh", "adfk")
//    val p = new Promise[ClassroomCase]
//    ref.setValue(userRecord, new DatabaseReference.CompletionListener() {
//      override def onComplete(databaseError: DatabaseError, databaseReference: DatabaseReference) {
//        if (databaseError != null) {
//          p.setException(new FirebaseException(databaseError.getMessage()))
//        } else {
//          p.setValue(fake)
//        }
//      }
//    })
//    p
//  }

  def get(id: String): Promise[Classroom] = {
    val ref = Firebase.ref(s"classrooms/${id}")
    val p = new Promise[Classroom]
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        p.setValue(snapshot.getValue(classOf[ClassroomBean]).toCase)
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }
  def getAll(): Promise[Map[String, Classroom]] = {
    val p = new Promise[Map[String, Classroom]]
    val ref = Firebase.ref("classrooms")
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        // This will be an empty list if there are no children
        val classroomList = snapshot.getChildren().asScala.toList map { c => c.getValue(classOf[ClassroomBean]) }

        if (classroomList.length == 0) {
          p.setValue(Map[String, Classroom]())
        } else {
          val classrooms: Map[String, Classroom] = (for {
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


case class Classroom(
                          id: String,
                          title: String,
                          description: String,
                          instructorId: String,
                          instructorName: String,
                          sessionId: String,
                          imageURL: Option[String] = None
                        ) {
  def toBean = {
    val classroom = new ClassroomBean()
    classroom.id = id
    classroom.title = title
    classroom.description = description
    classroom.instructorId = instructorId
    classroom.instructorName = instructorName
    classroom.sessionId = sessionId
    classroom.imageURL = imageURL getOrElse ""
    classroom
  }
}

/** Plain class required for parsing Firebase DataSnapshot */
class ClassroomBean() {
  @BeanProperty var id: String = null
  @BeanProperty var title: String = null
  @BeanProperty var description: String = null
  @BeanProperty var instructorId: String = null
  @BeanProperty var instructorName: String = null
  @BeanProperty var sessionId: String = null
  @BeanProperty var imageURL: String = null
  def toCase: Classroom = {
    val hasImage = !imageURL.isEmpty
    val maybeImageURL: Option[String] = if (hasImage) Some(imageURL) else None
    Classroom(id, title, description, instructorId, instructorName, sessionId, maybeImageURL)
  }
  override def toString = s"${title} with ${instructorName}"
}


