import useReleaseRetention from '../hooks/useReleaseRetention'

describe('useReleaseRetention', () => {
  it('returns the correct (n) number of releases per project/environment', () => {
    const projects = [
      {
        "Id": "Project-1",
        "Name": "Random Quotes"
      }
    ]
    const deployments = [
      {
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T10:00:00"
      },
      {
        "Id": "Deployment-3",
        "ReleaseId": "Release-3",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T11:00:00"
      }
    ]
    const environments = [
      {
        "Id": "Environment-1",
        "Name": "Staging"
      }
    ]
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
      },
      {
        "Id": "Release-3",
        "ProjectId": "Project-1",
        "Version": null,
        "Created": "2000-01-02T13:00:00"
      }
    ]
    
    const releasesToRetain = useReleaseRetention({
      projects, 
      deployments, 
      environments, 
      releases, 
      numberOfReleases: 2
    })

    expect(releasesToRetain).toHaveLength(2)
  })

  it('logs a reason of why the release was kept', () => {
    console.log = jest.fn()

    const projects = [
      {
        "Id": "Project-1",
        "Name": "Random Quotes"
      }
    ]
    const deployments = [
      {
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T10:00:00"
      },
      {
        "Id": "Deployment-3",
        "ReleaseId": "Release-3",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T11:00:00"
      }
    ]
    const environments = [
      {
        "Id": "Environment-1",
        "Name": "Staging"
      }
    ]
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
      },
      {
        "Id": "Release-3",
        "ProjectId": "Project-1",
        "Version": null,
        "Created": "2000-01-02T13:00:00"
      }
    ]
    
    const releasesToRetain = useReleaseRetention({
      projects,
      deployments, 
      environments, 
      releases, 
      numberOfReleases: 3
    })

    expect(console.log).toHaveBeenCalledTimes(3)
  })

  it('applies the release retention rule correctly to each project/environment combo', () => {
    const projects = [
      {
        "Id": "Project-1",
        "Name": "Random Quotes"
      },
      {
        "Id": "Project-2",
        "Name": "Pet Shop"
      }
    ]
    const deployments = [
      {
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-2",
        "DeployedAt": "2000-01-02T10:00:00"
      },
      {
        "Id": "Deployment-3",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-2",
        "DeployedAt": "2000-01-02T11:00:00"
      },
      {
        "Id": "Deployment-4",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-3",
        "DeployedAt": "2000-01-02T12:00:00"
      },
      {
        "Id": "Deployment-5",
        "ReleaseId": "Release-5",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T11:00:00"
      },
      {
        "Id": "Deployment-6",
        "ReleaseId": "Release-6",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T10:00:00"
      },
      {
        "Id": "Deployment-7",
        "ReleaseId": "Release-6",
        "EnvironmentId": "Environment-2",
        "DeployedAt": "2000-01-02T11:00:00"
      },
      {
        "Id": "Deployment-8",
        "ReleaseId": "Release-7",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T13:00:00"
      },
      {
        "Id": "Deployment-9",
        "ReleaseId": "Release-6",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-02T14:00:00"
      },
      {
        "Id": "Deployment-10",
        "ReleaseId": "Release-8",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      }
    ]
    const environments = [
      {
        "Id": "Environment-1",
        "Name": "Staging"
      },
      {
        "Id": "Environment-2",
        "Name": "Production"
      }
    ]
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
      },
      {
        "Id": "Release-3",
        "ProjectId": "Project-1",
        "Version": null,
        "Created": "2000-01-02T13:00:00"
      },
      {
        "Id": "Release-4",
        "ProjectId": "Project-2",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },
      {
        "Id": "Release-5",
        "ProjectId": "Project-2",
        "Version": "1.0.1-ci1",
        "Created": "2000-01-01T10:00:00"
      },
      {
        "Id": "Release-6",
        "ProjectId": "Project-2",
        "Version": "1.0.2",
        "Created": "2000-01-02T09:00:00"
      },
      {
        "Id": "Release-7",
        "ProjectId": "Project-2",
        "Version": "1.0.3",
        "Created": "2000-01-02T12:00:00"
      },
      {
        "Id": "Release-8",
        "ProjectId": "Project-3",
        "Version": "2.0.0",
        "Created": "2000-01-01T09:00:00"
      }
    ]

    const releasesToRetain = useReleaseRetention({
      projects, 
      deployments, 
      environments, 
      releases, 
      numberOfReleases: 1
    })

    expect(releasesToRetain).toContainEqual(expect.objectContaining(
      { Id: 'Release-1' }
    ))
    expect(releasesToRetain).toContainEqual(expect.objectContaining(
      { Id: 'Release-2' }
    ))
    expect(releasesToRetain).toContainEqual(expect.not.objectContaining(
      { Id: 'Release-3' }
    ))
    expect(releasesToRetain).toContainEqual(expect.not.objectContaining(
      { Id: 'Release-4' }
    ))
    expect(releasesToRetain).toContainEqual(expect.not.objectContaining(
      { Id: 'Release-5' }
    ))
    expect(releasesToRetain).toContainEqual(expect.objectContaining(
      { Id: 'Release-6' }
    ))
    expect(releasesToRetain).toContainEqual(expect.not.objectContaining(
      { Id: 'Release-7' }
    ))
    expect(releasesToRetain).toContainEqual(expect.not.objectContaining(
      { Id: 'Release-8' }
    ))
  })
})