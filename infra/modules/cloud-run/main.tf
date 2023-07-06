resource google_cloud_run_service default {
  provider = google-beta
  name = var.name
  location = var.location

  template {
    spec {
      containers {
        image = var.image
        resources {
          limits = {
            cpu = "${var.cpus * 1000}m"
            memory = "${var.memory}Mi"
          }
        }

        # Populate straight environment variables.
        dynamic env {
          for_each = var.env

          content {
            name = env.key
            value = env.value
          }
        }

      }
    }
    metadata {
      annotations = merge({
        "run.googleapis.com/execution-environment" = "gen2"
      }, var.annotations)
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

}

resource google_cloud_run_service_iam_member public_access {
  count = var.allow_public_access ? 1 : 0
  service = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role = "roles/run.invoker"
  member = "allUsers"
}
