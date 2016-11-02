object Firebase {
  val options = new FirebaseOptions.Builder()
    .setDatabaseUrl("https://opentok-classroom.firebaseio.com")
    .setServiceAccount(new FileInputStream("../config/firebaseCredentials.json"))
    .build();
  FirebaseApp.initializeApp(options)
  val database = FirebaseDatabase.getInstance()
  def ref : DatabaseReference = database
}