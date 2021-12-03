// import React,{useState} from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import {NavLink } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye,faTimes,faCheck,faEyeSlash } from '@fortawesome/free-solid-svg-icons'




// function Register() {
//     const history =useHistory()
//     const [Show, setShow] = useState(false)
//     const [matchPasswoed, setMatchPasswoed] = useState(false)
//     const [blankField, setBlankField] = useState(false)
//     const [password, setpassword] = useState("")
//     const [user, setUser] = useState({
//         firstName:"",lastName:"", username:"",phoneNumber:"" ,cPassword:""})

//        let name,value;
//         const handleInput = (e)=>{
//             console.log("ee",e.target)
//             name=e.target.name;
//             value=e.target.value
//             setUser({...user,[name]:value})
//         }
//         const valid =(item , v_icon, inv_icon)=>{
//             let text = document.querySelectorAll(`#${item}`);
//             text.style.opacity = 1

//             let valid_icon = document.querySelectorAll(`#${item} .${v_icon}`);
//             valid_icon.style.opacity = 1

//             let invalid_icon = document.querySelectorAll(`#${item} .${inv_icon}`);
//             invalid_icon.style.opacity = 0
//         }
//         const invalid =(item , v_icon, inv_icon)=>{
//             // let text = document.querySelectorAll(`#${item}`);
//             // text.style.opacity = "0"

//             // let valid_icon = document.querySelectorAll(`#${item} .${v_icon}`);
//             // valid_icon.style.opacity = "0"

//             // let invalid_icon = document.querySelectorAll(`#${item} .${inv_icon}`);
//             // invalid_icon.style.opacity = "1"
//         }

//         const showHide = ()=>{
//             setShow(!Show)
//         }
//         const passwordHandleInput = (e)=>{
           
//             const password=e.target.value;
           
//             if(password.match(/[A-Z]/) != null ){
//                 valid("capital","fa-check", "fa-times")
//             }
//             else{
//                 invalid("capital","fa-check", "fa-times")
//             }
//             if(password.match(/[0-9]/) != null ){
//                 valid("num","fa-check", "fa-times")
//             }
//             else{
//                 invalid("num","fa-check", "fa-times")
//             }
//             if(password.match(/[!@#$%^&*]/) != null ){
//                 valid("char","fa-check", "fa-times")
//             }
//             else{
//                 invalid("char","fa-check", "fa-times")
//             }
//             // if(password.value.length > 7 ){
//             //     valid("more8","fa-check", "fa-times")
//             // }
//             // else{
//             //     invalid("more8","fa-check", "fa-times")
//             // }
//             setpassword(password)
//         }
        
//         const handleRegister= async(e)=>{
//              e.preventDefault();
//              console.log("password",password)
//             const {   firstName, lastName, username, phoneNumber , cPassword} = user
//             console.log("password",cPassword)
//             if (!firstName || !lastName || !phoneNumber || !username || !password || !cPassword) {
//                 setBlankField(true)
//             }

//             else if(password !== cPassword){
//                 setMatchPasswoed(true)
//                 setBlankField(false)
//             }
           
//              if(password === cPassword){
//                 setMatchPasswoed(false)
//                 setBlankField(false)

//             const res = await fetch('http://3.138.93.70:8081/api/register',{
//                 method:"POST",
//                 headers:{
//                     "access-control-allow-origin" : "*",
//                     "Content-type":"application/json"
//                 }, 
//                 body:JSON.stringify({
//                     firstName,lastName, username, phoneNumber, password
//                 })

//             })

//             const data = res.json()
//             if(res.status === 406 || !data){
//                 window.alert("invalid user")
//                 alert("invalid")
//             }
//             else if(res.status === 200 ){
//                 alert("success")
//                 history.push('/home')
//             }

//         }

        
        
//         }


//     return (

//         <div>   

//         <form className="registration" method="POST" >
//         <div style={{color: 'red'}}>{blankField && "BLANK FIELD NOT ALLOWED"}</div>
//         <input type="text"    value={user.firstName}     onChange={handleInput} name="firstName" placeholder="First name" />
//         <input type="text"    value={user.lastName}     onChange={handleInput} name="lastName" placeholder="Last name" />
//         <input type="text"    value={user.username}        onChange={handleInput} name="username" placeholder="Username" />
//         <input type="text"    value={user.phoneNumber} onChange={handleInput} name="phoneNumber" placeholder="Mobile number" />
//         <input type={Show ?"text":"password"} value={user.password}     onChange={passwordHandleInput} name="password"  placeholder="Password" className='password' />
//         {Show ? 
//         <FontAwesomeIcon icon={faEye}  id="show_hide" onClick={showHide}/>
//             :
//             <FontAwesomeIcon icon={faEyeSlash}  id="show_hide" onClick={showHide}/>
//             }
//         <p id='capital' className='passValidation'>
            
//         <FontAwesomeIcon icon={faTimes} className='fa-times icon'/>
//         <FontAwesomeIcon icon={faCheck} className='fa-check icon'/>
//         <span>Capital letter</span>
//         </p>
//         <p id='char ' className='passValidation'>
//         <FontAwesomeIcon icon={faTimes}  className='fa-times icon'/>
//         <FontAwesomeIcon icon={faCheck}  className='fa-check icon'/>
//         <span>Special character</span>
//         </p>
//         <p id='num' className='passValidation'>
//         <FontAwesomeIcon icon={faTimes}  className='fa-times icon' />
//         <FontAwesomeIcon icon={faCheck}  className='fa-check icon'/>
//         <span>Use Numbers</span>
//         </p>
//         <p id='more8' className='passValidation'>
//         <FontAwesomeIcon icon={faTimes}  className='fa-times icon'/>
//         <FontAwesomeIcon icon={faCheck}  className='fa-check icon'/>
//         <span>8+ character</span>
//         </p>
        
//         <i className="fas" ></i>
//         <div style={{color: 'red'}}>{matchPasswoed && "Please make sure your passwords match"}</div>
//         <input type="password"value={user.cPassword}    onChange={handleInput} name="cPassword"  placeholder="Confirm Password" />
//         <button onClick={(e)=>handleRegister(e)}>registration</button>
//         <NavLink to="/"> <button className="registerButton">Back To Login</button> </NavLink>
//         </form>
//       </div>
//     )
// }

// export default Register

import React, { Component}from 'react'
import { Redirect , Route } from 'react-router-dom';
import {NavLink } from 'react-router-dom'


class RegisterForm extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        alreadyRegistered:false,
        loginSuccessfull : false
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
    const { firstName,lastName, username, phoneNumber, password} = this.state.fields
      
      e.preventDefault();
      try{
      if (this.validateForm()) {
          console.log(this.state);
          const res = await fetch('http://3.138.93.70:8081/api/register',{
                method:"POST",
                headers:{
                    "access-control-allow-origin" : "*",
                    "Content-type":"application/json"
                }, 
                body:JSON.stringify({
                    firstName,lastName, username, phoneNumber, password
                })

            })

            const data = res.json()
            if(res.status === 409 || !data){
                console.log("PRops",this.props.history)
                // alert("ALREADY REGISTERED")
                this.setState({
                    alreadyRegistered:true
                  });
            }
            else if(res.status === 200 ){
                this.setState({ loginSuccessfull : true });
                // return   <Redirect to= "/"/>
                // alert("success")
                // this.props.history.push('/home')
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

      if (!fields["firstName"] && fields["firstName"] =="") {
        formIsValid = false;
        errors["firstName"] = "*Please enter your username.";
      }

      if (typeof fields["firstName"] !== "undefined") {
        if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["firstName"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["lastName"] && fields["lastName"] =="") {
        formIsValid = false;
        errors["lastName"] = "*Please enter your username.";
      }

      if (typeof fields["lastName"] !== "undefined") {
        if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastName"] = "*Please enter alphabet characters only.";
        }
      }

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

      if (!fields["phoneNumber"] && fields["phoneNumber"] == "") {
        formIsValid = false;
        errors["phoneNumber"] = "*Please enter your mobile no.";
      }

      if (typeof fields["phoneNumber"] !== "undefined") {
        if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["phoneNumber"] = "*Please enter valid mobile no.";
        }
      }

      if (!fields["password"] && fields["password"] == "") {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] =  `*Please enter secure and strong password. "And must contain at least 8-16 characters,A lowercase ,A capital(upperCase), A Number and Special characters"`
        }
      }

      this.setState({
        errors: errors
      });

      console.log("formIsValid",formIsValid,errors)

      return formIsValid;


    }



  render() {
      if(this.state.loginSuccessfull){
      
          return<Redirect  to="/" />
          
      } 

    return (
    <div id="main-registration-container">
     <div id="">
        {/* <h3>Registration page</h3> */}
        <form method="post"  name="userRegistrationForm" className="registration">
        <label>First Name</label>
        <input type="text" name="firstName" value={this.state.fields.firstName} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.firstName}</div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={this.state.fields.lastName} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.lastName}</div>
        <label>User name:</label>
        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.username}</div>
        <label>Mobile No:</label>
        <input type="text" name="phoneNumber" value={this.state.fields.phoneNumber} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.phoneNumber}</div>
        <label>Password</label>
        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
        {/* <input type="submit" className="button"  value="Register"/> */}
        <button onClick={this.submituserRegistrationForm}>Register</button>
        <NavLink to="/"> <button className="registerButton">Back To Login</button> </NavLink>
        <div className="errorMsg"> {this.state.alreadyRegistered && "ALREADY REGISTERED"} </div>
        </form>
       

    </div>
</div>

      );
  }


}

export default RegisterForm
// ReactDOM.render(<RegisterForm/>, document.getElementById('root'));




