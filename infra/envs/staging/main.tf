module "google-services" {
  source = "../../modules/google-services"
}

module "clerk-secrets" {
  source     = "../../modules/clerk-secrets"
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
  location = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  clerk_api_secrets = module.clerk-secrets.api_secrets
  depends_on = [module.google-services, module.postgres, module.clerk-secrets]
}

module "todo-graphql" {
  source   = "../../services/todo-graphql"
  name = "todo-graphql"
  docker_tag = var.docker_tag
  project = var.project
  location = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  clerk_api_secrets = module.clerk-secrets.api_secrets
  depends_on = [module.google-services, module.postgres, module.clerk-secrets]
}

module "user-graphql" {
  source   = "../../services/user-graphql"
  name = "user-graphql"
  docker_tag = var.docker_tag
  project = var.project
  location = var.region
  postgres_instance_name = module.postgres.INSTANCE_NAME
  postgres_connection_name = module.postgres.CONNECTION_NAME
  clerk_api_secrets = module.clerk-secrets.api_secrets
  depends_on = [module.google-services, module.postgres, module.clerk-secrets]
}

module "graphql-gateway" {
  name                = "graphql-gateway"
  source              = "../../services/graphql-gateway"
  location            = var.region
  project = var.project
  docker_tag = var.docker_tag
  env = [
    { name: "TODO_SERVICE_URL", value: "${module.todo-graphql.url}/graphql" },
    { name: "BLOG_SERVICE_URL", value: "${module.blog-graphql.url}/graphql" },
    { name: "USER_SERVICE_URL", value: "${module.user-graphql.url}/graphql" },
  ]
  services = {
    todo: { project: var.project, location: var.region, service_name: module.todo-graphql.name },
    blog: { project: var.project, location: var.region, service_name: module.blog-graphql.name },
    user: { project: var.project, location: var.region, service_name: module.user-graphql.name },
  }
  depends_on = [module.blog-graphql, module.todo-graphql, module.user-graphql, module.google-services]
}

module "web" {
  source   = "../../services/web"
  name = "web"
  docker_tag = var.docker_tag
  project = var.project
  location = var.region
  graphql_gateway = "${module.graphql-gateway.url}/graphql"
  clerk_web_secrets = module.clerk-secrets.web_secrets
  depends_on = [module.google-services, module.graphql-gateway, module.clerk-secrets]
}
