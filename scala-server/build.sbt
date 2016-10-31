val dependencies = Seq(
  "com.github.finagle" %% "finch-core" % "0.11.0-M4",
  "com.tokbox" % "opentok-server-sdk" % "2.3.2"
)

lazy val root = (project in file(".")).
  settings(
    name := "interactive-classroom-server",
    version := "1.0",
    scalaVersion := "2.11.8",
    libraryDependencies ++= dependencies
  )