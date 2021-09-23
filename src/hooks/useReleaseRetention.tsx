import { 
  findReleaseByDeployment, 
  retentionReason, 
  sortDeploymentsByDate, 
  removeDuplicateReleases } from '../utils'

type UseReleaseRetentionArgs = {
  numberOfReleases: number
  deployments: Deployment[]
  environments: Environment[]
  projects: Project[]
  releases: Release[]
}

const useReleaseRetention = ({numberOfReleases, deployments, environments, projects, releases}: UseReleaseRetentionArgs) => {
  const toRetain: Release[] = []

  projects.forEach(project => {
    const projectReleases = releases.filter(release => release.ProjectId === project.Id)
    const projectDeployments = projectReleases.map(projectRelease => deployments.filter(deployment => deployment.ReleaseId === projectRelease.Id)).flat()

    environments.forEach(environment => {
      const deploymentsToEnvironment = projectDeployments.filter(projectDeployment => projectDeployment.EnvironmentId === environment.Id)

      if (deploymentsToEnvironment.length === 1) {
        const releaseToRetain = findReleaseByDeployment(projectReleases, deploymentsToEnvironment[0])
        if (releaseToRetain) {
          toRetain.push(releaseToRetain)
          console.log(retentionReason(releaseToRetain, environment))
        }
        else console.error(`Release ${deploymentsToEnvironment[0].ReleaseId} not found.`)
      }

      if (deploymentsToEnvironment.length > 1) {
        const sorted = sortDeploymentsByDate(deploymentsToEnvironment)
        for (let i = 0; i < numberOfReleases && i < sorted.length; i++) {
          const releaseToRetain = findReleaseByDeployment(projectReleases, deploymentsToEnvironment[i])
          if (releaseToRetain) {
            toRetain.push(releaseToRetain)
            console.log(retentionReason(releaseToRetain, environment, i))
          }           
          else console.error(`Release ${deploymentsToEnvironment[0].ReleaseId} not found.`)
        }
      }
    })
  })

  return removeDuplicateReleases(toRetain)
}

export default useReleaseRetention
