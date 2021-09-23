import { 
  sortDeploymentsByDate, 
  findReleaseByDeployment, 
  retentionReason, 
  removeDuplicateReleases } from '../utils'

describe('sortDeploymentsByDate', () => {
  it('returns an array of deployments from most to least recent', () => {

    const deployments = [
      {
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "1999-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2001-01-01T10:00:00"
      },
      {
        "Id": "Deployment-3",
        "ReleaseId": "Release-3",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      }
    ]
    const sorted = sortDeploymentsByDate(deployments)

    expect(sorted[0].Id).toBe('Deployment-2')
    expect(sorted[2].Id).toBe('Deployment-1')
  })
})

describe('findReleaseByDeployment', () => {
  it('takes an array of releases and a deployment and returns a release matching a deployment', () => {
    const releases = [
      {
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },
      {
        "Id": "Release-2",
        "ProjectId": "Project-1",
        "Version": "1.0.1",
        "Created": "2000-01-02T09:00:00"
      }
    ]

    const deployment = {
      "Id": "Deployment-1",
      "ReleaseId": "Release-1",
      "EnvironmentId": "Environment-1",
      "DeployedAt": "1999-01-01T10:00:00"
    }

    const release = findReleaseByDeployment(releases, deployment)

    expect(release?.Id).toBe('Release-1')
  })
})

describe('retentionReason', () => {
  it('uses the correct releaseId and environmentId', () => {
    const release = {
      "Id": "Release-1",
      "ProjectId": "Project-1",
      "Version": "1.0.0",
      "Created": "2000-01-01T09:00:00"
    }
    const environment = {
      "Id": "Environment-1",
      "Name": "Staging"
    }

    const reason = retentionReason(release, environment)

    expect(reason).toContain('Release-1')
    expect(reason).toContain('Environment-1')
  })

  it('returns the correct reason for the only deployment', () => {
    const release = {
      "Id": "Release-1",
      "ProjectId": "Project-1",
      "Version": "1.0.0",
      "Created": "2000-01-01T09:00:00"
    }
    const environment = {
      "Id": "Environment-1",
      "Name": "Staging"
    }

    const reason = retentionReason(release, environment)
    const expectedReason = `${release.Id} kept because it is the only deployment to ${environment.Id}`

    expect(reason).toBe(expectedReason)
  })

  it('returns the correct reason for n deployments', () => {
    const release = {
      "Id": "Release-1",
      "ProjectId": "Project-1",
      "Version": "1.0.0",
      "Created": "2000-01-01T09:00:00"
    }
    const environment = {
      "Id": "Environment-1",
      "Name": "Staging"
    }

    const reason1 = retentionReason(release, environment, 0)
    const expectedReason1 = `${release.Id} kept because it is the most recent deployment to ${environment.Id}`

    expect(reason1).toBe(expectedReason1)

    const reason2 = retentionReason(release, environment, 1)
    const expectedReason2 = `${release.Id} kept because it is the 2nd most recent deployment to ${environment.Id}`

    expect(reason2).toBe(expectedReason2)

    const reason3 = retentionReason(release, environment, 2)
    const expectedReason3 = `${release.Id} kept because it is the 3rd most recent deployment to ${environment.Id}`

    expect(reason3).toBe(expectedReason3)

    const reason7 = retentionReason(release, environment, 6)
    const expectedReason7 = `${release.Id} kept because it is the 7th most recent deployment to ${environment.Id}`

    expect(reason7).toBe(expectedReason7)
  })
})

describe('removeDuplicateReleases', () => {
  it('removes duplicate release objects from an array of releases', () => {
    const releases = [
      {
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },
      {
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },
      {
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },
      {
        "Id": "Release-2",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      }
    ]

    const unique = removeDuplicateReleases(releases)

    expect(unique.length).toBe(2)
  })
})