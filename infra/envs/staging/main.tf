module "google-services" {
  source  = "../../modules/google-services"
  project = var.project
}

module "container-registry" {
  source     = "../../modules/container-registry"
  location   = "eu"
  project    = var.project
  depends_on = [module.google-services]
}

module "redis" {
  source  = "../../modules/redis"
  project = var.project
  depends_on = [module.google-services]
}

module "postgres" {
  source  = "../../modules/postgres"
  project = var.project
  region  = var.region
}
