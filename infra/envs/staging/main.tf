module "google-services" {
  source = "../../modules/google-services"
}

module "secrets-manager" {
  source     = "../../modules/secrets-manager"
  location   = var.region
  depends_on = [module.google-services]
}

module "container-registry" {
  source     = "../../modules/container-registry"
  location   = "eu"
  depends_on = [module.google-services]
}

module "redis" {
  source     = "../../modules/redis"
  depends_on = [module.google-services]
}

module "postgres" {
  source = "../../modules/postgres"
  region = var.region
}

module "blog-graphql" {
  name     = "blog-graphql"
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "${var.region}-docker.pkg.dev/${var.project}/registry/blog-graphql:latest"
  env = {
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_BLOG,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
  allow_public_access = true
}

module "todo-graphql" {
  name     = "todo-graphql"
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "${var.region}-docker.pkg.dev/${var.project}/registry/todo-graphql:latest"
  env = {
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_TODO,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
  allow_public_access = true
}

module "user-graphql" {
  name     = "user-graphql"
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "${var.region}-docker.pkg.dev/${var.project}/registry/user-graphql:latest"
  env = {
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_USER,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
  allow_public_access = true
}

module "graphql-gateway" {
  name                = "graphql-gateway"
  source              = "../../modules/cloud-run"
  location            = var.region
  image               = "${var.region}-docker.pkg.dev/${var.project}/registry/graphql-gateway:latest"
  env = {
    BLOG_SERVICE_URL : "${module.blog-graphql.url}/graphql"
  }
  depends_on = [module.blog-graphql, module.todo-graphql, module.user-graphql, module.google-services]
  allow_public_access = true
}
