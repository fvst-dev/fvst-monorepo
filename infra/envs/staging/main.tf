module "google-services" {
  source = "../../modules/google-services"
}

module "secrets-manager" {
  source     = "../../modules/secrets-manager"
  location   = var.region
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
  image    = "${local.registry}/blog-graphql:latest"
  env = {
    NODE_ENV: "production",
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_BLOG,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
}

module "todo-graphql" {
  name     = "todo-graphql"
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "${local.registry}/todo-graphql:latest"
  env = {
    NODE_ENV: "production",
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_TODO,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
}

module "user-graphql" {
  name     = "user-graphql"
  source   = "../../modules/cloud-run"
  location = var.region
  image    = "${local.registry}/user-graphql:latest"
  env = {
    NODE_ENV: "production",
    CLERK_ISSUER : module.secrets-manager.CLERK_ISSUER,
    CLERK_JWSK_URL : module.secrets-manager.CLERK_JWSK_URL,
    DATABASE_URL : module.postgres.DATABASE_URL_USER,
  }
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
  annotations = {
    "run.googleapis.com/cloudsql-instances" = module.postgres.CONNECTION_NAME,
  }
}


module "graphql-gateway" {
  name                = "graphql-gateway"
  source              = "../../modules/cloud-run"
  location            = var.region
  image               = "${local.registry}/graphql-gateway:latest"
  env = {
    NODE_ENV: "production",
    TODO_SERVICE_URL : "${module.todo-graphql.url}/graphql"
    BLOG_SERVICE_URL : "${module.blog-graphql.url}/graphql"
    USER_SERVICE_URL : "${module.user-graphql.url}/graphql"
  }
  depends_on = [module.blog-graphql, module.todo-graphql, module.user-graphql, module.google-services]
  allow_public_access = true
}
