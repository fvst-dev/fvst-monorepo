# Branching / release strategy

You can use both release train or feature based releases

## Release train

For release train, you start a new feature branch from `develop`. Once you're ready to release your code you make a pull request against `develop`.
When your code is merged to `develop`, it is automatically deployed to the `staging` environment. You validate your code on there and once everyone is happy you merge
develop into `main` to release to `production`. A `production` release can include multiple features. It's done periodically, e.g. once an hour, once a day, once a week.

This strategy is simple, but has the downside that one feature might prevent another from being released (e.g. `develop` has two features merged into it, feature A is ready to go but feature B has bugs)

```mermaid
gitGraph
  commit id: "Initial ocommit"
  branch develop
  branch feature/JIRA-1
  checkout feature/JIRA-1
  commit id: "feat(one): Initial commit"
  commit id: "chore(one): Bug fixes"
  commit id: "docs(one): Added docs"
  checkout develop
  merge feature/JIRA-1 tag:"Release to staging"
  branch feature/JIRA-2
  checkout feature/JIRA-2
  commit id: "feat(two): Initial commit"
  commit id: "chore(two): Bug fixes"
  commit id: "docs(two): Added docs"
  checkout develop
  merge feature/JIRA-2 tag:"Release to staging"
  checkout main
  merge develop tag:"Release to production"
```

## Feature releases

For feature releases, you start your branch from `main`. Once your code is ready, you open a pull request against `develop` and once its merged it is automatically deployed to `staging`.
Once you've validated your code on `staging`, you create a new pull request from your feature branch to `main`. Once it's merged, your changes are automatically deployed to `production`.

This strategy is more complex as it requires multiple pull requests and needs a separate flow to sync `main` and `develop` branches after a feature release, but it allows each release to be deployed independently.

```mermaid
gitGraph
  commit id: "Initial commit"
  branch develop
  checkout main
  commit type:normal id:"Start JIRA-1"
  checkout main
  branch feature/JIRA-1
  checkout feature/JIRA-1
  commit id: "feat(one): Initial commit"
  commit id: "chore(one): Bug fixes"
  commit id: "docs(one): Added docs"
  checkout develop
  merge feature/JIRA-1 tag:"Release to staging"
  checkout main
  merge feature/JIRA-1 tag:"Release to production"
  commit type:normal  id:"Start JIRA-2"
  branch feature/JIRA-2
  checkout feature/JIRA-2
  commit id: "feat(two): Initial commit"
  commit id: "chore(two): Bug fixes"
  commit id: "docs(two): Added docs"
  checkout develop
  merge feature/JIRA-2 tag:"Release to staging"
  checkout main
  merge feature/JIRA-2 tag:"Release to production"
```
