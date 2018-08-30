import __ from './common'
import request from 'request'
import auth from './auth'

const headers = {'Content-Type':'application/x-www-form-urlencoded'}
const baseUrl = 'http://localhost:1337'

export default {
  options : {},
  callback : null,
  
  setOptions(obj){
    this.options = obj
    __.log('Requests.setOptions: ', this.options)
  },
  
  setCallback(callback){
    this.callback = callback
    __.log('Requests.setCallback: ', callback)
  },
  
  sendRequest(options, onSuccess){
    request(options, (error, response, body)=>{
      const parsedBody=JSON.parse(body)
      __.log('Requests.responses: ', error, response, parsedBody)
      
      const responses = {error, response, body : parsedBody}
      
      if(error) {
        //errorProcess
        this.runCallback(false, 'Error Response', responses)
          
      } else if(!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
        this.runCallback(false, 'Bad Statuscode', responses)
      
      } else {
        onSuccess(responses)
      }
    })
  },
  
  runCallback(isSuccess, message, responses = {}){
    if(this.callback) {
      __.log('Requests.runCallback: ', isSuccess, message, responses)
      this.callback(isSuccess, message, responses)
    
    } else {
      __.log('ERROR - Requests.runCallback: EmptyCallback')
    } 
  },
  
  //////////////////////////////////////////
  //////////////////////////////////////////
  
  login(loginId, password, callback) {
    this.setOptions({
      url : `${baseUrl}/auth/local`,
      method: 'POST',
      headers: headers,
      form: {identifier: loginId, password: password},
    })
    
    this.setCallback(callback)
    
    this.sendRequest(this.options, (responses) => {
      const body = responses.body
      
      if(!body.jwt){
        this.runCallback(false, 'No jwt Response', responses)
      
      } else {
        auth.setToken(body.jwt, body.rememberMe)
        auth.setUserInfo(body.user, body.rememberMe)
        
        this.runCallback(true, 'Login Success', responses)
      }  
    })
  },
  
  getAction(callback){
    const authorization = auth.getToken()
    this.setCallback(callback)
    
    if(!authorization) {
      this.runCallback(false, 'Not Login')
    }
    
    this.setOptions({
      url : `${baseUrl}/action`,
      method: 'GET',
      headers: {
        Authorization : `Bearer ${authorization}`,
        ...headers,
      }  
    })
    
    this.sendRequest(this.options, (responses)=> {
    })
  },
}
