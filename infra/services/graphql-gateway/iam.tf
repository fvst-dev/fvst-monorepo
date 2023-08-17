resource "google_service_account" "service_account" {
  account_id  = "${var.name}-sa"
  description = "${var.name} SA"
}
data "google_iam_policy" "cloud_run_invoker_policy" {
  binding {
    role = "roles/run.invoker"
    members = [
      "serviceAccount:${google_service_account.service_account.email}",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "access_to_service" {
  for_each = var.services
  location = each.value.location
  project  = each.value.project
  service  = each.value.service_name
  policy_data = data.google_iam_policy.cloud_run_invoker_policy.policy_data
}

resource "null_resource" "iam_depends_on" {
  depends_on = [google_cloud_run_service_iam_policy.access_to_service]
  provisioner "local-exec" {
    command = "sleep 30"
  }
}

