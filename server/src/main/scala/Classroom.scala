import scala.beans.BeanProperty
import com.twitter.util.{Future, Promise}
import com.google.firebase.database._
import scala.collection.JavaConverters._
import scala.collection.breakOut

object Classroom {

  def create(classroomData: Classroom): Future[Classroom] = {
    val p = new Promise[Classroom]
    val childRef: DatabaseReference = Firebase.ref("classrooms").push()
    val classroomId: Some[String] = Some(childRef.getKey)
    val sessionId: Some[String] = Some(Opentok.createSession)
    val classroom = classroomData copy(id = classroomId, sessionId = sessionId)
    childRef.setValue(classroom.toBean, new DatabaseReference.CompletionListener() {
      override def onComplete(databaseError: DatabaseError, databaseReference: DatabaseReference) {
        if (databaseError != null) {
          p.setException(new FirebaseException(databaseError.getMessage()))
        } else {
          p.setValue(classroom)
        }
      }
    })
    p
  }

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

  private def buildMap(classroomList: List[ClassroomBean]): Map[String, Classroom] = {
    val classrooms: Map[String, Classroom] = (for {
      c <- classroomList
      id = c.getId
      cc = c.toCase
    } yield (id -> cc)) (breakOut)
    classrooms
  }

  private def getInstructorClassrooms(instructorId: String): Promise[Map[String, Classroom]] = {
    val p = new Promise[Map[String, Classroom]]
    val ref = Firebase.ref("classrooms")
    ref.orderByChild("instructorId").equalTo(instructorId).addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        // This will be an empty list if there are no children
        val classroomList: List[ClassroomBean] = snapshot.getChildren().asScala.toList map { c => c.getValue(classOf[ClassroomBean]) }
        if (classroomList isEmpty) {
          p.setValue(Map[String, Classroom]())
        } else {
          p.setValue(buildMap(classroomList))
        }
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }

  private def getAllClassrooms(): Promise[Map[String, Classroom]] = {
    val p = new Promise[Map[String, Classroom]]
    val ref = Firebase.ref("classrooms")
    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      override def onDataChange(snapshot: DataSnapshot) = {
        // This will be an empty list if there are no children
        val classroomList: List[ClassroomBean] = snapshot.getChildren().asScala.toList map { c => c.getValue(classOf[ClassroomBean]) }
        if (classroomList isEmpty) {
          p.setValue(Map[String, Classroom]())
        } else {
          p.setValue(buildMap(classroomList))
        }
      }
      override def onCancelled(databaseError: DatabaseError) = {
        p.setException(new Exception(databaseError.getMessage()))
      }
    })
    p
  }

  def getAll(instructorId: String = ""): Promise[Map[String, Classroom]] = {
    if (instructorId.isEmpty) getAllClassrooms() else getInstructorClassrooms(instructorId)
  }

  def getCredentials(classroomId: String, userId: String, role: String): Future[ClassroomCredentials] = {
    val getClassroom: Future[Classroom] = get(classroomId)
    val getUser: Future[User] = User.get(userId)

    val credentials = for {
      classroom <- getClassroom
      user <- getUser
      sessionCredentials = Opentok.getCredentials(classroom.sessionId.get, user copy (role = Some(role)))
    } yield ClassroomCredentials(classroom, sessionCredentials)

    credentials
  }

  def remove(id: String): Promise[String] = {
    val p = new Promise[String]
    Firebase.ref(s"classrooms/$id").setValue(null, new DatabaseReference.CompletionListener() {
      override def onComplete(databaseError: DatabaseError, databaseReference: DatabaseReference) {
        if (databaseError != null) {
          p.setException(new FirebaseException(databaseError.getMessage()))
        } else {
          p.setValue(s"Classroom $id removed")
        }
      }
    })
    p
  }
}

case class ClassroomCredentials(classroom: Classroom, credentials: SessionCredentials)

case class Classroom(
                      id: Option[String] = None,
                      title: String,
                      description: String,
                      instructorId: String,
                      instructorName: String,
                      sessionId: Option[String] = None,
                      imageURL: Option[String] = None
                    ) {
  def toBean = {
    val classroom = new ClassroomBean()
    classroom.id = id getOrElse null
    classroom.title = title
    classroom.description = description
    classroom.instructorId = instructorId
    classroom.instructorName = instructorName
    classroom.sessionId = sessionId getOrElse null
    classroom.imageURL = imageURL getOrElse null
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
    Classroom(Some(id), title, description, instructorId, instructorName, Some(sessionId), maybeImageURL)
  }
  override def toString = s"$title with $instructorName"
}


