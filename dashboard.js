/*==================================================
    AI STEM Innovation Website
    dashboard.js
    Part 1
    User Session Management
===================================================*/

"use strict";


/*==================================================
    DASHBOARD CONTROLLER
===================================================*/

const Dashboard = {


    session:null,


    init(){


        this.checkAuth();


        this.loadProfile();


        this.bindEvents();


    },


    /*=========================================
        AUTH PROTECTION
    =========================================*/

    checkAuth(){


        const session =

            sessionStorage.getItem(
                "ai_stem_session"
            )
            ||
            localStorage.getItem(
                "ai_stem_session"
            );



        if(!session){


            window.location.href =
                "login.html";


            return;


        }



        this.session =
            JSON.parse(session);



    },


    /*=========================================
        LOAD USER PROFILE
    =========================================*/

    loadProfile(){


        if(!this.session)
            return;



        const nameElements =
            document.querySelectorAll(
                ".user-name"
            );



        nameElements.forEach(
            element=>{


                element.textContent =
                    this.session.name
                    ||
                    "Student";


            }
        );



        const emailElements =
            document.querySelectorAll(
                ".user-email"
            );



        emailElements.forEach(
            element=>{


                element.textContent =
                    this.session.email;


            }
        );



        const role =
            document.querySelector(
                ".user-role"
            );



        if(role){


            role.textContent =
                this.session.role
                ||
                "Student";


        }


    },


    /*=========================================
        WELCOME MESSAGE
    =========================================*/

    welcome(){


        const message =
            document.querySelector(
                ".welcome-message"
            );


        if(message){


            message.innerHTML = `

            Welcome back,
            <strong>
            ${this.session.name}
            </strong>

            `;


        }


    },


    /*=========================================
        EVENTS
    =========================================*/

    bindEvents(){


        const logout =
            document.querySelector(
                ".logout-btn"
            );



        if(logout){


            logout.addEventListener(
                "click",
                ()=>{
                    this.logout();
                }
            );


        }


    },


    /*=========================================
        LOGOUT
    =========================================*/

    logout(){


        sessionStorage.removeItem(
            "ai_stem_session"
        );


        localStorage.removeItem(
            "ai_stem_session"
        );


        window.location.href =
            "login.html";


    }


};



/*==================================================
    DASHBOARD INITIALIZATION
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        Dashboard.init();


        Dashboard.welcome();


        console.log(
            "Dashboard Loaded"
        );


    }

);


/*==================================================
    END dashboard.js PART 1
===================================================*/
/*==================================================
    AI STEM Innovation Website
    dashboard.js
    Part 2
    Student Data Management
    Courses
    Progress
    Attendance
    Certificates
    Activity Timeline
===================================================*/

"use strict";


/*==================================================
    STUDENT DASHBOARD MODULE
===================================================*/

const StudentDashboard = {


    userId:null,


    init(){


        this.getUser();


        if(!this.userId)
            return;


        this.loadStudentData();


        this.loadCourses();


        this.loadAttendance();


        this.loadCertificates();


        this.loadActivity();


    },


    /*=========================================
        GET CURRENT USER
    =========================================*/

    getUser(){


        const session =

            sessionStorage.getItem(
                "ai_stem_session"
            )
            ||
            localStorage.getItem(
                "ai_stem_session"
            );


        if(!session)
            return;


        const user =
            JSON.parse(session);


        this.userId =
            user.uid
            ||
            user.id;


    },


    /*=========================================
        LOAD STUDENT DATA
    =========================================*/

    loadStudentData(){


        const data = {


            enrolledCourses:12,

            completedCourses:7,

            attendance:"92%",

            certificates:5


        };


        this.updateCounter(
            ".course-count",
            data.enrolledCourses
        );


        this.updateCounter(
            ".completed-count",
            data.completedCourses
        );


        this.updateText(
            ".attendance-percent",
            data.attendance
        );


        this.updateCounter(
            ".certificate-count",
            data.certificates
        );


    },


    /*=========================================
        COURSE LIST
    =========================================*/

    loadCourses(){


        const courses = [


            {

                name:"Robotics",

                progress:85,

                status:"In Progress"

            },


            {

                name:"Artificial Intelligence",

                progress:60,

                status:"In Progress"

            },


            {

                name:"IoT & ESP32",

                progress:100,

                status:"Completed"

            },


            {

                name:"3D Printing",

                progress:40,

                status:"Started"

            }


        ];



        const container =
            document.querySelector(
                ".course-progress-list"
            );



        if(!container)
            return;



        container.innerHTML="";



        courses.forEach(course=>{


            container.innerHTML += `

            <div class="course-progress-card">


                <h4>
                ${course.name}
                </h4>


                <div class="progress-bar">

                    <span style="
                    width:${course.progress}%
                    ">
                    </span>

                </div>


                <p>

                ${course.progress}%

                -
                ${course.status}

                </p>


            </div>


            `;


        });


    },


    /*=========================================
        ATTENDANCE
    =========================================*/

    loadAttendance(){


        const attendance =
            document.querySelector(
                ".attendance-chart"
            );


        if(!attendance)
            return;



        const records = [

            {
                month:"January",
                value:95
            },

            {
                month:"February",
                value:90
            },

            {
                month:"March",
                value:92
            },

            {
                month:"April",
                value:88
            }

        ];



        attendance.innerHTML="";



        records.forEach(item=>{


            attendance.innerHTML += `


            <div class="attendance-item">


                <span>
                ${item.month}
                </span>


                <strong>
                ${item.value}%
                </strong>


            </div>


            `;


        });


    },


    /*=========================================
        CERTIFICATES
    =========================================*/

    loadCertificates(){


        const box =
            document.querySelector(
                ".certificate-list"
            );



        if(!box)
            return;



        const certificates=[


            "Arduino Robotics",

            "AI Fundamentals",

            "IoT Development",

            "3D Printing",

            "Python Programming"


        ];



        box.innerHTML="";



        certificates.forEach(cert=>{


            box.innerHTML += `


            <div class="certificate-card">


                <i class="fa-solid fa-certificate">
                </i>


                <h4>
                ${cert}
                </h4>


                <button>
                View
                </button>


            </div>


            `;


        });


    },


    /*=========================================
        ACTIVITY TIMELINE
    =========================================*/

    loadActivity(){


        const timeline =
            document.querySelector(
                ".activity-timeline"
            );



        if(!timeline)
            return;



        const activities=[


            "Completed Arduino LED Project",

            "Submitted Robotics Assignment",

            "Attended AI Workshop",

            "Completed 3D Printing Model"


        ];



        timeline.innerHTML="";



        activities.forEach(
            activity=>{


                timeline.innerHTML += `


                <div class="timeline-item">


                    <i class="
                    fa-solid fa-circle-check
                    ">
                    </i>


                    <p>
                    ${activity}
                    </p>


                </div>


                `;


            }
        );


    },


    /*=========================================
        HELPERS
    =========================================*/

    updateCounter(selector,value){


        const element =
            document.querySelector(
                selector
            );


        if(element){

            element.textContent =
                value;

        }


    },


    updateText(selector,value){


        const element =
            document.querySelector(
                selector
            );


        if(element){

            element.textContent =
                value;

        }


    }


};


/*==================================================
    INITIALIZE PART 2
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        StudentDashboard.init();


        console.log(
            "Student Dashboard Part 2 Loaded"
        );


    }

);


/*==================================================
    END dashboard.js PART 2
===================================================*/
/*==================================================
    AI STEM Innovation Website
    dashboard.js
    Part 3
    Firebase Firestore Integration
    Admin Dashboard
    Student Management
    Reports
===================================================*/

"use strict";


/*==================================================
    FIREBASE DASHBOARD SERVICE
===================================================*/

const DashboardFirebase = {


    db:null,


    init(){


        if(
            typeof firebase === "undefined"
        ){

            console.warn(
                "Firebase SDK not available"
            );

            return;

        }


        this.db =
            firebase.firestore();


    },


    /*=========================================
        LOAD USER PROFILE FROM FIRESTORE
    =========================================*/

    async loadProfile(uid){


        if(!this.db)
            return null;


        try{


            const doc =

            await this.db

            .collection("users")

            .doc(uid)

            .get();



            if(doc.exists){

                return doc.data();

            }



        }
        catch(error){


            console.error(
                error
            );


        }


        return null;


    }


};



/*==================================================
    ADMIN DASHBOARD
===================================================*/

const AdminDashboard = {


    users:[],


    init(){


        if(!this.isAdmin())
            return;


        this.loadStudents();


        this.bindSearch();


        this.bindExport();


    },


    /*=========================================
        CHECK ADMIN ROLE
    =========================================*/

    isAdmin(){


        const session =

        sessionStorage.getItem(
            "ai_stem_session"
        )
        ||
        localStorage.getItem(
            "ai_stem_session"
        );



        if(!session)
            return false;



        const user =
            JSON.parse(session);



        return (
            user.role === "admin"
        );


    },


    /*=========================================
        LOAD STUDENTS
    =========================================*/

    async loadStudents(){


        if(!DashboardFirebase.db)
            return;



        try{


            const snapshot =

            await DashboardFirebase.db

            .collection("users")

            .get();



            this.users=[];



            snapshot.forEach(doc=>{


                this.users.push({

                    id:doc.id,

                    ...doc.data()

                });


            });



            this.renderStudents();


        }
        catch(error){


            console.error(
                error
            );


        }


    },


    /*=========================================
        DISPLAY STUDENTS
    =========================================*/

    renderStudents(){


        const table =

        document.querySelector(
            "#studentTable tbody"
        );



        if(!table)
            return;



        table.innerHTML="";



        this.users.forEach(student=>{


            table.innerHTML += `


            <tr>


                <td>
                ${student.name || "-"}
                </td>


                <td>
                ${student.email || "-"}
                </td>


                <td>
                ${student.role || "student"}
                </td>


                <td>


                <button
                class="edit-role"
                data-id="${student.id}">
                Edit
                </button>


                </td>


            </tr>


            `;


        });


    },


    /*=========================================
        SEARCH STUDENTS
    =========================================*/

    bindSearch(){


        const search =

        document.querySelector(
            "#studentSearch"
        );



        if(!search)
            return;



        search.addEventListener(
            "input",
            ()=>{


                const value =

                search.value
                .toLowerCase();



                const filtered =

                this.users.filter(

                    user=>

                    user.name
                    ?.toLowerCase()
                    .includes(value)

                    ||

                    user.email
                    ?.toLowerCase()
                    .includes(value)

                );



                this.renderFiltered(
                    filtered
                );


            }
        );


    },


    renderFiltered(data){


        const table =

        document.querySelector(
            "#studentTable tbody"
        );



        if(!table)
            return;



        table.innerHTML="";



        data.forEach(student=>{


            table.innerHTML += `

            <tr>

            <td>
            ${student.name}
            </td>


            <td>
            ${student.email}
            </td>


            <td>
            ${student.role}
            </td>


            </tr>

            `;


        });


    },


    /*=========================================
        EXPORT REPORT
    =========================================*/

    bindExport(){


        const button =

        document.querySelector(
            "#exportStudents"
        );



        if(!button)
            return;



        button.addEventListener(
            "click",
            ()=>{


                this.exportCSV();


            }
        );


    },


    exportCSV(){


        let csv =
        "Name,Email,Role\n";



        this.users.forEach(
            user=>{


                csv +=

                `${user.name},${user.email},${user.role}\n`;


            }
        );



        const blob =

        new Blob(

            [csv],

            {
                type:
                "text/csv"

            }

        );



        const url =

        URL.createObjectURL(
            blob
        );



        const link =
            document.createElement(
                "a"
            );


        link.href=url;


        link.download =
            "students-report.csv";


        link.click();



    }


};



/*==================================================
    REPORT STATISTICS
===================================================*/

const DashboardReports = {


    generate(){


        const totalStudents =

        document.querySelector(
            ".total-students"
        );



        if(totalStudents){


            totalStudents.textContent =

            AdminDashboard.users.length;


        }


    }


};



/*==================================================
    INITIALIZATION
===================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        DashboardFirebase.init();


        AdminDashboard.init();


        DashboardReports.generate();


        console.log(
            "Dashboard Part 3 Loaded"
        );


    }

);


/*==================================================
    END dashboard.js PART 3
===================================================*/