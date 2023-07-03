module "google-services" {
  source  = "../../modules/google-services"
}

module "secrets-manager" {
  source     = "../../modules/secrets-manager"
  location = var.region
  depends_on = [module.google-services]
}

module "container-registry" {
  source     = "../../modules/container-registry"
  location   = "eu"
  depends_on = [module.google-services]
}

module "redis" {
  source  = "../../modules/redis"
  depends_on = [module.google-services]
}

module "postgres" {
  source  = "../../modules/postgres"
  region  = var.region
}

module "blog-graphql" {
  name = "blog-graphql"
  source = "../../modules/cloud-run"
  location = var.region
  env = {
    CLERK_ISSUER:  module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL: module.secrets-manager.CLERK_JWSK_URL,
  }
  depends_on = [module.secrets-manager, module.google-services]
}

module "graphql-gateway" {
  name = "graphql-gateway"
  source = "../../modules/cloud-run"
  location = var.region
  allow_public_access = true
  env = {
    BLOG_SERVICE_URL: "${module.blog-graphql.url}/graphql"
  }
  depends_on = [module.blog-graphql, module.google-services]
}
