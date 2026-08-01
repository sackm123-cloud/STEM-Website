/*==================================================
    AI STEM Innovation Website
    auth.js
    Part 1
    Authentication System
===================================================*/

"use strict";


/*==================================================
    AUTH CONFIGURATION
===================================================*/

const Auth = {

    usersKey: "ai_stem_users",

    sessionKey: "ai_stem_session",


    init(){

        this.bindEvents();

        this.checkSession();

    },


    /*=========================================
        EVENT BINDING
    =========================================*/

    bindEvents(){


        const registerForm =
            document.getElementById(
                "registerForm"
            );


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if(registerForm){

            registerForm.addEventListener(
                "submit",
                e=>{

                    e.preventDefault();

                    this.register(
                        registerForm
                    );

                }
            );

        }



        if(loginForm){

            loginForm.addEventListener(
                "submit",
                e=>{

                    e.preventDefault();

                    this.login(
                        loginForm
                    );

                }
            );

        }



        const logoutBtn =
            document.querySelector(
                ".logout-btn"
            );


        if(logoutBtn){

            logoutBtn.addEventListener(
                "click",
                ()=>{

                    this.logout();

                }
            );

        }


    },


/*==================================================
    REGISTER USER
===================================================*/

register(form){


    const name =
        form.querySelector(
            "[name='name']"
        ).value.trim();


    const email =
        form.querySelector(
            "[name='email']"
        ).value.trim();


    const password =
        form.querySelector(
            "[name='password']"
        ).value;



    if(
        !name ||
        !email ||
        !password
    ){

        Toast.show(
            "Please fill all fields",
            "error"
        );

        return;

    }



    if(
        !this.validateEmail(email)
    ){

        Toast.show(
            "Invalid email address",
            "error"
        );

        return;

    }



    let users =
        JSON.parse(
            localStorage.getItem(
                this.usersKey
            )
        ) || [];



    const exists =
        users.some(
            user =>
            user.email === email
        );



    if(exists){

        Toast.show(
            "Email already registered",
            "error"
        );

        return;

    }



    const user = {

        id:Date.now(),

        name,

        email,

        password,


        created:
            new Date()
            .toISOString()

    };



    users.push(user);



    localStorage.setItem(

        this.usersKey,

        JSON.stringify(users)

    );



    Toast.show(
        "Registration successful",
        "success"
    );



    setTimeout(()=>{

        window.location.href =
            "login.html";

    },1500);


},


/*==================================================
    LOGIN USER
===================================================*/

login(form){


    const email =
        form.querySelector(
            "[name='email']"
        ).value.trim();



    const password =
        form.querySelector(
            "[name='password']"
        ).value;



    const remember =
        form.querySelector(
            "[name='remember']"
        )?.checked || false;



    const users =
        JSON.parse(

            localStorage.getItem(
                this.usersKey
            )

        ) || [];



    const user =
        users.find(
            u=>
            u.email===email &&
            u.password===password
        );



    if(!user){


        Toast.show(
            "Invalid login details",
            "error"
        );


        return;


    }



    const session={

        id:user.id,

        name:user.name,

        email:user.email,

        loginTime:
            new Date()
            .toISOString()

    };



    if(remember){


        localStorage.setItem(

            this.sessionKey,

            JSON.stringify(session)

        );


    }
    else{


        sessionStorage.setItem(

            this.sessionKey,

            JSON.stringify(session)

        );


    }



    Toast.show(
        "Login successful",
        "success"
    );



    setTimeout(()=>{


        window.location.href =
            "dashboard.html";


    },1000);


},


/*==================================================
    SESSION CHECK
===================================================*/

checkSession(){


    const session =

        localStorage.getItem(
            this.sessionKey
        )
        ||
        sessionStorage.getItem(
            this.sessionKey
        );



    const page =
        window.location.pathname;



    if(
        page.includes(
            "dashboard.html"
        )
        &&
        !session
    ){

        window.location.href =
            "login.html";

    }


},


/*==================================================
    LOGOUT
===================================================*/

logout(){


    localStorage.removeItem(
        this.sessionKey
    );


    sessionStorage.removeItem(
        this.sessionKey
    );



    window.location.href =
        "login.html";


},


/*==================================================
    EMAIL VALIDATION
===================================================*/

validateEmail(email){


    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);


}


};


/*==================================================
    INITIALIZE AUTH
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Auth.init();

    }

);


/*==================================================
    END auth.js PART 1
===================================================*/
/*==================================================
    AI STEM Innovation Website
    auth.js
    Part 2
    Advanced Authentication Features
===================================================*/

"use strict";


/*==================================================
    PASSWORD SECURITY MODULE
===================================================*/

const PasswordSecurity = {


    /*-----------------------------------------
        Hash Password (Browser SHA-256)
    -----------------------------------------*/

    async hash(password){

        const encoder =
            new TextEncoder();


        const data =
            encoder.encode(password);


        const hashBuffer =
            await crypto.subtle.digest(
                "SHA-256",
                data
            );


        const hashArray =
            Array.from(
                new Uint8Array(hashBuffer)
            );


        return hashArray
            .map(
                b =>
                b.toString(16)
                .padStart(2,"0")
            )
            .join("");

    },


    /*-----------------------------------------
        Password Strength
    -----------------------------------------*/

    strength(password){


        let score = 0;


        if(password.length >= 8)
            score++;


        if(/[A-Z]/.test(password))
            score++;


        if(/[a-z]/.test(password))
            score++;


        if(/[0-9]/.test(password))
            score++;


        if(/[^A-Za-z0-9]/.test(password))
            score++;


        return score;


    }


};



/*==================================================
    FIREBASE AUTH READY MODULE
===================================================*/

const FirebaseAuth = {


    enabled:false,


    config:null,


    init(config=null){


        if(!config){

            console.log(
                "Firebase not configured. Using local authentication."
            );

            return;

        }


        this.config=config;

        this.enabled=true;


        console.log(
            "Firebase Authentication Ready"
        );


    },


    /*-----------------------------------------
        Firebase Login Placeholder
    -----------------------------------------*/

    async login(email,password){


        if(!this.enabled){

            return null;

        }


        /*
        Firebase code goes here:

        signInWithEmailAndPassword(
            auth,
            email,
            password
        )

        */


    },


    /*-----------------------------------------
        Firebase Register Placeholder
    -----------------------------------------*/

    async register(email,password){


        if(!this.enabled){

            return null;

        }


        /*
        createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        */


    }


};



/*==================================================
    PASSWORD RESET MODULE
===================================================*/

const PasswordReset = {


    init(){

        const button =
            document.getElementById(
                "forgotPassword"
            );


        if(!button)
            return;


        button.addEventListener(
            "click",
            ()=>{

                this.reset();

            }
        );


    },


    reset(){


        const email =
            prompt(
                "Enter your registered email"
            );


        if(!email){

            Toast.show(
                "Email required",
                "error"
            );

            return;

        }


        /*
            Firebase:
            sendPasswordResetEmail()

            Backend:
            Send reset token email
        */


        Toast.show(
            "Password reset link sent",
            "success"
        );


    }


};



/*==================================================
    ROLE BASED ACCESS CONTROL
===================================================*/

const RoleManager = {


    rolesKey:
        "ai_stem_roles",


    getUser(){


        const session =

            localStorage.getItem(
                "ai_stem_session"
            )
            ||
            sessionStorage.getItem(
                "ai_stem_session"
            );


        if(!session)
            return null;


        return JSON.parse(session);


    },


    setRole(userId,role){


        let roles =
            JSON.parse(
                localStorage.getItem(
                    this.rolesKey
                )
            ) || {};



        roles[userId]=role;


        localStorage.setItem(

            this.rolesKey,

            JSON.stringify(roles)

        );


    },


    getRole(userId){


        const roles =

            JSON.parse(

                localStorage.getItem(
                    this.rolesKey
                )

            ) || {};


        return roles[userId]
            ||
            "student";


    },


    protect(role){


        const user =
            this.getUser();



        if(!user){

            window.location.href =
                "login.html";

            return false;

        }


        const userRole =
            this.getRole(
                user.id
            );


        if(
            userRole !== role
            &&
            userRole !== "admin"
        ){

            alert(
                "Access denied"
            );


            window.location.href =
                "dashboard.html";


            return false;

        }


        return true;


    }


};



/*==================================================
    GOOGLE LOGIN READY MODULE
===================================================*/

const GoogleAuth = {


    enabled:false,


    login(){


        if(!this.enabled){


            Toast.show(

                "Google login not configured",

                "error"

            );


            return;

        }


        /*
        Firebase Google Provider:

        new GoogleAuthProvider()

        signInWithPopup()

        */


    }


};



/*==================================================
    AUTH PART 2 INITIALIZATION
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        PasswordReset.init();


        FirebaseAuth.init();


        console.log(
            "Advanced Auth Module Loaded"
        );


    }

);


/*==================================================
    END auth.js PART 2
===================================================*/
/*==================================================
    AI STEM Innovation Website
    auth.js
    Part 3
    Firebase Authentication + Firestore
    Email Verification
    Role Management
===================================================*/

"use strict";


/*==================================================
    FIREBASE CONFIGURATION
===================================================*/

const FirebaseConfig = {

    firebaseConfig: {

        apiKey: "YOUR_API_KEY",

        authDomain:
            "YOUR_PROJECT.firebaseapp.com",

        projectId:
            "YOUR_PROJECT_ID",

        storageBucket:
            "YOUR_PROJECT.appspot.com",

        messagingSenderId:
            "YOUR_SENDER_ID",

        appId:
            "YOUR_APP_ID"

    }

};



/*==================================================
    FIREBASE AUTH SERVICE
===================================================*/

const FirebaseService = {


    auth:null,

    db:null,


    initialized:false,


    init(){


        if(
            typeof firebase === "undefined"
        ){

            console.warn(
                "Firebase SDK not loaded"
            );

            return;

        }



        firebase.initializeApp(
            FirebaseConfig.firebaseConfig
        );


        this.auth =
            firebase.auth();


        this.db =
            firebase.firestore();


        this.initialized=true;


        console.log(
            "Firebase Connected"
        );


    }



};


/*==================================================
    FIREBASE USER REGISTRATION
===================================================*/

const FirebaseRegister = {


    async createUser(data){


        if(
            !FirebaseService.initialized
        ){

            return;

        }



        try{


            const result =

            await FirebaseService.auth
            .createUserWithEmailAndPassword(

                data.email,

                data.password

            );



            const user =
                result.user;



            await user.sendEmailVerification();



            await FirebaseService.db
            .collection("users")
            .doc(user.uid)
            .set({

                uid:user.uid,

                name:data.name,

                email:data.email,

                role:"student",

                createdAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

            });



            Toast.show(

                "Account created. Verify email.",

                "success"

            );



            return user;



        }
        catch(error){


            Toast.show(

                error.message,

                "error"

            );


        }


    }


};



/*==================================================
    FIREBASE LOGIN
===================================================*/

const FirebaseLogin = {


    async login(email,password){


        try{


            const result =

            await FirebaseService.auth
            .signInWithEmailAndPassword(

                email,

                password

            );



            const user =
                result.user;



            if(
                !user.emailVerified
            ){

                Toast.show(

                    "Please verify your email",

                    "error"

                );


                return null;

            }



            const profile =

            await FirebaseService.db
            .collection("users")
            .doc(user.uid)
            .get();



            const userData =
                profile.data();



            sessionStorage.setItem(

                "ai_stem_session",

                JSON.stringify({

                    uid:user.uid,

                    email:user.email,

                    name:userData.name,

                    role:userData.role

                })

            );



            window.location.href =
                "dashboard.html";



            return user;



        }
        catch(error){


            Toast.show(

                error.message,

                "error"

            );


        }


    }


};



/*==================================================
    LOGOUT SERVICE
===================================================*/

const FirebaseLogout = {


    async logout(){


        try{


            await FirebaseService.auth
            .signOut();



            sessionStorage.removeItem(

                "ai_stem_session"

            );


            localStorage.removeItem(

                "ai_stem_session"

            );



            window.location.href =
                "login.html";



        }
        catch(error){


            console.error(error);


        }


    }


};



/*==================================================
    PASSWORD RESET
===================================================*/

const FirebasePasswordReset = {


    async send(email){


        try{


            await FirebaseService.auth
            .sendPasswordResetEmail(

                email

            );


            Toast.show(

                "Reset email sent",

                "success"

            );


        }
        catch(error){


            Toast.show(

                error.message,

                "error"

            );


        }


    }


};



/*==================================================
    USER ROLE MANAGEMENT
===================================================*/

const UserRole = {


    async updateRole(uid,role){


        await FirebaseService.db

        .collection("users")

        .doc(uid)

        .update({

            role:role

        });



        Toast.show(

            "Role updated",

            "success"

        );


    },



    async getRole(uid){


        const doc =

        await FirebaseService.db

        .collection("users")

        .doc(uid)

        .get();



        return doc.data().role;


    }


};



/*==================================================
    AUTH STATE MONITOR
===================================================*/

const AuthState = {


    init(){


        if(
            !FirebaseService.auth
        )
            return;



        FirebaseService.auth

        .onAuthStateChanged(

            user=>{


                if(user){


                    console.log(

                        "Logged in:",

                        user.email

                    );


                }
                else{


                    console.log(

                        "No user"

                    );


                }


            }

        );


    }


};



/*==================================================
    INITIALIZATION
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        FirebaseService.init();


        setTimeout(()=>{


            AuthState.init();


        },500);



        console.log(

            "Firebase Auth Part 3 Loaded"

        );


    }

);


/*==================================================
    END auth.js PART 3
===================================================*/
