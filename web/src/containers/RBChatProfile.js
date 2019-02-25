import all from '../datas/all.json'
import profiles from '../datas/profiles.json'

const getProfile = () => profiles['1']

// Merge chat & profiles
const initProfile = () => {
  const json = Object.assign({}, all)
  return applyProfile(json)
}

const applyProfile = source => {
  for (let key in source) {
    const element = source[key]
    const profile = profiles[element.uid]
    source[key] = Object.assign({}, element, profile)
  }

  return source
}

export { getProfile, applyProfile, initProfile }
