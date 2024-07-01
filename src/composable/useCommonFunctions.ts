export function isNullBlank(variable: any) {
    if (variable == null || variable == '' || variable == undefined) {
      return true
    }
  
    return false
  }