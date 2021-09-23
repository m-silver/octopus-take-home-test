type Deployment = {
  Id: string
  ReleaseId: string
  EnvironmentId: string
  DeployedAt: string //note ISO-8601 date string
}

type Environment = {
  Id: string
  Name: string
}

type Project = {
  Id: string
  Name: string
}

type Release = {
  Id: string
  ProjectId: string
  Version: string | null //note semver 
  Created: string //note ISO-8601 date string
}
