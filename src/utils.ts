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
  let reason = 'only'
  if (index === 0) reason = 'most recent'
  if (index && index > 0) reason = `${formatOrdinals(index+1)} most recent`

  return `${release.Id} kept because it is the ${reason} deployment to ${environment.Id}`
}

export const removeDuplicateReleases = (releases: Release[]): Release[] => {
  return releases.filter((release, index, releases) => 
    releases.findIndex(current => (current.Id === release.Id)) === index)
}

export const formatOrdinals = (ordinal: number): string => {
const pr = new Intl.PluralRules('en-US', { type: 'ordinal' })

const suffixes = new Map([
  ['one',   'st'],
  ['two',   'nd'],
  ['few',   'rd'],
  ['other', 'th'],
]);

const rule = pr.select(ordinal)
const suffix = suffixes.get(rule)

return `${ordinal}${suffix}`
}
