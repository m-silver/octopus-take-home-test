import { 
  findReleaseByDeployment, 
  retentionReason, 
  sortDeploymentsByDate, 
  removeDuplicateReleases 
} from '../utils'

type UseReleaseRetentionArgs = {
  numberOfReleases: number
  deployments: Deployment[]
  environments: Environment[]
  projects: Project[]
  releases: Release[]
}

const useReleaseRetention = ({numberOfReleases, deployments, environments, projects, releases}: UseReleaseRetentionArgs) => {
  const retainedReleases: Release[] = []

  projects.forEach(project => {
    const projectReleases = releases.filter(release => release.ProjectId === project.Id)
    const projectDeployments = projectReleases.map(projectRelease => deployments.filter(deployment => deployment.ReleaseId === projectRelease.Id)).flat()

    environments.forEach(environment => {
      const deploymentsToEnvironment = projectDeployments.filter(projectDeployment => projectDeployment.EnvironmentId === environment.Id)
      const sortedDeployments = sortDeploymentsByDate(deploymentsToEnvironment)

      for (let i = 0; i < numberOfReleases && i < sortedDeployments.length; i++) {
        const releaseToRetain = findReleaseByDeployment(projectReleases, deploymentsToEnvironment[i])
        if (releaseToRetain) {
          retainedReleases.push(releaseToRetain)
          console.log(retentionReason(releaseToRetain, environment, deploymentsToEnvironment.length === 1 ? undefined : i))
        }           
        else console.error(`Release ${deploymentsToEnvironment[0].ReleaseId} not found.`)
      }
    })
  })

  return removeDuplicateReleases(retainedReleases)
}

export default useReleaseRetention
