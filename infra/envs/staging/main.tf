module "google-services" {
  source = "../../modules/google-services"
}

module "secrets-manager" {
  source     = "../../modules/secrets-manager"
  project_id = var.project
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
  name = "blog-graphql"
  source   = "../../services/blog-graphql"
  docker_tag = var.docker_tag
  project = var.project
  region = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  shared_secrets = module.secrets-manager.SHARED_SECRETS
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
}

module "todo-graphql" {
  source   = "../../services/todo-graphql"
  name = "todo-graphql"
  docker_tag = var.docker_tag
  project = var.project
  region = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  shared_secrets = module.secrets-manager.SHARED_SECRETS
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
}

module "user-graphql" {
  source   = "../../services/user-graphql"
  name = "user-graphql"
  docker_tag = var.docker_tag
  project = var.project
  region = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  shared_secrets = module.secrets-manager.SHARED_SECRETS
  depends_on = [module.secrets-manager, module.google-services, module.postgres]
}

module "graphql-gateway" {
  name                = "graphql-gateway"
  source              = "../../modules/cloud-run"
  location            = var.region
  image               = "${local.registry}/graphql-gateway:latest"
  env = [
    { name: "NODE_ENV", value: "production" },
    { name: "TODO_SERVICE_URL", value: "${module.todo-graphql.url}/graphql" },
    { name: "BLOG_SERVICE_URL", value: "${module.blog-graphql.url}/graphql" },
    { name: "USER_SERVICE_URL", value: "${module.user-graphql.url}/graphql" },
  ]
  depends_on = [module.blog-graphql, module.todo-graphql, module.user-graphql, module.google-services]
  allow_public_access = true
}

module "web" {
  source   = "../../services/web"
  name = "web"
  project = var.project
  region = var.region
  graphql_gateway = "${module.graphql-gateway.url}/graphql"
  depends_on = [module.google-services, module.graphql-gateway]
}
