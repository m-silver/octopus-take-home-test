import React from 'react'
import useReleaseRetention from './hooks/useReleaseRetention'

import Deployments from './data/Deployments.json'
import Environments from './data/Environments.json'
import Projects from './data/Projects.json'
import Releases from './data/Releases.json'

function App() {
  const releaseRetentionArgs = {
    numberOfReleases: 1,
    deployments: Deployments,
    environments: Environments,
    projects: Projects,
    releases: Releases
  }
  const retainedReleases = useReleaseRetention(releaseRetentionArgs)
  
  console.log('Retained releases: ', retainedReleases)

  return (
    <div className="App">
    </div>
  )
}

export default App
