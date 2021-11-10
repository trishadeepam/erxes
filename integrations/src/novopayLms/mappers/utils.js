export const getName = (parts, nameType) => {
  const name = {}
  if (parts.length === 1) {
    name.first = parts[0]
    name.middle = ''
    name.last = ''
  }
  if (parts.length === 2) {
    name.first = parts[0]
    name.last = parts[1]
    name.middle = ''
  }
  if (parts.length === 3) {
    name.first = parts[0]
    name.last = parts[parts.length - 1]
    name.middle = ' '.join(parts.slice(1, parts.length - 1))
  }
  return name[nameType]
}
export const getGender = (value) => {
  if (value === 1) {
    return 'MALE'
  } else if (value === 2) {
    return 'FEMALE'
  } else if (value === 9) {
    return 'OTHER'
  }
}
export const getSalutation = (gender, { maritalStatus }) => {
  if (gender === 1) {
    return 'MR'
  } else if (gender === 2) {
    if (maritalStatus === 'unmarried') {
      return 'Ms'
    } else {
      return 'Mrs'
    }
  } else {
    return ''
  }
}
