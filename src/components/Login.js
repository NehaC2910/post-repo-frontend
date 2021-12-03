// import React,{useState} from 'react'
// import {NavLink ,useHistory} from 'react-router-dom'

// function Login() {
//   const history = useHistory() 
//   const [errors, setErrors] = useState({})
//   const [fields, setFields] = useState({}) 
//    const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   const loginHandler = async (e)=>{
//     console.log("fields",fields)
//     const {  username, password} = fields

//     e.preventDefault()

//     const res = await fetch('http://3.138.93.70:8081/api/login',{
//       method: 'POST',
//       headers: {
//         "Content-type":"application/json"
//       },
//       body: JSON.stringify({
//         username,
//         password
//       })
//     })
//     const data = res.json()
//     if(res.status === 401 || !data){
//       alert('Invalid login')
//     }
//     else if(res.status === 200){
//       alert('Login successful')
//       history.push('/home')
//     }

//   }

//  const handleChange = (e)=> {
//     // let field = fields;
//     fields[e.target.name] = e.target.value;
//     setFields({ z fields });
  
//   validateForm()
//   }



//   const  validateForm =()=> {

//     let fields = fields;
//     let errors = {};
//     let formIsValid = true;

   
//     if (!username && username =="" ) {
//       formIsValid = false;
//       errors["username"] = "*Please enter your username";
//     }

//     if (typeof username !== "undefined") {
//       //regular expression for email validation
//       var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//       if (!pattern.test(username)) {
//         formIsValid = false;
//         errors["username"] = "*Please enter valid username.";
//       }
//     }


//     if (!password && password == "") {
//       formIsValid = false;
//       errors["password"] = "*Please enter your password.";
//     }

//     if (typeof password !== "undefined") {
//       if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//         formIsValid = false;
//         errors["password"] =  `*Please enter secure and strong password. "And must contain at least 8-16 characters,A lowercase ,A capital(upperCase), A Number and Special characters"`
//       }
//     }

    
//     setErrors({errors})

//     console.log("formIsValid",formIsValid,errors)

//     return formIsValid;


//   }


//     return (
//         <div>
//         {/* <form class="login" method="post">
//         <input type="text"     value={username} name="Username" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
//         <input type="password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
       
      
//         <button onClick={loginHandler}>Login</button>
        
//           <NavLink to="/register">
//           <button className="registerButton"> Create an account </button>
//           </NavLink>
    
//         </form> */}



//         <form  class="login" method="post"  name="userRegistrationForm"   >
       
//         <label>User name:</label>
//         <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange}  />
//         <div className="errorMsg">{this.state.errors.username}</div>
        
//         <label>Password</label>
//         <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.password}</div>

//         <button onClick={this.submituserRegistrationForm}>Login</button>

//         {/* <div className="errorMsg"> {this.state.alreadyRegistered && "ALREADY REGISTERED"} </div> */}
//         <NavLink to="/register"> <button className="registerButton">Registration</button> </NavLink>
//         </form>
//       </div>
//     )
// }

// export default Login










import React, { Component}from 'react'
import { Redirect , Route } from 'react-router-dom';
import {NavLink } from 'react-router-dom'


class LoginForm extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        loginError:"",
        loginSuccessfull : false,
        loginSuccessfullData:[]
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    
    this.validateForm()
    }

    submituserRegistrationForm = async(e) => {
        
    //   console.log(this.validateForm());
    const {  username, password} = this.state.fields
      
      e.preventDefault();
      try{
      if (this.validateForm()) {
         
          const res = await fetch('http://3.138.93.70:8081/api/login',{
                method:"POST",
                headers:{
                    // "access-control-allow-origin" : "*",
                    "Content-type":"application/json"
                }, 
                body:JSON.stringify({
                   username, password
                })

            })

            const data =await res.json()
            this.setState({
              loginSuccessfullData :data
            });
           
            console.log("Login dataaaa",data)

            if(res.status === 200 ){
           
              // const data =await res.json()
              console.log("###",this.history)

                  sessionStorage.setItem("jwttoken",data.jwttoken)
                  sessionStorage.setItem("user",JSON.stringify(data.user))
                  this.setState({ loginSuccessfull : true });

                
            }

            else if(data.status === 103 || !data){
                this.setState({
                    loginError :data.message
                  });
            }
            else if(data.status === 101 || !data){
              this.setState({
                  loginError :data.message
                });
            }
            else{
              alert("TRY something went wrong")
            }
            
      }
    }
    catch (err) {
      alert("something went wrong")
    }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

   
    
      if (!fields["username"]  && fields["username"] =="" ) {
        formIsValid = false;
        errors["username"] = "*Please enter your username";
      }

      if (typeof fields["username"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["username"])) {
          formIsValid = false;
          errors["username"] = "*Please enter valid username.";
        }
      }

     

      // if (!fields["password"] && fields["password"] == "") {
      //   formIsValid = false;
      //   errors["password"] = "*Please enter your password.";
      // }

      // if (typeof fields["password"] !== "undefined") {
      //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      //     formIsValid = false;
      //     errors["password"] =  `*Please enter secure and strong password. "And must contain at least 8-16 characters,A lowercase ,A capital(upperCase), A Number and Special characters"`
      //   }
      // }

      this.setState({
        errors: errors
      });

      console.log("formIsValid",formIsValid,errors)

      return formIsValid;


    }



  render() {
      if(this.state.loginSuccessfull && this.state.loginSuccessfullData){
      
          return<Redirect  to="/home" />
          
      } 

    return (
      <div>

<form  class="login" method="post"  name="userRegistrationForm"   >
<div className="errorMsg">{ this.state.loginError && this.state.loginError}</div>

       <label>User name:</label>
       <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange}  />
       <div className="errorMsg">{this.state.errors.username}</div>
       
       <label>Password</label>
       <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
       <div className="errorMsg">{this.state.errors.password}</div>

       <button onClick={this.submituserRegistrationForm}>Login</button>

       {/* <div className="errorMsg"> {this.state.alreadyRegistered && "ALREADY REGISTERED"} </div> */}
       <NavLink to="/register"> <button className="registerButton">Registration</button> </NavLink>
       </form>
    </div>

      );
  }


}

export default LoginForm
