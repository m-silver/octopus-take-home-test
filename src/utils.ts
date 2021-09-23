export const sortDeploymentsByDate = (deployments: Deployment[]): Deployment[] => {
  return deployments.sort((a, b) => {
    const timeA = new Date(a.DeployedAt).getTime()
    const timeB = new Date(b.DeployedAt).getTime()
    return timeB - timeA
  })
}

export const findReleaseByDeployment = (releases: Release[], deployment: Deployment): Release | undefined => {
  return releases.find(release => release.Id === deployment.ReleaseId)
}

export const retentionReason = (release: Release, environment: Environment, index?: number): string => {
  var reason = 'only'
  if (index === 0 || index) 
  switch (true) {
    case index === 0: 
      reason = 'most recent'; 
      break;
    case index === 1: 
      reason = '2nd most recent';
      break;
    case index === 2: 
      reason = '3rd most recent'; 
      break;
    case index > 3: 
      reason = `${index+1}th most recent`; 
      break;
  }
  return `${release.Id} kept because it is the ${reason} deployment to ${environment.Id}`
}

export const removeDuplicateReleases = (releases: Release[]): Release[] => {
  return releases.filter((release, index, releases) => 
    releases.findIndex(current => (current.Id === release.Id)) === index)
}
