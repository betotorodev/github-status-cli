export function getGithubCommits({separatedEvent, event}) {
  const PushEvent = separatedEvent[event]
  if (!PushEvent) {
    console.log('\nCommits:')
    console.log('No se han hecho commits')
    process.exit(0)
  }
  let separtedByDate = {}
  
  for (let i = 0; i < PushEvent.length; i++) {
    const currentDate = new Date(PushEvent[i].created_at).toLocaleDateString()
    if (separtedByDate[currentDate]) {
      separtedByDate[currentDate] = [...separtedByDate[currentDate], PushEvent[i]]
    } else {
      separtedByDate[currentDate] = [PushEvent[i]]
    }
  }
  
  const keys = Object.keys(separtedByDate)
  
  console.log('\nCommits:')
  for (let i = 0; i < keys.length; i++) {
    let count = 0
    let repos = []
    separtedByDate[keys[i]].forEach(item => {
      count += item.payload.commits.length
      if (!repos.includes(item.repo.name)) {
        repos.push(item.repo.name)
      }
    })
    console.log(`${keys[i]} Pushed ${String(count).padEnd(5)} commits to ${repos.join(',')}`)
  }
}

export function getGithubRepos({separatedEvent, event}) {
  const PushEvent = separatedEvent[event]
  if (!PushEvent) {
    console.log('\nRepos:')
    console.log('No se han credo repositorios')
    process.exit(0)
  }

  let separtedByDate = {}
  
  for (let i = 0; i < PushEvent.length; i++) {
    const currentDate = new Date(PushEvent[i].created_at).toLocaleDateString();

    if (!separtedByDate[currentDate]) {
      separtedByDate[currentDate] = [];
    }

    const repoName = PushEvent[i].repo.name;
    const isRepoAlreadyAdded = separtedByDate[currentDate].some(event => event.repo.name === repoName);

    if (isRepoAlreadyAdded) {
      continue;
    } else {
      separtedByDate[currentDate].push(PushEvent[i]);
    }
  }
  
  const keys = Object.keys(separtedByDate)

  console.log('\nRepos:')
  for (let i = 0; i < keys.length; i++) {
    separtedByDate[keys[i]].forEach(item => {
      console.log(`${keys[i]} create ${item.repo.name}`)
    })
  }
}