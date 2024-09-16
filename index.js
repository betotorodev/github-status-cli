// import data from './data.json' with {type: 'json'}
import { getGithubCommits, getGithubRepos } from './parse-data.js'

const userName = process.argv.slice(2).join('')

if (!userName) {
  console.log('Please provide a Github user')
  process.exit(0)
}

let data = []
const API = `https://api.github.com/users/${userName}/events`

await fetch(API)
  .then(response => response.json())
  .then(githubInfo => {
    if (githubInfo.status === '404') {
      console.log('Usuario no encontrado. Verifica que el usuario exista')
      process.exit(0)
    }
    data = githubInfo
  })
  .catch(error => {
    console.log(error);
    process.exit(0);
  });

let separatedEvent = {}

for (let i = 0; i < data.length; i++) {
  const currentType = data[i].type
  if (separatedEvent[currentType]) {
    separatedEvent[currentType] = [...separatedEvent[currentType], data[i]]
  } else {
    separatedEvent[currentType] = [data[i]]
  }
}

getGithubCommits({ separatedEvent, event: 'PushEvent'})
getGithubRepos({ separatedEvent, event: 'CreateEvent'})

