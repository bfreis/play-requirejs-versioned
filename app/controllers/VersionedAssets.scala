package controllers

import play.api.mvc._
import scala.collection.concurrent.TrieMap
import com.google.common.hash.Hashing
import play.api.Play
import com.google.common.io.{InputSupplier, ByteStreams}
import java.io.InputStream
import play.api.Play.current

object VersionedAssets extends Controller {
  val AssetHash = TrieMap.empty[String, Option[String]]

  def getAsset(version: String, path: String, file: String) = Assets.at(path, file)

  def getUrl(file: String): String = {
    AssetHash.getOrElseUpdate(file, {
      Assets.resourceNameAt("/public", file).flatMap {
        resourceName =>
          Play.resourceAsStream(resourceName).map {
            inputStream =>
              val version = ByteStreams.hash(new InputSupplier[InputStream] {
                def getInput = inputStream
              }, Hashing.md5).toString
              "/versioned/" + version + controllers.routes.Assets.at(file).url
          }
      }
    }).getOrElse(controllers.routes.Assets.at(file).toString())
  }
}
