variable name {
  type = string
  description = "Name of the service."
}

variable location {
  type = string
  description = "Location of the service."
}

variable image {
  type = string
  description = "Docker image name."
  default = "gcr.io/google-samples/hello-app:1.0"
}

variable cpus {
  type = number
  default = 1
  description = "Number of CPUs to allocate per container."
}

variable memory {
  type = number
  default = 512
  description = "Memory (in Mi) to allocate to containers. Minimum of 512Mi is required."
}

variable allow_public_access {
  type = bool
  default = false
  description = "Allow unauthenticated access to the service."
}

variable env {
  type = map(string)
  default = {}
  description = "Environment variables to inject into container instances."
}
