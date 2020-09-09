export const syncStateAndLocalStorage = (pesrsistedValues) => {
  const localStorageValues = {}
  const stateKeys = Object.keys(pesrsistedValues)

  stateKeys.forEach(currentKey => {
    if (localStorage.getItem(currentKey) === null) {
      const stringKeyValue = JSON.stringify(pesrsistedValues[currentKey])
      localStorage.setItem(currentKey, stringKeyValue)
    }
    const stringLocalStorageValue = localStorage.getItem(currentKey)
    const jsonLocalStorageValue = JSON.parse(stringLocalStorageValue)
    localStorageValues[currentKey] = jsonLocalStorageValue
  })

  return localStorageValues
}

export const updateLocalStorageByState = (object) => {
  const stateKeys = Object.keys(object)
  stateKeys.forEach(stateKeys => {
    const json = JSON.stringify(object[stateKeys])
    localStorage.setItem(stateKeys, json)
  })
}