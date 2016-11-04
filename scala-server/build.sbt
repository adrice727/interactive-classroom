lazy val root = (project in file(".")).
  settings(
    name := "interactive-classroom-server",
    version := "1.0",
    scalaVersion := "2.11.8",
    libraryDependencies ++= Seq(
      "com.github.finagle" %% "finch-core" % "0.11.0-M4",
      "com.github.finagle" %% "finch-circe" % "0.11.0-M4",
      "io.circe" %% "circe-generic" % "0.5.1",
      "com.tokbox" % "opentok-server-sdk" % "2.3.2",
      "com.google.firebase" % "firebase-server-sdk" % "3.0.1"
    )
  )