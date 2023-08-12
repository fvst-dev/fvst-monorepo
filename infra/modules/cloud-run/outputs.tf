output url {
  value = google_cloud_run_service.default.status[0].url
  description = "URL at which the service is available."
}

output name {
  value = google_cloud_run_service.default.name
  description = "Name of service"
}
