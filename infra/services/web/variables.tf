variable name {
  type = string
  description = "Google cloud run name as well as docker container name"
}

variable region {
  type = string
  description = "Region"
}

variable "docker_tag" {
  type = string
  default = "latest"
}

variable project {
  type = string
  description = "Project id"
}

variable graphql_gateway {
  type = string
  description = "graphql gateway url"
}
