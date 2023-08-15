resource google_cloud_run_service default {
  provider = google-beta
  name = var.name
  location = var.location

  template {
    spec {

      service_account_name = var.service_account_name

      containers {
        image = var.image
        resources {
          limits = {
            cpu = "${var.cpus * 1000}m"
            memory = "${var.memory}Mi"
          }
        }

        dynamic "env" {
          for_each = try(var.env, [])

          content {
            name  = try(env.value.name, null)
            value = try(env.value.value, null)

            dynamic "value_from" {
              for_each = env.value.value_from != null ? [env.value.value_from] : []

              content {
                secret_key_ref {
                  key  = value_from.value.key
                  name = value_from.value.name
                }
              }
            }
          }
        }

      }
    }
    metadata {
      annotations = merge({
        "run.googleapis.com/execution-environment" = "gen2",
      }, var.annotations)

      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
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
