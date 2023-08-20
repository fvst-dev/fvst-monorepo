# CI/CD

## Workflows

| Workflow                                                     | Trigger                   | Description                                                                                                  |
| ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [initialize](../../.github/workflows/initialize.yml)         | Manual trigger            | Used by the CLI to build containers and deploy the infrastructure                                            |
| [deploy](../../.github/workflows/deploy.yml)                 | Push on main / develop    | Builds new docker containers for all services and pushes to appropriate environment                          |
| [pull-request](../../.github/workflows/pull-request.yml)     | PR against main / develop | Runs linters and test suite on each PR against main and develop                                              |
| [terraform-plan](../../.github/workflows/terraform-plan.yml) | PR against main / develop | Runs terraform plan on each PR against main and develop and leaves the plan as a message on the pull request |
