resource "google_redis_instance" "cache" {
  project = var.project
  name           = "memory-cache"
  memory_size_gb = 1
}
