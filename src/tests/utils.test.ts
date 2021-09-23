import { 
  sortDeploymentsByDate, 
  findReleaseByDeployment, 
  retentionReason, 
  removeDuplicateReleases,
  formatOrdinals
} from '../utils'

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

    const reason0 = retentionReason(release, environment, 0)
    expect(reason0).toBe(`${release.Id} kept because it is the most recent deployment to ${environment.Id}`)

    const reason1 = retentionReason(release, environment, 1)
    expect(reason1).toBe(`${release.Id} kept because it is the 2nd most recent deployment to ${environment.Id}`)

    const reason2 = retentionReason(release, environment, 2)
    expect(reason2).toBe(`${release.Id} kept because it is the 3rd most recent deployment to ${environment.Id}`)

    const reason7 = retentionReason(release, environment, 7)
    expect(reason7).toBe(`${release.Id} kept because it is the 8th most recent deployment to ${environment.Id}`)

    const reason21 = retentionReason(release, environment, 21)
    expect(reason21).toBe(`${release.Id} kept because it is the 22nd most recent deployment to ${environment.Id}`)

    const reason32 = retentionReason(release, environment, 32)
    expect(reason32).toBe(`${release.Id} kept because it is the 33rd most recent deployment to ${environment.Id}`)

    const reason40 = retentionReason(release, environment, 40)
    expect(reason40).toBe(`${release.Id} kept because it is the 41st most recent deployment to ${environment.Id}`)
  })
})

describe('formatOrdinals', () => {
  it('returns the correct order suffix based on number', () => {
    const suffix1 = formatOrdinals(1)
    const suffix2 = formatOrdinals(2)
    const suffix3 = formatOrdinals(3)
    const suffix7 = formatOrdinals(7)
    const suffix11 = formatOrdinals(11)
    const suffix12 = formatOrdinals(12)
    const suffix21 = formatOrdinals(21)
    const suffix42 = formatOrdinals(42)
    const suffix73 = formatOrdinals(73)
    const suffix97 = formatOrdinals(97)

    expect(suffix1).toBe('1st')
    expect(suffix2).toBe('2nd')
    expect(suffix3).toBe('3rd')
    expect(suffix7).toBe('7th')
    expect(suffix11).toBe('11th')
    expect(suffix12).toBe('12th')
    expect(suffix21).toBe('21st')
    expect(suffix42).toBe('42nd')
    expect(suffix73).toBe('73rd')
    expect(suffix97).toBe('97th')
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


