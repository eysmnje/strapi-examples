export default {
  log(variable, ...arg) {
    
    if (process.env.NODE_ENV === 'production') return
    
    arg.length
      ? console.log(variable, arg)
      : console.log(variable)
  }
}
