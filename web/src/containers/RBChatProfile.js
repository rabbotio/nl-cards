import all from '../datas/all.json'
import profiles from '../datas/profiles.json'

const getProfile = () => profiles['1']

const initContext = () => {
  for (let key in all) all[key].context = key
}
initContext()

// Merge chat & profiles
const initProfile = () => {
  // Apply profile
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
