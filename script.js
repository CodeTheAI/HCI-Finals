// ================================================================
// DATA
// ================================================================
var USERS=[
  {username:'hfavenir',email:'hfavenir@uphsd.edu.ph',password:'uphsd2026',name:'Homer T. Favenir',role:'Faculty · CCS',dept:'College of Computer Studies',eid:'CCS-2024-001',phone:'+63 912 345 6789'},
  {username:'admin',email:'admin@uphsd.edu.ph',password:'admin123',name:'Administrator',role:'System Admin',dept:'IT Department',eid:'IT-2024-001',phone:''}
];
var currentUser=null;
var pendingSignup=null, currentOtp=null, otpExpiry=null;
var resetTarget=null, resetOtp=null, resetExpiry=null;

var DB={
  students:[
    {id:1,ln:'ANDAYA',fn:'JOHN BENEDICT',mi:'G.',sid:'2023-10001',email:'andaya.jb@uphsd.edu.ph',year:'2nd',section:'A',courses:[]},
    {id:2,ln:'ARNAIZ',fn:'SAMUEL ANGELO',mi:'M.',sid:'2023-10002',email:'arnaiz.sa@uphsd.edu.ph',year:'2nd',section:'A',courses:[]},
    {id:3,ln:'BAGAYAS',fn:'BOBSON ROB',mi:'V.',sid:'2023-10003',email:'bagayas.br@uphsd.edu.ph',year:'2nd',section:'A',courses:[]},
    {id:4,ln:'CASTILLO',fn:'MARIA GRACE',mi:'R.',sid:'2023-10004',email:'castillo.mg@uphsd.edu.ph',year:'2nd',section:'B',courses:[]},
    {id:5,ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',year:'1st',section:'B',courses:[]}
  ],
  courses:[
    {code:'IT411',name:'Human Computer Interaction 1',section:'BSCS-2207',units:3,room:'CCS Lab 301',sched:'MWF 8:00–9:30 AM',sem:'1st Semester 2025–2026',
     students:[
       {ln:'ANDAYA',fn:'JOHN BENEDICT',mi:'G.',sid:'2023-10001',email:'andaya.jb@uphsd.edu.ph',qe:[100,100,100,100],ra:[90,90,90,90],proj:100,major:90,att:['P','A','P','P','P','P']},
       {ln:'ARNAIZ',fn:'SAMUEL ANGELO',mi:'M.',sid:'2023-10002',email:'arnaiz.sa@uphsd.edu.ph',qe:[90,90,90,90],ra:[80,80,80,80],proj:90,major:80,att:['P','P','P','P','P','P']},
       {ln:'BAGAYAS',fn:'BOBSON ROB',mi:'V.',sid:'2023-10003',email:'bagayas.br@uphsd.edu.ph',qe:[80,80,80,80],ra:[70,70,70,70],proj:80,major:70,att:['P','A','P','P','P','P']}
     ],
     weeks:['Feb 1','Feb 8','Feb 15','Feb 22','Mar 1','Mar 8'],
     activities:[]
    },
    {code:'IT421',name:'Systems Analysis and Design',section:'BSCS-2208',units:3,room:'CCS Room 202',sched:'TTh 10:00–11:30 AM',sem:'1st Semester 2025–2026',
     students:[
       {ln:'CASTILLO',fn:'MARIA GRACE',mi:'R.',sid:'2023-10004',email:'castillo.mg@uphsd.edu.ph',qe:[85,90,88,92],ra:[80,85,82,88],proj:87,major:85,att:['P','P','P','L','P','P']},
       {ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',qe:[75,80,78,82],ra:[70,75,72,78],proj:76,major:74,att:['P','A','P','P','P','P']}
     ],
     weeks:['Feb 3','Feb 10','Feb 17','Feb 24','Mar 3','Mar 10'],
     activities:[]
    },
    {code:'CS312',name:'Object-Oriented Programming',section:'BSCS-2101',units:3,room:'CCS Lab 302',sched:'MWF 1:00–2:30 PM',sem:'1st Semester 2025–2026',
     students:[
       {ln:'ESPIRITU',fn:'JOSE ANTONIO',mi:'L.',sid:'2023-10006',email:'espiritu.ja@uphsd.edu.ph',qe:[95,98,96,94],ra:[90,92,88,95],proj:96,major:94,att:['P','P','P','P','P','P']},
       {ln:'FERNANDEZ',fn:'KRISTINE',mi:'A.',sid:'2023-10007',email:'fernandez.k@uphsd.edu.ph',qe:[88,85,90,87],ra:[82,84,86,80],proj:88,major:86,att:['P','P','L','P','P','P']}
     ],
     weeks:['Feb 2','Feb 9','Feb 16','Feb 23','Mar 2','Mar 9'],
     activities:[]
    },
    {code:'IT431',name:'Web Development 2',section:'BSCS-2303',units:3,room:'CCS Lab 303',sched:'TTh 2:00–3:30 PM',sem:'1st Semester 2025–2026',
     students:[
       {ln:'GARCIA',fn:'PAOLO',mi:'M.',sid:'2023-10008',email:'garcia.p@uphsd.edu.ph',qe:[92,94,90,96],ra:[88,90,85,92],proj:93,major:91,att:['P','P','P','P','L','P']},
       {ln:'HERNANDEZ',fn:'ANA LIZA',mi:'C.',sid:'2023-10009',email:'hernandez.al@uphsd.edu.ph',qe:[78,80,76,82],ra:[72,74,70,78],proj:79,major:77,att:['P','A','P','P','P','P']}
     ],
     weeks:['Feb 4','Feb 11','Feb 18','Feb 25','Mar 4','Mar 11'],
     activities:[]
    },
    {code:'GE201',name:'Ethics in Technology',section:'BSCS-2401',units:2,room:'Room 105',sched:'F 3:00–5:00 PM',sem:'1st Semester 2025–2026',
     students:[
       {ln:'IGNACIO',fn:'MARK KEVIN',mi:'T.',sid:'2023-10010',email:'ignacio.mk@uphsd.edu.ph',qe:[88,90,86,92],ra:[84,86,82,90],proj:89,major:88,att:['P','P','P','P','P','P']}
     ],
     weeks:['Feb 6','Feb 13','Feb 20','Feb 27','Mar 6','Mar 13'],
     activities:[]
    }
  ],
  events:[
    {title:'Prelim Exams Week',date:'2026-03-02',color:'red',desc:'All sections'},
    {title:'Project Submission — IT411',date:'2026-03-08',color:'amber',desc:'Final project deadline'},
    {title:'Faculty Meeting',date:'2026-03-15',color:'',desc:'CCS Department'},
    {title:'Midterm Exams Week',date:'2026-04-06',color:'red',desc:'All sections'},
    {title:'Research Presentation — IT421',date:'2026-04-25',color:'green',desc:'SAD Final Presentation'}
  ],
  sentEmails:[]
};

var currentCourseIdx=0;
var calYear=2026, calMonth=3; // April 2026 (0-indexed)

function isAdminUser(){
  return !!(currentUser && /admin/i.test(currentUser.role||''));
}

function applyRoleUI(){
  var sub=document.getElementById('pgSub');
  if(sub){
    sub.textContent=isAdminUser()
      ? 'UPHSD Administration Portal · S.Y. 2025–2026'
      : 'UPHSD College of Computer Studies · S.Y. 2025–2026';
  }
}

// ================================================================
// INIT PARTICLES
// ================================================================
(function(){
  var c=document.getElementById('loginParticles');
  for(var i=0;i<18;i++){
    var d=document.createElement('div');
    d.className='lp';
    d.style.left=Math.random()*100+'%';
    d.style.top=Math.random()*100+'%';
    d.style.animationDuration=(4+Math.random()*6)+'s';
    d.style.animationDelay=(Math.random()*4)+'s';
    d.style.width=d.style.height=(1+Math.random()*3)+'px';
    c.appendChild(d);
  }
})();

// ================================================================
// AUTH HELPERS
// ================================================================
function showPanel(id){
  document.querySelectorAll('.auth-panel').forEach(function(p){p.classList.remove('active');});
  document.getElementById(id).classList.add('active');
  ['loginErr','loginOk','signupErr','verifyErr','forgotErr','forgotOk','resetErr'].forEach(function(e){
    var el=document.getElementById(e); if(el){el.classList.remove('show');el.textContent='';}
  });
}
function authErr(id,msg){var el=document.getElementById(id);if(el){el.textContent=msg;el.classList.add('show');}}
function authOk(id,msg){var el=document.getElementById(id);if(el){el.textContent=msg;el.classList.add('show');}}
function togglePw(id){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password';}

function doLogin(){
  var u=document.getElementById('loginUser').value.trim();
  var p=document.getElementById('loginPass').value;
  var btn=document.getElementById('loginBtn');
  document.getElementById('loginErr').classList.remove('show');
  document.getElementById('loginOk').classList.remove('show');
  if(!u||!p){authErr('loginErr','Please fill in all fields.');return;}
  
  // Check for admin login first
  if(u === 'admin' && p === 'admin123'){
    currentAdminUser = { username: 'admin', role: 'admin' };
    showAdminPanel();
    return;
  }
  
  btn.disabled=true; btn.textContent='Signing in…';
  setTimeout(function(){
    var found=USERS.find(function(x){return (x.username===u||x.email===u)&&x.password===p;});
    if(found){
      currentUser=found;
      var savedProfile=localStorage.getItem('profile_'+found.username);
      if(savedProfile){
        var saved=JSON.parse(savedProfile);
        currentUser.name=saved.name||found.name;
        currentUser.email=saved.email||found.email;
        currentUser.dept=saved.dept||'';
        currentUser.eid=saved.eid||'';
        currentUser.phone=saved.phone||'';
        currentUser.profilePicture=saved.profilePicture||'';
      }
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('appShell').classList.remove('app-hidden');
      document.getElementById('sb-name').textContent=currentUser.name;
      document.getElementById('sb-role').textContent=found.role;
      document.getElementById('sb-av-initials').textContent=currentUser.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
      if(currentUser.profilePicture){
        document.querySelector('.sb-av').style.backgroundImage='url('+currentUser.profilePicture+')';
        document.querySelector('.sb-av').textContent='';
      }
      initApp();
      toast('Welcome back, '+currentUser.name.split(' ')[0]+'!','ok');
    } else {
      authErr('loginErr','Incorrect username/email or password.');
      document.getElementById('loginPass').value='';
    }
    btn.disabled=false; btn.textContent='Sign In';
  },400);
}

function demoLogin(){
  document.getElementById('loginUser').value='hfavenir';
  document.getElementById('loginPass').value='uphsd2026';
  setTimeout(function(){doLogin();},100);
}

function doLogout(){
  document.getElementById('appShell').classList.add('app-hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
  currentUser=null;
  showPanel('panel-login');
}

// SIGN UP
function suNext(){
  var name=document.getElementById('su-name').value.trim();
  var email=document.getElementById('su-email').value.trim();
  var user=document.getElementById('su-user').value.trim();
  var pass=document.getElementById('su-pass').value;
  if(!name||!email||!user||!pass){authErr('signupErr','Please fill in all fields.');return;}
  if(!/^[^\s@]+@gmail\.com$/i.test(email)){authErr('signupErr','Please enter a valid Gmail address (@gmail.com).');return;}
  if(pass.length<6){authErr('signupErr','Password must be at least 6 characters.');return;}
  if(USERS.find(function(x){return x.username===user;})){authErr('signupErr','Username already taken.');return;}
  if(USERS.find(function(x){return x.email===email;})){authErr('signupErr','Email already registered. Try signing in.');return;}
  currentOtp=String(Math.floor(100000+Math.random()*900000));
  otpExpiry=Date.now()+10*60*1000;
  pendingSignup={name:name,email:email,username:user,password:pass};
  sendOtpEmail(email,name,currentOtp,'Verification');
  document.getElementById('verify-email-display').textContent=email;
  for(var i=0;i<6;i++) document.getElementById('otp'+i).value='';
  showPanel('panel-verify');
  setTimeout(function(){document.getElementById('otp0').focus();},200);
}
function sendOtpEmail(email,name,code,type){
  var subj='UPHSD Grading System — '+type+' Code';
  var body='Hello '+name+',\n\nYour '+type.toLowerCase()+' code is:\n\n  ── '+code+' ──\n\nValid for 10 minutes.\n\nUPHSD — College of Computer Studies';
  window.open('https://mail.google.com/mail/?view=cm&to='+encodeURIComponent(email)+'&su='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body),'_blank');
}
function otpInput(el,idx){
  el.value=el.value.replace(/\D/,'');
  if(el.value&&idx<5) document.getElementById('otp'+(idx+1)).focus();
  var code=''; for(var i=0;i<6;i++) code+=document.getElementById('otp'+i).value;
  if(code.length===6) doVerify();
}
function otpKey(e,idx){if(e.key==='Backspace'&&!e.target.value&&idx>0) document.getElementById('otp'+(idx-1)).focus();}
function doVerify(){
  var code=''; for(var i=0;i<6;i++) code+=document.getElementById('otp'+i).value;
  if(code.length<6){authErr('verifyErr','Please enter all 6 digits.');return;}
  if(Date.now()>otpExpiry){authErr('verifyErr','Code expired. Please request a new one.');return;}
  if(code!==currentOtp){authErr('verifyErr','Incorrect code. Check your Gmail and try again.');return;}
  if(!pendingSignup) return;
  USERS.push({username:pendingSignup.username,email:pendingSignup.email,password:pendingSignup.password,name:pendingSignup.name,role:'Faculty · CCS',dept:'College of Computer Studies',eid:'',phone:''});
  var n=pendingSignup.name; pendingSignup=null; currentOtp=null;
  showPanel('panel-login');
  authOk('loginOk','✓ Account created! Welcome, '+n+'. You can now sign in.');
}
function resendOtp(){
  if(!pendingSignup){showPanel('panel-signup');return;}
  document.getElementById('verifyErr').classList.remove('show');
  currentOtp=String(Math.floor(100000+Math.random()*900000));
  otpExpiry=Date.now()+10*60*1000;
  sendOtpEmail(pendingSignup.email,pendingSignup.name,currentOtp,'Verification');
  for(var i=0;i<6;i++) document.getElementById('otp'+i).value='';
  document.getElementById('otp0').focus();
  toast('New code sent to Gmail!','ok');
}

// FORGOT PASSWORD
function doForgot(){
  var id=document.getElementById('forgot-id').value.trim();
  var btn=document.getElementById('forgotBtn');
  document.getElementById('forgotErr').classList.remove('show');
  document.getElementById('forgotOk').classList.remove('show');
  if(!id){authErr('forgotErr','Please enter your Gmail or username.');return;}
  var found=USERS.find(function(x){return x.username===id||x.email===id;});
  if(!found){authErr('forgotErr','No account found with that username or email.');return;}
  btn.disabled=true; btn.textContent='Sending…';
  resetOtp=String(Math.floor(100000+Math.random()*900000));
  resetExpiry=Date.now()+10*60*1000;
  resetTarget=found;
  sendOtpEmail(found.email,found.name,resetOtp,'Password Reset');
  document.getElementById('reset-email-display').textContent=found.email;
  for(var i=0;i<6;i++) document.getElementById('rotp'+i).value='';
  document.getElementById('new-pass').value='';
  setTimeout(function(){showPanel('panel-reset');btn.disabled=false;btn.textContent='📧 Send Reset Link via Gmail';},600);
}
function rotpInput(el,idx){
  el.value=el.value.replace(/\D/,'');
  if(el.value&&idx<5) document.getElementById('rotp'+(idx+1)).focus();
}
function rotpKey(e,idx){if(e.key==='Backspace'&&!e.target.value&&idx>0) document.getElementById('rotp'+(idx-1)).focus();}
function doResetPassword(){
  var code=''; for(var i=0;i<6;i++) code+=document.getElementById('rotp'+i).value;
  var newpw=document.getElementById('new-pass').value;
  if(code.length<6){authErr('resetErr','Please enter all 6 digits.');return;}
  if(Date.now()>resetExpiry){authErr('resetErr','Code expired. Please request a new one.');return;}
  if(code!==resetOtp){authErr('resetErr','Incorrect code. Check your Gmail and try again.');return;}
  if(newpw.length<6){authErr('resetErr','New password must be at least 6 characters.');return;}
  resetTarget.password=newpw;
  resetTarget=null; resetOtp=null;
  showPanel('panel-login');
  authOk('loginOk','✓ Password reset successfully! You can now sign in with your new password.');
}

// ================================================================
// APP INIT
// ================================================================
function initApp(){
  applyRoleUI();
  renderSidebarSchedule();
  renderDashboard();
  renderCourses();
  populateGbSelect();
  populateAttSelect();
  populateCalcSelect();
  populateGmailSelects();
  renderCalendar();
  renderEvents();
  renderProfile();
  document.getElementById('courses-count').textContent=DB.courses.length;
  renderStudentsPage();
  // Initialize filter listeners for Students page
  ['stud-filter-course','stud-filter-year','stud-filter-section','stud-search'].forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.addEventListener('change',filterStudents);
    if(id==='stud-search' && el) el.addEventListener('keyup',filterStudents);
  });
}

// ================================================================
// SIDEBAR SCHEDULE
// ================================================================
function renderSidebarSchedule(){
  var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var today=new Date();
  var todayDay=days[today.getDay()];
  var todayCourses=DB.courses.filter(function(c){
    return c.sched&&c.sched.split(' ')[0].split('/').some(function(d){return todayDay.startsWith(d.trim().substring(0,2))||c.sched.includes(todayDay.substring(0,1));});
  });
  // Just show all courses in sidebar for demo
  var html='';
  DB.courses.slice(0,3).forEach(function(c){
    html+='<div class="sched-item"><h4>'+c.code+'</h4><p>'+c.sched+'</p></div>';
  });
  if(DB.courses.length>3) html+='<div style="font-size:10.5px;color:var(--text3);padding:4px 4px 0;text-align:center">+'+( DB.courses.length-3)+' more courses</div>';
  document.getElementById('sb-today-sched').innerHTML=html||'<div style="font-size:11.5px;color:var(--text3)">No courses today</div>';
}

// ================================================================
// DASHBOARD
// ================================================================
function renderDashboard(){
  var facultyView=document.getElementById('faculty-dashboard-view');
  var adminView=document.getElementById('admin-dashboard-view');
  if(isAdminUser()){
    if(facultyView) facultyView.style.display='none';
    if(adminView) adminView.style.display='block';
    renderAdminDashboard();
    return;
  }
  if(facultyView) facultyView.style.display='block';
  if(adminView) adminView.style.display='none';

  var totalStudents=0, totalGrade=0, gradeCount=0, passing=0, courses=DB.courses.length;
  DB.courses.forEach(function(course){
    totalStudents+=course.students.length;
    course.students.forEach(function(s){
      var c=compute(s,course.weeks);
      totalGrade+=c.grade; gradeCount++;
      if(c.grade>=75) passing++;
    });
  });
  var avgGrade=gradeCount?Math.round(totalGrade/gradeCount):0;
  var passRate=gradeCount?Math.round(passing/gradeCount*100):0;

  document.getElementById('dash-stats').innerHTML=
    stat('Active Courses',courses,'This semester',100)
    +stat('Total Students',totalStudents,'Across all courses',Math.min(100,totalStudents*5))
    +stat('Class Average',avgGrade,'Transmuted grade',avgGrade)
    +stat('Passing Rate',passRate+'%','Grade ≥ 75',passRate);

  // Academic Overview - Performance Bars
  var perfHtml='';
  DB.courses.forEach(function(course){
    var avg=0; if(course.students.length){course.students.forEach(function(s){avg+=compute(s,course.weeks).grade;});avg=Math.round(avg/course.students.length);}
    var col=avg>=90?'var(--green)':avg>=80?'var(--accent)':avg>=70?'var(--amber)':'var(--red)';
    perfHtml+='<div class="perf-bar"><div class="perf-bar-label"><span>'+course.code+' – '+course.name.substring(0,28)+'</span><span style="font-weight:700;color:'+col+'">'+avg+'</span></div>'
      +'<div class="perf-bar-track"><div class="perf-bar-fill" style="width:'+avg+'%;background:'+col+'"></div></div></div>';
  });
  document.getElementById('acad-overview').innerHTML=perfHtml||'<div class="empty">No courses.</div>';

  // Active Courses quick list
  var cl='';
  DB.courses.forEach(function(c,i){
    var avg=0; if(c.students.length){c.students.forEach(function(s){avg+=compute(s,c.weeks).grade;});avg=Math.round(avg/c.students.length);}
    cl+='<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:var(--surface2);border-radius:8px;margin-bottom:6px">'
      +'<div><div style="font-size:12.5px;font-weight:700;color:var(--text)">'+c.code+' — '+c.name+'</div>'
      +'<div style="font-size:11px;color:var(--text3)">'+c.section+' · '+c.students.length+' students · '+c.sched+'</div></div>'
      +'<div style="display:flex;align-items:center;gap:8px">'
      +'<span class="gpill '+gCls(avg)+'">'+avg+'</span>'
      +'<button class="btn btn-sm btn-primary" onclick="openCourseStudents('+i+')">View</button>'
      +'</div></div>';
  });
  document.getElementById('dash-courses-list').innerHTML=cl||'<div class="empty">No courses yet.</div>';
}

function renderAdminDashboard(){
  var facultyCount=USERS.filter(function(u){
    return /faculty/i.test(u.role||'');
  }).length;
  var totalCourses=DB.courses.length;
  var totalStudents=DB.students.length;
  var allGrades=[];

  DB.courses.forEach(function(c){
    c.students.forEach(function(s){
      allGrades.push(compute(s,c.weeks).grade);
    });
  });
  var overallAvg=allGrades.length?Math.round(allGrades.reduce(function(a,b){return a+b;},0)/allGrades.length):0;
  var activeEvents=DB.events.filter(function(e){
    return new Date(e.date)>=new Date(new Date().setHours(0,0,0,0));
  }).length;

  document.getElementById('admin-stats').innerHTML=
    stat('Registered Faculty',facultyCount,'Active accounts',Math.min(100,facultyCount*20))
    +stat('Total Students',totalStudents,'Institution-wide',Math.min(100,totalStudents*4))
    +stat('Total Courses',totalCourses,'Current term',Math.min(100,totalCourses*10))
    +stat('Overall Average',overallAvg,'Across all classes',overallAvg)
    +stat('Active Events',activeEvents,'Upcoming deadlines',Math.min(100,activeEvents*20));

  var depts={};
  DB.courses.forEach(function(c){
    var key='General Education';
    if(/^IT/i.test(c.code)) key='Information Technology';
    else if(/^CS/i.test(c.code)) key='Computer Science';

    if(!depts[key]) depts[key]={courses:0,students:0,gradeTotal:0,gradeCount:0};
    depts[key].courses++;
    depts[key].students+=c.students.length;
    c.students.forEach(function(s){
      depts[key].gradeTotal+=compute(s,c.weeks).grade;
      depts[key].gradeCount++;
    });
  });

  var deptInsights='';
  Object.keys(depts).forEach(function(name){
    var d=depts[name];
    var avgGrade=d.gradeCount?Math.round(d.gradeTotal/d.gradeCount):0;
    var tone=avgGrade>=85?'var(--green)':avgGrade>=75?'var(--accent)':'var(--amber)';
    deptInsights+='<div class="perf-bar">'
      +'<div class="perf-bar-label"><span>'+name+'</span><span style="font-weight:700;color:'+tone+'">'+avgGrade+'</span></div>'
      +'<div class="perf-bar-track"><div class="perf-bar-fill" style="width:'+Math.min(100,avgGrade)+'%;background:'+tone+'"></div></div>'
      +'</div>';
  });
  document.getElementById('admin-dept-insights').innerHTML=deptInsights||'<div class="empty">No department data yet.</div>';

  var deptStatus='';
  Object.keys(depts).forEach(function(name){
    var d=depts[name];
    deptStatus+='<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:var(--surface2);border-radius:8px;margin-bottom:6px">'
      +'<div><div style="font-size:12.5px;font-weight:700;color:var(--text)">'+name+'</div><div style="font-size:11px;color:var(--text3)">'+d.courses+' courses · '+d.students+' students</div></div>'
      +'<button class="btn btn-sm btn-primary" onclick="goPage(\'courses\',document.getElementById(\'nav-courses\'))">Manage</button>'
      +'</div>';
  });
  document.getElementById('admin-dept-status').innerHTML=deptStatus||'<div class="empty">No departments available.</div>';

  var alerts=[];
  DB.courses.forEach(function(course){
    course.students.forEach(function(s){
      var c=compute(s,course.weeks);
      if(c.attPct<75){
        alerts.push({sev:'High',msg:s.ln+', '+s.fn+' has low attendance ('+c.attPct+'%) in '+course.code});
      }
      if(c.grade<75){
        alerts.push({sev:'Medium',msg:s.ln+', '+s.fn+' is below passing ('+c.grade+') in '+course.code});
      }
    });
  });
  var now=new Date();
  now.setHours(0,0,0,0);
  DB.events.forEach(function(e){
    var days=Math.ceil((new Date(e.date)-now)/(1000*60*60*24));
    if(days>=0&&days<=7){
      alerts.push({sev:'Info',msg:e.title+' is due in '+days+' day(s)'});
    }
  });
  var alertHtml='';
  alerts.slice(0,8).forEach(function(a){
    var cls=a.sev==='High'?'bg-red':a.sev==='Medium'?'bg-amber':'bg-blue';
    alertHtml+='<div style="display:flex;gap:8px;align-items:flex-start;padding:9px 10px;background:var(--surface2);border-radius:8px;margin-bottom:6px">'
      +'<span class="badge '+cls+'">'+a.sev+'</span>'
      +'<div style="font-size:12px;color:var(--text2)">'+a.msg+'</div>'
      +'</div>';
  });
  document.getElementById('admin-alerts').innerHTML=alertHtml||'<div class="empty">No active alerts.</div>';

  var deadlines=DB.events
    .slice()
    .sort(function(a,b){return new Date(a.date)-new Date(b.date);})
    .filter(function(e){return new Date(e.date)>=now;})
    .slice(0,6);
  var dHtml='';
  deadlines.forEach(function(e){
    var ds=new Date(e.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    dHtml+='<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 10px;background:var(--surface2);border-radius:8px;margin-bottom:6px">'
      +'<div><div style="font-size:12.5px;font-weight:700;color:var(--text)">'+e.title+'</div><div style="font-size:11px;color:var(--text3)">'+(e.desc||'Academic calendar')+'</div></div>'
      +'<span class="badge bg-blue">'+ds+'</span>'
      +'</div>';
  });
  document.getElementById('admin-deadlines').innerHTML=dHtml||'<div class="empty">No upcoming deadlines.</div>';

  document.getElementById('admin-actions').innerHTML=
    '<button class="btn btn-primary btn-sm" onclick="openAddCourse()">+ Add Course</button>'
    +'<button class="btn btn-sm" onclick="openAddEvent()">+ Create Event</button>'
    +'<button class="btn btn-sm" onclick="goPage(\'students\',document.getElementById(\'nav-students\'))">Review Students</button>'
    +'<button class="btn btn-sm" onclick="goPage(\'gmail\',document.getElementById(\'nav-gmail\'))">Send Advisory</button>';
}
function stat(lbl,val,sub,pct){
  return '<div class="stat"><div class="stat-lbl">'+lbl+'</div><div class="stat-val">'+val+'</div><div class="stat-sub">'+sub+'</div>'
    +'<div class="stat-bar"><div class="stat-bar-fill" style="width:'+Math.min(100,pct)+'%"></div></div></div>';
}

// ================================================================
// CALENDAR
// ================================================================
function renderCalendar(){
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-label').textContent=months[calMonth]+' '+calYear;
  var grid=document.getElementById('cal-grid');
  var days=['Su','Mo','Tu','We','Th','Fr','Sa'];
  var html='';
  days.forEach(function(d){html+='<div class="cal-day-hdr">'+d+'</div>';});
  var first=new Date(calYear,calMonth,1).getDay();
  var last=new Date(calYear,calMonth+1,0).getDate();
  var today=new Date();
  // Get event dates for this month
  var eventDates=DB.events.filter(function(e){
    var d=new Date(e.date); return d.getFullYear()===calYear&&d.getMonth()===calMonth;
  }).map(function(e){return new Date(e.date).getDate();});
  // Prev month padding
  var prevLast=new Date(calYear,calMonth,0).getDate();
  for(var i=first-1;i>=0;i--){html+='<div class="cal-day other-month">'+(prevLast-i)+'</div>';}
  for(var d2=1;d2<=last;d2++){
    var isToday=d2===today.getDate()&&calMonth===today.getMonth()&&calYear===today.getFullYear();
    var hasEv=eventDates.indexOf(d2)>-1;
    html+='<div class="cal-day'+(isToday?' today':'')+(hasEv?' has-event':'')+'">'+d2+'</div>';
  }
  grid.innerHTML=html;
}
function calNav(dir){calMonth+=dir;if(calMonth<0){calMonth=11;calYear--;}if(calMonth>11){calMonth=0;calYear++;}renderCalendar();}

function renderEvents(){
  var evList=document.getElementById('events-list');
  var now=new Date(); now.setHours(0,0,0,0);
  var upcoming=DB.events.filter(function(e){return new Date(e.date)>=now;}).sort(function(a,b){return new Date(a.date)-new Date(b.date);}).slice(0,6);
  if(!upcoming.length){evList.innerHTML='<div class="empty">No upcoming events.</div>';return;}
  evList.innerHTML=upcoming.map(function(e){
    var d=new Date(e.date); var ds=d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    return '<div class="event-item '+(e.color||'')+'">'
      +'<div><h4>'+e.title+'</h4><p>'+ds+(e.desc?' · '+e.desc:'')+'</p></div>'
      +'</div>';
  }).join('');
}
function openAddEvent(){
  document.getElementById('ev-title').value='';
  document.getElementById('ev-date').value='';
  document.getElementById('ev-color').value='';
  document.getElementById('ev-desc').value='';
  openModal('m-event');
}
function saveEvent(){
  var t=document.getElementById('ev-title').value.trim();
  if(!t){toast('Event title required.','err');return;}
  DB.events.push({title:t,date:document.getElementById('ev-date').value,color:document.getElementById('ev-color').value,desc:document.getElementById('ev-desc').value.trim()});
  closeModal('m-event');
  renderCalendar();
  renderEvents();
  toast('Event added!','ok');
}

// ================================================================
// COURSES
// ================================================================
function renderCourses(){
  var grid=document.getElementById('courses-grid');
  var colors=['c0','c1','c2','c3','c4'];
  grid.innerHTML=DB.courses.map(function(c,i){
    var avg=0; if(c.students.length){c.students.forEach(function(s){avg+=compute(s,c.weeks).grade;});avg=Math.round(avg/c.students.length);}
    return '<div class="course-card '+colors[i%5]+'">'
      +'<div class="cc-code">'+c.code+' &middot; '+c.section+'</div>'
      +'<div class="cc-name">'+c.name+'</div>'
      +'<div class="cc-meta">'+c.sem+' &middot; '+c.units+' units &middot; '+c.room+'</div>'
      +'<div class="cc-footer">'
      +'<div><div class="cc-students">'+c.students.length+' Students</div><div class="cc-schedule">'+c.sched+'</div></div>'
      +'<div style="display:flex;gap:6px;align-items:center">'
      +'<span class="gpill '+gCls(avg)+'">Avg: '+avg+'</span>'
      +'<button class="btn btn-primary btn-sm" onclick="openCourseStudents('+i+')">View Student List</button>'
      +'</div></div>'
      +'<div style="display:flex;gap:5px;margin-top:10px;flex-wrap:wrap">'
      +'<button class="btn btn-sm btn-warn" onclick="editCourse('+i+',event)">✎ Edit</button>'
      +'<button class="btn btn-sm btn-danger" onclick="askDeleteCourse('+i+',event)">🗑 Delete</button>'
      +'</div></div>';
  }).join('');
  document.getElementById('courses-count').textContent=DB.courses.length;
}

function openCourseStudents(idx){
  currentCourseIdx=idx;
  var c=DB.courses[idx];
  document.getElementById('csv-course-name').textContent=c.code+' — '+c.name;
  document.getElementById('csv-course-meta').textContent=c.section+' · '+c.sched+' · '+c.room;
  document.getElementById('courses-main-view').style.display='none';
  document.getElementById('course-student-view').style.display='block';
  // reset tabs
  document.querySelectorAll('#course-student-view .tab').forEach(function(t,i){t.classList.toggle('active',i===0);});
  document.querySelectorAll('#course-student-view .tab-pane').forEach(function(p,i){p.classList.toggle('active',i===0);});
  renderCourseStudents();
  renderCourseActivities();
  renderCourseAttendance();
}
function showCoursesMain(){
  document.getElementById('courses-main-view').style.display='block';
  document.getElementById('course-student-view').style.display='none';
  renderCourses();
}
function renderCourseStudents(){
  var c=DB.courses[currentCourseIdx];
  var rows='';
  c.students.forEach(function(s,i){
    var cv=compute(s,c.weeks); var rat=rating(cv.grade);
    rows+='<tr><td>'+(i+1)+'</td>'
      +'<td><strong>'+s.ln+'</strong>, '+s.fn+' '+s.mi+'</td>'
      +'<td style="font-family:\'JetBrains Mono\',monospace;font-size:11.5px">'+s.sid+'</td>'
      +'<td><a href="mailto:'+s.email+'" style="color:var(--accent)">'+s.email+'</a></td>'
      +'<td><span class="badge '+(cv.attPct>=75?'bg-green':'bg-red')+'">'+cv.attPct+'%</span></td>'
      +'<td>'+cv.qeAvg.toFixed(1)+'</td><td>'+cv.raAvg.toFixed(1)+'</td><td>'+cv.projG+'</td><td>'+cv.majorG+'</td>'
      +'<td>'+cv.tps.toFixed(1)+'</td>'
      +'<td><span class="gpill '+gCls(cv.grade)+'">'+cv.grade+'</span></td>'
      +'<td><span class="badge '+rat.cls+'">'+rat.lbl+'</span></td>'
      +'</tr>';
  });
  document.getElementById('csv-student-body').innerHTML=rows||'<tr><td colspan="12" class="empty">No students enrolled.</td></tr>';
}
function renderCourseActivities(){
  var c=DB.courses[currentCourseIdx];
  var sections={qe:'csv-acts-qe',ra:'csv-acts-ra',prelim:'csv-acts-prelim',midterm:'csv-acts-midterm',final:'csv-acts-final'};
  Object.keys(sections).forEach(function(type){
    var acts=c.activities.filter(function(a){return a.type===type;});
    var el=document.getElementById(sections[type]);
    if(!acts.length){el.innerHTML='<div style="font-size:12px;color:var(--text3);padding:8px 0">No '+type+' activities. <a style="color:var(--accent);cursor:pointer" onclick="openAddCourseActivity()">+ Add one</a></div>';return;}
    el.innerHTML=acts.map(function(a,i){
      var globalIdx=c.activities.indexOf(a);
      return '<div class="act-item">'
        +'<div class="act-item-l"><h4>'+a.title+'</h4><p>Max: '+a.max+' pts &middot; Weight: '+a.wt+'%'+(a.deadline?' &middot; Due: '+new Date(a.deadline).toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'')+'</p></div>'
        +'<div class="act-item-r">'
        +(a.deadline?'<span class="deadline-badge">📅 '+new Date(a.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric'})+'</span>':'')
        +'<button class="btn btn-xs btn-danger" onclick="deleteCourseActivity('+globalIdx+')">🗑</button>'
        +'</div></div>';
    }).join('');
  });
}
function renderCourseAttendance(){
  var c=DB.courses[currentCourseIdx];
  var n=c.weeks.length;
  var hdr='<th>Name</th><th>ID</th><th>Email</th>';
  c.weeks.forEach(function(w){hdr+='<th>'+w+'</th>';});
  hdr+='<th>Att.%</th>';
  var rows='';
  c.students.forEach(function(s,si){
    while(s.att.length<n) s.att.push('P');
    var cells='';
    for(var wi=0;wi<n;wi++){
      var v=s.att[wi]||'P';
      cells+='<td><button class="att-btn att-'+v+'" onclick="toggleCourseAtt('+si+','+wi+',this)">'+v+'</button></td>';
    }
    var cv=compute(s,c.weeks);
    rows+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'
      +'<td style="font-size:11.5px;font-family:\'JetBrains Mono\',monospace">'+s.sid+'</td>'
      +'<td style="font-size:11.5px">'+s.email+'</td>'
      +cells
      +'<td><span class="badge '+(cv.attPct>=75?'bg-green':'bg-red')+'">'+cv.attPct+'%</span></td></tr>';
  });
  document.getElementById('csv-att-wrap').innerHTML='<table><thead><tr>'+hdr+'</tr></thead><tbody>'+(rows||'<tr><td colspan="'+(n+4)+'" class="empty">No students.</td></tr>')+'</tbody></table>';
}
function toggleCourseAtt(si,wi,btn){
  var c=DB.courses[currentCourseIdx];
  var cycle=['P','A','L'];
  var cur=c.students[si].att[wi];
  c.students[si].att[wi]=cycle[(cycle.indexOf(cur)+1)%3];
  renderCourseAttendance();
  renderCourseStudents();
  renderDashboard();
}
function addCourseWeek(){
  var c=DB.courses[currentCourseIdx];
  c.weeks.push('Wk '+(c.weeks.length+1));
  c.students.forEach(function(s){s.att.push('P');});
  renderCourseAttendance();
  toast('Week added.','ok');
}
function delCourseWeek(){
  var c=DB.courses[currentCourseIdx];
  if(c.weeks.length<=1){toast('Must keep at least 1 week.','err');return;}
  c.weeks.pop();
  c.students.forEach(function(s){s.att.pop();});
  renderCourseAttendance();
  toast('Last week removed.','ok');
}

function openAddCourse(){
  document.getElementById('m-course-title').textContent='Add Course';
  document.getElementById('c-idx').value=-1;
  ['c-code','c-section','c-name','c-room','c-sched'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('c-units').value=3;
  openModal('m-course');
}
function editCourse(idx,e){
  if(e){e.stopPropagation();}
  var c=DB.courses[idx];
  document.getElementById('m-course-title').textContent='Edit Course';
  document.getElementById('c-idx').value=idx;
  document.getElementById('c-code').value=c.code;
  document.getElementById('c-section').value=c.section;
  document.getElementById('c-name').value=c.name;
  document.getElementById('c-units').value=c.units;
  document.getElementById('c-room').value=c.room;
  document.getElementById('c-sched').value=c.sched;
  openModal('m-course');
}
function saveCourse(){
  var code=document.getElementById('c-code').value.trim();
  var name=document.getElementById('c-name').value.trim();
  if(!code||!name){toast('Code and Name required.','err');return;}
  var idx=parseInt(document.getElementById('c-idx').value);
  var obj={code:code,section:document.getElementById('c-section').value.trim(),name:name,units:parseInt(document.getElementById('c-units').value)||3,room:document.getElementById('c-room').value.trim(),sched:document.getElementById('c-sched').value.trim(),sem:document.getElementById('c-sem').value,students:[],weeks:['Feb 1','Feb 8','Feb 15','Feb 22','Mar 1','Mar 8'],activities:[]};
  if(idx===-1){DB.courses.push(obj);toast('Course added!','ok');}
  else{obj.students=DB.courses[idx].students;obj.weeks=DB.courses[idx].weeks;obj.activities=DB.courses[idx].activities;DB.courses[idx]=obj;toast('Course updated!','ok');}
  closeModal('m-course');
  renderCourses();
  renderDashboard();
  populateGbSelect();populateAttSelect();populateGmailSelects();
  renderSidebarSchedule();
  document.getElementById('courses-count').textContent=DB.courses.length;
}
function askDeleteCourse(idx,e){
  if(e) e.stopPropagation();
  document.getElementById('m-confirm-msg').textContent='Delete course "'+DB.courses[idx].code+' — '+DB.courses[idx].name+'"? This cannot be undone.';
  document.getElementById('m-confirm-ok').onclick=function(){DB.courses.splice(idx,1);closeModal('m-confirm');renderCourses();renderDashboard();populateGbSelect();populateAttSelect();populateGmailSelects();renderSidebarSchedule();document.getElementById('courses-count').textContent=DB.courses.length;toast('Course deleted.','ok');};
  openModal('m-confirm');
}

// Enroll student
function openEnrollStudent(){
  document.getElementById('m-st-title').textContent='Enroll Student in '+DB.courses[currentCourseIdx].code;
  document.getElementById('s-idx').value=-1;
  ['s-ln','s-fn','s-mi','s-sid','s-em'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('s-year').value='2nd';
  document.getElementById('s-section').value='A';
  // Populate existing students dropdown
  populateExistingStudentsSelect();
  openModal('m-student');
}

function populateExistingStudentsSelect(){
  var courseCode=DB.courses[currentCourseIdx].code;
  var alreadyEnrolled=DB.courses[currentCourseIdx].students.map(function(s){return s.id;});
  var sel=document.getElementById('s-existing');
  sel.innerHTML='<option value="">— Select a student —</option>';
  DB.students.forEach(function(s){
    if(alreadyEnrolled.indexOf(s.id)===-1){
      sel.innerHTML+='<option value="'+s.id+'">'+s.ln+', '+s.fn+' ('+s.sid+') — '+s.year+' '+s.section+'</option>';
    }
  });
}

function onSelectExistingStudent(){
  var sid=parseInt(document.getElementById('s-existing').value);
  if(!sid) return;
  var student=DB.students.find(function(s){return s.id===sid;});
  if(!student) return;
  // Populate form with selected student (for reference)
  document.getElementById('s-ln').value=student.ln;
  document.getElementById('s-fn').value=student.fn;
  document.getElementById('s-mi').value=student.mi;
  document.getElementById('s-sid').value=student.sid;
  document.getElementById('s-em').value=student.email;
  document.getElementById('s-year').value=student.year;
  document.getElementById('s-section').value=student.section;
  document.getElementById('s-idx').value=sid;
}

function enrollSelectedStudent(){
  var sid=parseInt(document.getElementById('s-existing').value);
  if(!sid){toast('Please select a student.','err');return;}
  var student=DB.students.find(function(s){return s.id===sid;});
  if(!student){toast('Student not found.','err');return;}
  var courseIdx=currentCourseIdx;
  var course=DB.courses[courseIdx];
  // Check if already enrolled
  if(course.students.find(function(s){return s.id===student.id;})){toast('Student already enrolled in this course.','err');return;}
  // Create course-specific student record
  var courseStudent={
    id:student.id,ln:student.ln,fn:student.fn,mi:student.mi,sid:student.sid,email:student.email,
    qe:[0,0,0,0],ra:[0,0,0,0],proj:0,major:0,att:[]
  };
  for(var i=0;i<course.weeks.length;i++) courseStudent.att.push('P');
  course.students.push(courseStudent);
  // Add course to student's course list
  if(student.courses.indexOf(courseIdx)===-1) student.courses.push(courseIdx);
  closeModal('m-student');
  renderCourseStudents();
  renderCourseAttendance();
  renderDashboard();
  toast('Student enrolled successfully!','ok');
}

function saveStudent(){
  var ln=document.getElementById('s-ln').value.trim().toUpperCase();
  var fn=document.getElementById('s-fn').value.trim();
  if(!ln||!fn){toast('Last Name and First Name required.','err');return;}
  var sid=parseInt(document.getElementById('s-idx').value);
  var selectedExisting=parseInt(document.getElementById('s-existing').value);
  
  // If editing existing student (from Students page)
  if(sid && sid!==-1){
    var s=DB.students.find(function(x){return x.id===sid;});
    if(s){
      s.ln=ln;
      s.fn=fn;
      s.mi=document.getElementById('s-mi').value.trim();
      s.sid=document.getElementById('s-sid').value.trim();
      s.email=document.getElementById('s-em').value.trim();
      s.year=document.getElementById('s-year').value;
      s.section=document.getElementById('s-section').value;
      // Update student data in all courses they're enrolled in
      DB.courses.forEach(function(c){
        c.students.forEach(function(cs){
          if(cs.id===sid){
            cs.ln=s.ln;
            cs.fn=s.fn;
            cs.mi=s.mi;
            cs.sid=s.sid;
            cs.email=s.email;
          }
        });
      });
      closeModal('m-student');
      renderStudentsPage();
      renderDashboard();
      toast('Student updated!','ok');
    }
    return;
  }
  
  // If enrolling existing student (from course enrollment modal)
  if(selectedExisting && selectedExisting!==-1){
    enrollSelectedStudent();
    return;
  }
  
  // Create new student globally
  var email=document.getElementById('s-em').value.trim();
  var newId=Math.max(...DB.students.map(function(s){return s.id;}),0)+1;
  var newStudent={
    id:newId,
    ln:ln,
    fn:fn,
    mi:document.getElementById('s-mi').value.trim(),
    sid:document.getElementById('s-sid').value.trim(),
    email:email,
    year:document.getElementById('s-year').value,
    section:document.getElementById('s-section').value,
    courses:[]
  };
  DB.students.push(newStudent);
  
  // If called from Students page (no course context), just add student globally
  if(currentCourseIdx===undefined||document.getElementById('s-existing').innerHTML.includes('No course')){
    closeModal('m-student');
    renderStudentsPage();
    toast('Student created! Enroll them in a course from the Courses section.','ok');
    return;
  }
  
  // If called from course enrollment, also enroll in current course
  var c=DB.courses[currentCourseIdx];
  var courseStudent={
    id:newStudent.id,ln:newStudent.ln,fn:newStudent.fn,mi:newStudent.mi,sid:newStudent.sid,email:newStudent.email,
    qe:[0,0,0,0],ra:[0,0,0,0],proj:0,major:0,att:[]
  };
  for(var i=0;i<c.weeks.length;i++) courseStudent.att.push('P');
  c.students.push(courseStudent);
  newStudent.courses.push(currentCourseIdx);
  
  closeModal('m-student');
  renderCourseStudents();
  renderCourseAttendance();
  renderDashboard();
  renderStudentsPage();
  toast('Student created and enrolled!','ok');
}

// Course activities
function openAddCourseActivity(){openModal('m-cact');['ca-title','ca-notes'].forEach(function(id){document.getElementById(id).value='';});document.getElementById('ca-max').value=100;document.getElementById('ca-wt').value='';document.getElementById('ca-deadline').value='';}
function saveCourseActivity(){
  var t=document.getElementById('ca-title').value.trim();
  if(!t){toast('Title required.','err');return;}
  DB.courses[currentCourseIdx].activities.push({title:t,type:document.getElementById('ca-type').value,max:parseInt(document.getElementById('ca-max').value)||100,wt:parseFloat(document.getElementById('ca-wt').value)||0,deadline:document.getElementById('ca-deadline').value,notes:document.getElementById('ca-notes').value.trim()});
  closeModal('m-cact');
  renderCourseActivities();
  toast('Activity added!','ok');
}
function deleteCourseActivity(idx){
  DB.courses[currentCourseIdx].activities.splice(idx,1);
  renderCourseActivities();
  toast('Activity removed.','ok');
}

// ================================================================
// GRADE BOOK (with course selector)
// ================================================================
function populateGbSelect(){
  var sel=document.getElementById('gb-course-sel');
  sel.innerHTML=DB.courses.map(function(c,i){return '<option value="'+i+'">'+c.code+' — '+c.name+'</option>';}).join('');
}
function renderGradebook(){
  var idx=parseInt(document.getElementById('gb-course-sel').value)||0;
  var course=DB.courses[idx]||DB.courses[0];
  if(!course) return;
  renderColTable('qe-wrap','qe','QE',course);
  renderColTable('ra-wrap','ra','RA',course);
  renderProjTable(course);
  renderMajorTable(course);
}
function renderColTable(wid,field,label,course){
  var cols=course.students.length&&course.students[0][field]?course.students[0][field].length:4;
  var hdr='<th>Student</th>';
  for(var c=0;c<cols;c++) hdr+='<th>'+label+' '+(c+1)+'</th>';
  hdr+='<th>Average</th>';
  var rows='';
  course.students.forEach(function(s,si){
    while(s[field].length<cols) s[field].push(0);
    var cells='';
    for(var ci=0;ci<cols;ci++){
      cells+='<td><input class="sc-inp" type="number" min="0" max="100" value="'+Number(s[field][ci])+'" onchange="gbUpdateScore(this,\''+field+'\','+si+','+ci+')"/></td>';
    }
    cells+='<td><strong>'+avg(s[field]).toFixed(2)+'</strong></td>';
    rows+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'+cells+'</tr>';
  });
  document.getElementById(wid).innerHTML='<table><thead><tr>'+hdr+'</tr></thead><tbody>'+(rows||'<tr><td colspan="'+(cols+2)+'" class="empty">No students.</td></tr>')+'</tbody></table>';
}
function gbUpdateScore(inp,field,si,ci){
  var idx=parseInt(document.getElementById('gb-course-sel').value)||0;
  DB.courses[idx].students[si][field][ci]=Math.min(100,Math.max(0,parseFloat(inp.value)||0));
  renderDashboard();
}
function renderProjTable(course){
  var rows='';
  course.students.forEach(function(s,i){
    rows+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'
      +'<td><input class="sc-inp" type="number" min="0" max="100" value="'+s.proj+'" onchange="gbUpdateSimple(this,\'proj\','+i+')"/></td>'
      +'<td><span class="gpill '+gCls(s.proj)+'">'+s.proj+'</span></td></tr>';
  });
  document.getElementById('proj-wrap').innerHTML='<table><thead><tr><th>Student</th><th>Score (0–100)</th><th>Equiv</th></tr></thead><tbody>'+(rows||'<tr><td colspan="3" class="empty">No students.</td></tr>')+'</tbody></table>';
}
function renderMajorTable(course){
  var rows='';
  course.students.forEach(function(s,i){
    rows+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'
      +'<td><input class="sc-inp" type="number" min="0" max="100" value="'+s.major+'" onchange="gbUpdateSimple(this,\'major\','+i+')"/></td>'
      +'<td>'+(s.major*0.30).toFixed(2)+'</td>'
      +'<td><span class="gpill '+gCls(s.major)+'">'+s.major+'</span></td></tr>';
  });
  document.getElementById('major-wrap').innerHTML='<table><thead><tr><th>Student</th><th>Raw Score</th><th>Weighted (×30%)</th><th>Equiv</th></tr></thead><tbody>'+(rows||'<tr><td colspan="4" class="empty">No students.</td></tr>')+'</tbody></table>';
}
function gbUpdateSimple(inp,field,si){
  var idx=parseInt(document.getElementById('gb-course-sel').value)||0;
  DB.courses[idx].students[si][field]=Math.min(100,Math.max(0,parseFloat(inp.value)||0));
  renderDashboard();
}
function addCol(field){
  var idx=parseInt(document.getElementById('gb-course-sel').value)||0;
  DB.courses[idx].students.forEach(function(s){s[field].push(0);});
  renderGradebook();toast('Column added.','ok');
}
function delLastCol(field){
  var idx=parseInt(document.getElementById('gb-course-sel').value)||0;
  var len=DB.courses[idx].students.length&&DB.courses[idx].students[0][field]?DB.courses[idx].students[0][field].length:0;
  if(len<=1){toast('Must keep at least 1 column.','err');return;}
  DB.courses[idx].students.forEach(function(s){s[field].pop();});
  renderGradebook();toast('Last column removed.','ok');
}

// ================================================================
// ATTENDANCE (global page with selector)
// ================================================================
function populateAttSelect(){
  var sel=document.getElementById('att-course-sel');
  sel.innerHTML=DB.courses.map(function(c,i){return '<option value="'+i+'">'+c.code+' — '+c.name+'</option>';}).join('');
}
function renderAttendance(){
  var idx=parseInt(document.getElementById('att-course-sel').value)||0;
  var course=DB.courses[idx]||DB.courses[0];
  if(!course) return;
  var n=course.weeks.length;
  var hdr='<th>Student</th>';
  course.weeks.forEach(function(w){hdr+='<th>'+w+'</th>';});
  var rows='';
  course.students.forEach(function(s,si){
    while(s.att.length<n) s.att.push('P');
    var cells='';
    for(var wi=0;wi<n;wi++){
      var v=s.att[wi]||'P';
      cells+='<td><button class="att-btn att-'+v+'" data-idx="'+idx+'" data-si="'+si+'" data-wi="'+wi+'" onclick="toggleAtt(this)">'+v+'</button></td>';
    }
    rows+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'+cells+'</tr>';
  });
  document.getElementById('att-wrap').innerHTML='<table><thead><tr>'+hdr+'</tr></thead><tbody>'+(rows||'<tr><td colspan="'+(n+1)+'" class="empty">No students.</td></tr>')+'</tbody></table>';
  var sum='';
  course.students.forEach(function(s){
    var c=compute(s,course.weeks);
    sum+='<tr><td><strong>'+s.ln+'</strong>, '+s.fn+'</td>'
      +'<td style="font-family:\'JetBrains Mono\',monospace;font-size:11.5px">'+s.sid+'</td>'
      +'<td style="font-size:11.5px">'+s.email+'</td>'
      +'<td><span class="badge bg-green">'+c.P+'</span></td>'
      +'<td><span class="badge bg-red">'+c.A+'</span></td>'
      +'<td><span class="badge bg-amber">'+c.L+'</span></td>'
      +'<td>'+c.total+'</td>'
      +'<td><span class="badge '+(c.attPct>=75?'bg-green':'bg-red')+'">'+c.attPct+'%</span></td>'
      +'<td>'+c.attScore+'</td></tr>';
  });
  document.getElementById('att-sum').innerHTML=sum||'<tr><td colspan="9" class="empty">No students.</td></tr>';
}
function toggleAtt(btn){
  var idx=parseInt(btn.dataset.idx), si=parseInt(btn.dataset.si), wi=parseInt(btn.dataset.wi);
  var cycle=['P','A','L'];
  var cur=DB.courses[idx].students[si].att[wi];
  DB.courses[idx].students[si].att[wi]=cycle[(cycle.indexOf(cur)+1)%3];
  renderAttendance();
}
function addWeek(){
  var idx=parseInt(document.getElementById('att-course-sel').value)||0;
  var c=DB.courses[idx];
  c.weeks.push('Wk '+(c.weeks.length+1));
  c.students.forEach(function(s){s.att.push('P');});
  renderAttendance();toast('Week added.','ok');
}
function delWeek(){
  var idx=parseInt(document.getElementById('att-course-sel').value)||0;
  var c=DB.courses[idx];
  if(c.weeks.length<=1){toast('Must keep at least 1 week.','err');return;}
  c.weeks.pop();c.students.forEach(function(s){s.att.pop();});
  renderAttendance();toast('Last week removed.','ok');
}

// ================================================================
// CALCULATOR
// ================================================================
function populateCalcSelect(){
  var html='<option value="">— Manual Entry —</option>';
  DB.courses.forEach(function(c,ci){c.students.forEach(function(s,si){html+='<option value="'+ci+'-'+si+'">'+c.code+': '+s.ln+', '+s.fn+'</option>';});});
  document.getElementById('calc-sel').innerHTML=html;
}
function calcAutoFill(){
  var v=document.getElementById('calc-sel').value; if(!v) return;
  var parts=v.split('-'); var ci=parseInt(parts[0]), si=parseInt(parts[1]);
  var c=compute(DB.courses[ci].students[si],DB.courses[ci].weeks);
  document.getElementById('ci-att').value=c.attScore;
  document.getElementById('ci-qe').value=c.qeAvg.toFixed(1);
  document.getElementById('ci-ra').value=c.raAvg.toFixed(1);
  document.getElementById('ci-proj').value=c.projG;
  document.getElementById('ci-exam').value=c.majorG;
  calcNow();
}
function calcNow(){
  var att=parseFloat(document.getElementById('ci-att').value)||0;
  var qe=parseFloat(document.getElementById('ci-qe').value)||0;
  var ra=parseFloat(document.getElementById('ci-ra').value)||0;
  var proj=parseFloat(document.getElementById('ci-proj').value)||0;
  var exam=parseFloat(document.getElementById('ci-exam').value)||0;
  var attW=att*0.10,qeW=qe*0.30,raW=ra*0.50,projW=proj*0.10;
  var perf=attW+qeW+raW+projW;
  var p70=perf*0.70,e30=exam*0.30,tps=p70+e30;
  var g=transmute(tps),rat=rating(g);
  document.getElementById('fbox').innerHTML=
    '<span class="cm">// Class Performance (70% of Final Grade)</span>\n'
    +'<span class="vr">att_score </span>= '+att.toFixed(1)+' x 0.10 = <span class="nm">'+attW.toFixed(2)+'</span>\n'
    +'<span class="vr">qe_avg    </span>= '+qe.toFixed(1)+' x 0.30 = <span class="nm">'+qeW.toFixed(2)+'</span>\n'
    +'<span class="vr">ra_avg    </span>= '+ra.toFixed(1)+' x 0.50 = <span class="nm">'+raW.toFixed(2)+'</span>\n'
    +'<span class="vr">proj      </span>= '+proj.toFixed(1)+' x 0.10 = <span class="nm">'+projW.toFixed(2)+'</span>\n'
    +'<span class="cm">──────────────────────────────────────</span>\n'
    +'<span class="vr">perf_raw  </span>= <span class="nm">'+perf.toFixed(2)+'</span>\n'
    +'<span class="vr">perf x 70%</span>= '+perf.toFixed(2)+' x 0.70 = <span class="nm">'+p70.toFixed(2)+'</span>\n\n'
    +'<span class="cm">// Major Exam (30% of Final Grade)</span>\n'
    +'<span class="vr">exam x 30%</span>= '+exam.toFixed(1)+' x 0.30 = <span class="nm">'+e30.toFixed(2)+'</span>\n\n'
    +'<span class="cm">// Total Performance Score (TPS)</span>\n'
    +'<span class="vr">TPS       </span>= '+p70.toFixed(2)+' + '+e30.toFixed(2)+' = <span class="nm">'+tps.toFixed(2)+'</span>\n\n'
    +'<span class="cm">// Transmuted Final Grade</span>\n'
    +'<span class="vr">GRADE     </span>= transmute('+tps.toFixed(2)+') = <span class="nm">'+g+'</span>';
  document.getElementById('r-grade').textContent=g;
  document.getElementById('r-rating').textContent=rat.lbl;
}

// ================================================================
// GMAIL
// ================================================================
function populateGmailSelects(){
  var csel=document.getElementById('gm-course-sel');
  csel.innerHTML=DB.courses.map(function(c,i){return '<option value="'+i+'">'+c.code+' — '+c.name+'</option>';}).join('');
  gmPopulateStudents();
}
function gmPopulateStudents(){
  var ci=parseInt(document.getElementById('gm-course-sel').value)||0;
  var c=DB.courses[ci];
  var sel=document.getElementById('gm-sel');
  sel.innerHTML=c.students.map(function(s,i){return '<option value="'+i+'">'+s.ln+', '+s.fn+'</option>';}).join('')||'<option>No students</option>';
  if(c.students.length) gmAutoFill();
}
function gmAutoFill(){
  var ci=parseInt(document.getElementById('gm-course-sel').value)||0;
  var si=parseInt(document.getElementById('gm-sel').value)||0;
  var course=DB.courses[ci]; var s=course.students[si]; if(!s) return;
  var c=compute(s,course.weeks), rat=rating(c.grade);
  document.getElementById('gm-to').value=s.email;
  document.getElementById('gm-subj').value='Grade Report — '+course.code+' | '+s.ln+', '+s.fn;
  document.getElementById('gm-body').value=
'Dear '+s.fn+' '+s.ln+',\n\n'
+'This is your official grade report for:\n'
+'Subject : '+course.name+'\n'
+'Code    : '+course.code+' — '+course.section+'\n'
+'Schedule: '+course.sched+'\n'
+'Faculty : Homer T. Favenir  |  S.Y. 2025–2026\n\n'
+'══════════════════════════════════════\n'
+'  GRADE SUMMARY\n'
+'══════════════════════════════════════\n'
+'  Attendance Score     : '+c.attPct+'% (score: '+c.attScore+')\n'
+'  Quiz/Exercise Avg    : '+c.qeAvg.toFixed(2)+'\n'
+'  Recitation/Research  : '+c.raAvg.toFixed(2)+'\n'
+'  Project Grade        : '+c.projG+'\n'
+'  ─────────────────────────────────────\n'
+'  Class Performance    : '+c.perf.toFixed(2)+' × 70% = '+c.perf70.toFixed(2)+'\n'
+'  Major Exam           : '+c.majorG+' × 30% = '+c.exam30.toFixed(2)+'\n'
+'  ─────────────────────────────────────\n'
+'  Total Perf. Score    : '+c.tps.toFixed(2)+'\n'
+'  FINAL GRADE          : '+c.grade+'\n'
+'  Rating               : '+rat.lbl+'\n'
+'══════════════════════════════════════\n\n'
+'Respectfully,\nHomer T. Favenir\nFaculty — College of Computer Studies\nUniversity of Perpetual Help System DALTA';
}
function sendGmail(){
  var to=document.getElementById('gm-to').value.trim();
  var subj=document.getElementById('gm-subj').value.trim();
  var body=document.getElementById('gm-body').value.trim();
  if(!to||!subj){toast('Please fill in To and Subject.','err');return;}
  DB.sentEmails.unshift({to:to,subj:subj,time:new Date().toLocaleString()});
  renderGmailLog();
  window.open('https://mail.google.com/mail/?view=cm&to='+encodeURIComponent(to)+'&su='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body),'_blank');
  toast('Gmail compose window opened!','ok');
}
function clearGmail(){['gm-to','gm-cc','gm-subj','gm-body'].forEach(function(id){document.getElementById(id).value='';});toast('Cleared.','ok');}
function renderGmailLog(){
  var el=document.getElementById('gm-log');
  if(!DB.sentEmails.length){el.innerHTML='<div class="empty">No emails sent yet this session.</div>';return;}
  el.innerHTML=DB.sentEmails.map(function(e){return '<div class="log-item"><h4>'+e.subj+'</h4><p>To: '+e.to+' · '+e.time+'</p></div>';}).join('');
}

// ================================================================
// PROFILE
// ================================================================
function renderProfile(){
  if(!currentUser) return;
  var u=currentUser;
  var initials=u.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
  document.getElementById('profile-header').innerHTML=
    '<div class="profile-av-lg" '+(u.profilePicture?'style="background-image:url('+u.profilePicture+');background-size:cover;background-position:center"':'')+'>'+(u.profilePicture?'':initials)+'</div>'
    +'<div class="profile-info">'
    +'<h2>'+u.name+'</h2><p>'+u.role+' · '+(u.dept||'CCS')+'</p>'
    +'<div class="profile-stats">'
    +'<div class="profile-stat"><div class="num">'+DB.courses.length+'</div><div class="lbl">Courses</div></div>'
    +'<div class="profile-stat"><div class="num">'+DB.courses.reduce(function(a,c){return a+c.students.length;},0)+'</div><div class="lbl">Students</div></div>'
    +'<div class="profile-stat"><div class="num">'+DB.sentEmails.length+'</div><div class="lbl">Emails Sent</div></div>'
    +'</div></div>';
  document.getElementById('pf-name').value=u.name||'';
  document.getElementById('pf-email').value=u.email||'';
  document.getElementById('pf-dept').value=u.dept||'';
  document.getElementById('pf-eid').value=u.eid||'';
  document.getElementById('pf-phone').value=u.phone||'';
  if(u.profilePicture){
    document.getElementById('profileUploadPreview').innerHTML='<img src="'+u.profilePicture+'" />';
  }
  document.getElementById('pf-courses-list').innerHTML=DB.courses.map(function(c){
    return '<div style="padding:8px 10px;background:var(--surface2);border-radius:8px;margin-bottom:6px;font-size:12.5px"><strong>'+c.code+'</strong> — '+c.name+'<br><span style="font-size:11px;color:var(--text3)">'+c.section+' · '+c.sched+'</span></div>';
  }).join('');
}
function saveProfile(){
  if(!currentUser){toast('Not logged in.','err');return;}
  currentUser.name=document.getElementById('pf-name').value.trim()||currentUser.name;
  currentUser.email=document.getElementById('pf-email').value.trim()||currentUser.email;
  currentUser.dept=document.getElementById('pf-dept').value.trim();
  currentUser.eid=document.getElementById('pf-eid').value.trim();
  currentUser.phone=document.getElementById('pf-phone').value.trim();
  var profileData={name:currentUser.name,email:currentUser.email,dept:currentUser.dept,eid:currentUser.eid,phone:currentUser.phone,profilePicture:currentUser.profilePicture};
  localStorage.setItem('profile_'+currentUser.username,JSON.stringify(profileData));
  document.getElementById('sb-name').textContent=currentUser.name;
  document.getElementById('sb-role').textContent=currentUser.role;
  document.getElementById('sb-av-initials').textContent=currentUser.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
  renderProfile();
  toast('Profile saved!','ok');
}
function changePassword(){
  if(!currentUser) return;
  var cp=document.getElementById('pf-cpw').value;
  var np=document.getElementById('pf-npw').value;
  var cp2=document.getElementById('pf-cpw2').value;
  if(cp!==currentUser.password){toast('Current password is incorrect.','err');return;}
  if(np.length<6){toast('New password must be at least 6 characters.','err');return;}
  if(np!==cp2){toast('Passwords do not match.','err');return;}
  currentUser.password=np;
  ['pf-cpw','pf-npw','pf-cpw2'].forEach(function(id){document.getElementById(id).value='';});
  toast('Password changed successfully!','ok');
}
function handleProfileUpload(e){
  var f=e.target.files[0]||e.dataTransfer.files[0];
  if(!f)return;
  if(f.size>5242880){toast('File is too large (max 5MB)','err');return;}
  if(!f.type.startsWith('image/')){
    toast('Please upload an image file','err');return;
  }
  var r=new FileReader();
  r.onload=function(event){
    currentUser.profilePicture=event.target.result;
    var profileData={name:currentUser.name,email:currentUser.email,dept:currentUser.dept,eid:currentUser.eid,phone:currentUser.phone,profilePicture:event.target.result};
    localStorage.setItem('profile_'+currentUser.username,JSON.stringify(profileData));
    document.querySelector('.sb-av').style.backgroundImage='url('+event.target.result+')';
    document.querySelector('.sb-av').textContent='';
    document.getElementById('profileUploadPreview').innerHTML='<img src="'+event.target.result+'" />';
    renderProfile();
    toast('Profile picture updated!','ok');
  };
  r.readAsDataURL(f);
}

// ================================================================
// CORE COMPUTE
// ================================================================
function avg(arr){if(!arr||!arr.length) return 0;return arr.reduce(function(a,b){return a+Number(b);},0)/arr.length;}
function compute(s,weeks){
  var n=(weeks||[]).length, att=s.att.slice(0,n);
  var P=0,A=0,L=0;
  att.forEach(function(v){if(v==='P')P++;else if(v==='A')A++;else if(v==='L')L++;});
  var total=att.length;
  var attPct=total?Math.round(((P+L*0.5)/total)*100):0;
  var attScore=attPct;
  var qeAvg=avg(s.qe), raAvg=avg(s.ra), projG=Number(s.proj), majorG=Number(s.major);
  var perf=attScore*0.10+qeAvg*0.30+raAvg*0.50+projG*0.10;
  var perf70=perf*0.70, exam30=majorG*0.30, tps=perf70+exam30;
  var grade=transmute(tps);
  return {attPct:attPct,attScore:attScore,qeAvg:qeAvg,raAvg:raAvg,projG:projG,majorG:majorG,perf:perf,perf70:perf70,exam30:exam30,tps:tps,grade:grade,P:P,A:A,L:L,total:total};
}
function transmute(t){
  if(t>=96)return 100;if(t>=91)return 95;if(t>=86)return 90;
  if(t>=81)return 85;if(t>=76)return 80;if(t>=71)return 75;
  if(t>=66)return 70;if(t>=61)return 65;if(t>=56)return 60;
  if(t>=51)return 55;return 50;
}
function rating(g){
  if(g>=90)return{lbl:'Outstanding',cls:'bg-green'};
  if(g>=80)return{lbl:'Very Good',cls:'bg-blue'};
  if(g>=70)return{lbl:'Good',cls:'bg-amber'};
  if(g>=60)return{lbl:'Fair',cls:'bg-gray'};
  return{lbl:'Poor',cls:'bg-red'};
}
function gCls(g){if(g>=90)return 'g-out';if(g>=80)return 'g-vg';if(g>=70)return 'g-good';if(g>=60)return 'g-fair';return 'g-poor';}

// ================================================================
// SEARCH
// ================================================================
function globalSearch(q){
  if(!q||q.length<2) return;
  q=q.toLowerCase();
  var results=[];
  DB.courses.forEach(function(c){
    if(c.name.toLowerCase().includes(q)||c.code.toLowerCase().includes(q)) results.push({type:'course',label:c.code+' — '+c.name});
    c.students.forEach(function(s){
      if((s.ln+' '+s.fn).toLowerCase().includes(q)||s.sid.includes(q)) results.push({type:'student',label:s.ln+', '+s.fn+' ('+s.sid+')'});
    });
  });
  if(results.length) toast('Found '+results.length+' result(s) for "'+q+'"','ok');
}

// ================================================================
// NAVIGATION
// ================================================================
var pageTitles={dashboard:'Dashboard',profile:'My Profile',courses:'Courses',students:'Student Directory',gradebook:'Grade Book',attendance:'Attendance',calculator:'Grade Calculator',gmail:'Gmail Reports'};
function goPage(id,el){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('.sb-item').forEach(function(n){n.classList.remove('active');});
  document.getElementById('pg-'+id).classList.add('active');
  if(el) el.classList.add('active');
  var title=(id==='dashboard'&&isAdminUser())?'Admin Dashboard':(pageTitles[id]||id);
  document.getElementById('pgTitle').textContent=title;
  if(id==='dashboard') renderDashboard();
  if(id==='courses'){renderCourses();}
  if(id==='students'){renderStudentsPage();}
  if(id==='gradebook'){renderGradebook();}
  if(id==='attendance'){renderAttendance();}
  if(id==='calculator') populateCalcSelect();
  if(id==='gmail'){populateGmailSelects();renderGmailLog();}
  if(id==='profile') renderProfile();
}
function switchTab(el,paneId){
  var cont=el.closest('.tabs');
  cont.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});
  el.classList.add('active');
  var page=el.closest('.page')||document.getElementById('course-student-view');
  page.querySelectorAll('.tab-pane').forEach(function(p){p.classList.remove('active');});
  document.getElementById(paneId).classList.add('active');
}

// MODAL
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.overlay').forEach(function(o){o.addEventListener('click',function(e){if(e.target===o) o.classList.remove('open');});});

// TOAST
function toast(msg,type){
  type=type||'';
  var c=document.getElementById('toasts');
  var t=document.createElement('div');
  t.className='toast'+(type?' '+type:'');
  t.innerHTML=(type==='ok'?'✓ ':type==='err'?'✕ ':'ℹ ')+msg;
  c.appendChild(t);
  setTimeout(function(){t.remove();},2800);
}

// ================================================================
// STUDENTS PAGE
// ================================================================
function renderStudentsPage(){
  var courseFilter=document.getElementById('stud-filter-course').value;
  var yearFilter=document.getElementById('stud-filter-year').value;
  var sectionFilter=document.getElementById('stud-filter-section').value;
  var searchTerm=document.getElementById('stud-search').value.toLowerCase();
  
  // Populate course filter if empty
  if(!document.getElementById('stud-filter-course').innerHTML.includes('<option value="IT411"')){
    var courseSel=document.getElementById('stud-filter-course');
    courseSel.innerHTML='<option value="">All Courses</option>';
    DB.courses.forEach(function(c,i){
      courseSel.innerHTML+='<option value="'+i+'">'+c.code+' — '+c.name+'</option>';
    });
  }
  
  var filtered=DB.students.filter(function(s){
    var matchCourse=!courseFilter||s.courses.indexOf(parseInt(courseFilter))>-1;
    var matchYear=!yearFilter||s.year===yearFilter;
    var matchSection=!sectionFilter||s.section===sectionFilter;
    var matchSearch=!searchTerm||(s.ln+' '+s.fn).toLowerCase().includes(searchTerm)||s.sid.includes(searchTerm)||s.email.toLowerCase().includes(searchTerm);
    return matchCourse&&matchYear&&matchSection&&matchSearch;
  });
  
  document.getElementById('stud-count-label').textContent='Showing '+filtered.length+' of '+DB.students.length+' students';
  
  var rows='';
  filtered.forEach(function(s,i){
    var enrolledIn=DB.courses.filter(function(c,idx){return s.courses.indexOf(idx)>-1;}).length;
    rows+='<tr><td>'+(i+1)+'</td>'
      +'<td><strong>'+s.ln+'</strong>, '+s.fn+' '+s.mi+'</td>'
      +'<td style="font-family:\'JetBrains Mono\',monospace;font-size:11.5px">'+s.sid+'</td>'
      +'<td><a href="mailto:'+s.email+'" style="color:var(--accent)">'+s.email+'</a></td>'
      +'<td>'+s.year+'</td>'
      +'<td>'+s.section+'</td>'
      +'<td><span class="badge bg-blue">'+enrolledIn+' courses</span></td>'
      +'<td><span class="badge bg-green">Active</span></td>'
      +'<td><div class="td-actions">'
      +'<button class="btn btn-sm" onclick="viewStudentProfile('+s.id+')" title="View Profile">👁</button>'
      +'<button class="btn btn-sm" onclick="editStudentInfo('+s.id+')" title="Edit">✏️</button>'
      +'<button class="btn btn-danger btn-sm" onclick="removeStudentGlobal('+s.id+')" title="Remove">✕</button>'
      +'</div></td></tr>';
  });
  
  document.getElementById('students-table-body').innerHTML=rows||'<tr><td colspan="9" class="empty">No students match your filters.</td></tr>';
}

function filterStudents(){
  renderStudentsPage();
}

function resetStudentFilters(){
  document.getElementById('stud-filter-course').value='';
  document.getElementById('stud-filter-year').value='';
  document.getElementById('stud-filter-section').value='';
  document.getElementById('stud-search').value='';
  renderStudentsPage();
}

function openAddStudent(){
  document.getElementById('s-existing').value='';
  ['s-ln','s-fn','s-mi','s-sid','s-em'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('s-year').value='2nd';
  document.getElementById('s-section').value='A';
  document.getElementById('s-idx').value=-1;
  document.getElementById('s-existing').innerHTML='<option value="">— No course (standalone) —</option>';
  openModal('m-student');
}

function viewStudentProfile(id){
  var s=DB.students.find(function(x){return x.id===id;});
  if(!s){toast('Student not found.','err');return;}
  var courses=DB.courses.filter(function(c,idx){return s.courses.indexOf(idx)>-1;}).map(function(c){return c.code+' — '+c.name;}).join(', ')||'Not enrolled in any course';
  toast('👤 '+s.ln+', '+s.fn+' | ID: '+s.sid+' | Year: '+s.year+' | Courses: '+courses,'');
}

function editStudentInfo(id){
  var s=DB.students.find(function(x){return x.id===id;});
  if(!s){toast('Student not found.','err');return;}
  document.getElementById('s-idx').value=id;
  document.getElementById('s-ln').value=s.ln;
  document.getElementById('s-fn').value=s.fn;
  document.getElementById('s-mi').value=s.mi;
  document.getElementById('s-sid').value=s.sid;
  document.getElementById('s-em').value=s.email;
  document.getElementById('s-year').value=s.year;
  document.getElementById('s-section').value=s.section;
  document.getElementById('s-existing').innerHTML='<option value="">— Editing student —</option>';
  openModal('m-student');
}

function removeStudentGlobal(id){
  var s=DB.students.find(function(x){return x.id===id;});
  if(!s){toast('Student not found.','err');return;}
  document.getElementById('m-confirm-msg').textContent='Remove student "'+s.ln+', '+s.fn+'"? They will be removed from all courses.';
  document.getElementById('m-confirm-ok').onclick=function(){
    DB.courses.forEach(function(c){
      c.students=c.students.filter(function(st){return st.id!==id;});
    });
    DB.students=DB.students.filter(function(x){return x.id!==id;});
    closeModal('m-confirm');
    renderStudentsPage();
    renderDashboard();
    toast('Student removed.','ok');
  };
  openModal('m-confirm');
}

function exportStudents(){
  var filtered=DB.students;
  var courseFilter=document.getElementById('stud-filter-course').value;
  var yearFilter=document.getElementById('stud-filter-year').value;
  var sectionFilter=document.getElementById('stud-filter-section').value;
  var searchTerm=document.getElementById('stud-search').value.toLowerCase();
  
  filtered=filtered.filter(function(s){
    var matchCourse=!courseFilter||s.courses.indexOf(parseInt(courseFilter))>-1;
    var matchYear=!yearFilter||s.year===yearFilter;
    var matchSection=!sectionFilter||s.section===sectionFilter;
    var matchSearch=!searchTerm||(s.ln+' '+s.fn).toLowerCase().includes(searchTerm)||s.sid.includes(searchTerm)||s.email.toLowerCase().includes(searchTerm);
    return matchCourse&&matchYear&&matchSection&&matchSearch;
  });
  
  var csv='Last Name,First Name,Student ID,Email,Year,Section,Courses Enrolled\n';
  filtered.forEach(function(s){
    var courses=DB.courses.filter(function(c,idx){return s.courses.indexOf(idx)>-1;}).map(function(c){return c.code;}).join('; ');
    csv+='"'+s.ln+'","'+s.fn+'","'+s.sid+'","'+s.email+'","'+s.year+'","'+s.section+'","'+courses+'"\n';
  });
  
  var blob=new Blob([csv],{type:'text/csv'});
  var url=window.URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;
  a.download='students_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
  toast('✓ Exported '+filtered.length+' student(s) to CSV','ok');
}
 
// ================================================================ ADMIN FUNCTIONS ================================================================
 
let currentAdminUser = null;
let adminData = {
  faculty: [],
  students: [],
  courses: [],
  enrollments: [],
  designations: []
};
 
// Show admin panel
function showAdminPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').classList.remove('app-hidden');
  loadAdminData();
  updateDashboardStats();
  switchAdminView('dashboard');
}
 
// Switch between admin views
function switchAdminView(viewName) {
  // Hide all views
  const views = document.querySelectorAll('.admin-view');
  views.forEach(view => view.classList.remove('active'));
 
  // Show selected view
  document.getElementById('view-' + viewName).classList.add('active');
 
  // Update nav items
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.target.closest('.admin-nav-item').classList.add('active');
 
  // Load data for specific views
  if (viewName === 'faculty') {
    loadFacultyList();
  } else if (viewName === 'students') {
    loadStudentList();
  } else if (viewName === 'enrollment') {
    loadEnrollmentData();
  } else if (viewName === 'designation') {
    loadDesignationData();
  } else if (viewName === 'curriculum') {
    loadCurriculumList();
  }
}
 
// ================================================================ FACULTY MANAGEMENT ================================================================
 
function openFacultyModal(action) {
  const modal = document.getElementById('facultyModal');
  const form = document.getElementById('facultyForm');
  const detailView = document.getElementById('facultyDetailView');
 
  if (action === 'add') {
    document.getElementById('facultyModalTitle').textContent = 'Add Faculty';
    form.style.display = 'block';
    detailView.style.display = 'none';
    form.reset();
    document.getElementById('facultyId').value = 'FAC' + Date.now();
  }
 
  modal.classList.add('show');
}
 
function closeFacultyModal() {
  document.getElementById('facultyModal').classList.remove('show');
}
 
function saveFaculty(event) {
  event.preventDefault();
 
  const faculty = {
    id: document.getElementById('facultyId').value,
    name: document.getElementById('facultyName').value,
    email: document.getElementById('facultyEmail').value,
    department: document.getElementById('facultyDept').value,
    courses: []
  };
 
  adminData.faculty.push(faculty);
  closeFacultyModal();
  loadFacultyList();
  updateDashboardStats();
}
 
function loadFacultyList() {
  const tbody = document.getElementById('facultyTableBody');
  tbody.innerHTML = '';
 
  adminData.faculty.forEach(faculty => {
    const coursesCount = faculty.courses ? faculty.courses.length : 0;
    const row = `
<tr>
<td>${faculty.id}</td>
<td>${faculty.name}</td>
<td>${faculty.department}</td>
<td>${faculty.email}</td>
<td>${coursesCount} courses</td>
<td>
<div class="action-buttons">
<button class="action-btn view" onclick="viewFacultyDetail('${faculty.id}')">View</button>
<button class="action-btn edit" onclick="editFaculty('${faculty.id}')">Edit</button>
<button class="action-btn delete" onclick="deleteFacultyItem('${faculty.id}')">Delete</button>
</div>
</td>
</tr>
    `;
    tbody.innerHTML += row;
  });
}
 
function viewFacultyDetail(facultyId) {
  const faculty = adminData.faculty.find(f => f.id === facultyId);
  if (!faculty) return;
 
  const modal = document.getElementById('facultyModal');
  const form = document.getElementById('facultyForm');
  const detailView = document.getElementById('facultyDetailView');
 
  form.style.display = 'none';
  detailView.style.display = 'block';
 
  document.getElementById('detailFacultyName').textContent = faculty.name;
  document.getElementById('detailFacultyEmail').textContent = faculty.email;
  document.getElementById('detailFacultyDept').textContent = faculty.department;
 
  // Load assigned courses
  const coursesTable = document.getElementById('facultyCoursesTable');
  coursesTable.innerHTML = '';
  if (faculty.courses && faculty.courses.length > 0) {
    faculty.courses.forEach(courseId => {
      const course = adminData.courses.find(c => c.id === courseId);
      if (course) {
        const row = `
<tr>
<td>${course.code}</td>
<td>${course.name}</td>
<td>${course.section || 'A'}</td>
<td>${course.students || 0}</td>
</tr>
        `;
        coursesTable.innerHTML += row;
      }
    });
  }
 
  modal.classList.add('show');
}
 
function editFaculty(facultyId) {
  const faculty = adminData.faculty.find(f => f.id === facultyId);
  if (!faculty) return;
 
  const form = document.getElementById('facultyForm');
  const detailView = document.getElementById('facultyDetailView');
 
  detailView.style.display = 'none';
  form.style.display = 'block';
 
  document.getElementById('facultyId').value = faculty.id;
  document.getElementById('facultyName').value = faculty.name;
  document.getElementById('facultyEmail').value = faculty.email;
  document.getElementById('facultyDept').value = faculty.department;
}
 
function editFacultyForm() {
  const facultyId = document.getElementById('facultyId').value;
  editFaculty(facultyId);
}
 
function deleteFaculty() {
  const facultyId = document.getElementById('facultyId').value;
  deleteFacultyItem(facultyId);
}
 
function deleteFacultyItem(facultyId) {
  if (confirm('Are you sure you want to delete this faculty?')) {
    adminData.faculty = adminData.faculty.filter(f => f.id !== facultyId);
    loadFacultyList();
    updateDashboardStats();
  }
}
 
function filterFaculty() {
  const searchTerm = document.getElementById('facultySearch').value.toLowerCase();
  const tbody = document.getElementById('facultyTableBody');
  const rows = tbody.querySelectorAll('tr');
 
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? '' : 'none';
  });
}
 
// ================================================================ STUDENT MANAGEMENT ================================================================
 
function openStudentModal(action) {
  const modal = document.getElementById('studentModal');
  const form = document.getElementById('studentForm');
  const detailView = document.getElementById('studentDetailView');
 
  if (action === 'add') {
    document.getElementById('studentModalTitle').textContent = 'Add Student';
    form.style.display = 'block';
    detailView.style.display = 'none';
    form.reset();
    document.getElementById('studentId').value = 'STU' + Date.now();
  }
 
  modal.classList.add('show');
}
 
function closeStudentModal() {
  document.getElementById('studentModal').classList.remove('show');
}
 
function saveStudent(event) {
  event.preventDefault();
 
  const student = {
    id: document.getElementById('studentId').value,
    name: document.getElementById('studentName').value,
    email: document.getElementById('studentEmail').value,
    phone: document.getElementById('studentPhone').value,
    department: document.getElementById('studentDept').value,
    yearLevel: document.getElementById('studentYear').value,
    enrollments: []
  };
 
  adminData.students.push(student);
  closeStudentModal();
  loadStudentList();
  updateDashboardStats();
}
 
function loadStudentList() {
  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = '';
 
  adminData.students.forEach(student => {
    const enrollmentCount = student.enrollments ? student.enrollments.length : 0;
    const row = `
<tr>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.department}</td>
<td>${student.yearLevel} Year</td>
<td>${student.email}</td>
<td>${enrollmentCount} courses</td>
<td>
<div class="action-buttons">
<button class="action-btn view" onclick="viewStudentDetail('${student.id}')">View</button>
<button class="action-btn edit" onclick="editStudent('${student.id}')">Edit</button>
<button class="action-btn delete" onclick="deleteStudentItem('${student.id}')">Delete</button>
</div>
</td>
</tr>
    `;
    tbody.innerHTML += row;
  });
}
 
function viewStudentDetail(studentId) {
  const student = adminData.students.find(s => s.id === studentId);
  if (!student) return;
 
  const modal = document.getElementById('studentModal');
  const form = document.getElementById('studentForm');
  const detailView = document.getElementById('studentDetailView');
 
  form.style.display = 'none';
  detailView.style.display = 'block';
 
  document.getElementById('detailStudentName').textContent = student.name;
  document.getElementById('detailStudentEmail').textContent = student.email;
  document.getElementById('detailStudentDept').textContent = student.department;
  document.getElementById('detailStudentYear').textContent = student.yearLevel + ' Year';
 
  // Load enrolled courses
  const coursesTable = document.getElementById('studentCoursesTable');
  coursesTable.innerHTML = '';
  if (student.enrollments && student.enrollments.length > 0) {
    student.enrollments.forEach(enrollmentId => {
      const enrollment = adminData.enrollments.find(e => e.id === enrollmentId);
      if (enrollment) {
        const course = adminData.courses.find(c => c.id === enrollment.courseId);
        const faculty = adminData.faculty.find(f => f.id === enrollment.facultyId);
        if (course) {
          const row = `
<tr>
<td>${course.code}</td>
<td>${course.name}</td>
<td>${faculty ? faculty.name : 'TBA'}</td>
<td>${enrollment.section || 'A'}</td>
<td>${enrollment.grade || 'INC'}</td>
</tr>
          `;
          coursesTable.innerHTML += row;
        }
      }
    });
  }
 
  modal.classList.add('show');
}
 
function editStudent(studentId) {
  const student = adminData.students.find(s => s.id === studentId);
  if (!student) return;
 
  const form = document.getElementById('studentForm');
  const detailView = document.getElementById('studentDetailView');
 
  detailView.style.display = 'none';
  form.style.display = 'block';
 
  document.getElementById('studentId').value = student.id;
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentEmail').value = student.email;
  document.getElementById('studentPhone').value = student.phone;
  document.getElementById('studentDept').value = student.department;
  document.getElementById('studentYear').value = student.yearLevel;
}
 
function editStudentForm() {
  const studentId = document.getElementById('studentId').value;
  editStudent(studentId);
}
 
function deleteStudent() {
  const studentId = document.getElementById('studentId').value;
  deleteStudentItem(studentId);
}
 
function deleteStudentItem(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    adminData.students = adminData.students.filter(s => s.id !== studentId);
    loadStudentList();
    updateDashboardStats();
  }
}
 
function filterStudents() {
  const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
  const deptFilter = document.getElementById('departmentFilter').value;
  const yearFilter = document.getElementById('yearFilter').value;
  const tbody = document.getElementById('studentTableBody');
  const rows = tbody.querySelectorAll('tr');
 
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const deptCell = row.cells[2]?.textContent || '';
    const yearCell = row.cells[3]?.textContent || '';
 
    const matchesSearch = text.includes(searchTerm);
    const matchesDept = !deptFilter || deptCell.includes(deptFilter);
    const matchesYear = !yearFilter || yearCell.includes(yearFilter + ' Year');
 
    row.style.display = matchesSearch && matchesDept && matchesYear ? '' : 'none';
  });
}
 
// ================================================================ ENROLLMENT MANAGEMENT ================================================================
 
function openEnrollmentModal() {
  const modal = document.getElementById('enrollmentModal');
  const select = document.getElementById('enrollmentStudent');
 
  // Populate student dropdown
  select.innerHTML = '<option value="">Select Student</option>';
  adminData.students.forEach(student => {
    const option = document.createElement('option');
    option.value = student.id;
    option.textContent = `${student.name} (${student.id})`;
    select.appendChild(option);
  });
 
  modal.classList.add('show');
}
 
function closeEnrollmentModal() {
  document.getElementById('enrollmentModal').classList.remove('show');
}
 
function updateAvailableCourses() {
  const studentId = document.getElementById('enrollmentStudent').value;
  const courseSelect = document.getElementById('enrollmentCourse');
 
  courseSelect.innerHTML = '<option value="">Select Course</option>';
  adminData.courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = `${course.code} - ${course.name}`;
    courseSelect.appendChild(option);
  });
}
 
function updateSections() {
  const courseId = document.getElementById('enrollmentCourse').value;
  const sectionSelect = document.getElementById('enrollmentSection');
 
  sectionSelect.innerHTML = '<option value="">Select Section</option>';
  const sections = ['A', 'B', 'C', 'D'];
  sections.forEach(section => {
    const option = document.createElement('option');
    option.value = section;
    option.textContent = `Section ${section}`;
    sectionSelect.appendChild(option);
  });
}
 
function saveEnrollment(event) {
  event.preventDefault();
 
  const enrollment = {
    id: 'ENR' + Date.now(),
    studentId: document.getElementById('enrollmentStudent').value,
    courseId: document.getElementById('enrollmentCourse').value,
    section: document.getElementById('enrollmentSection').value,
    status: 'enrolled'
  };
 
  adminData.enrollments.push(enrollment);
 
  // Add to student's enrollments
  const student = adminData.students.find(s => s.id === enrollment.studentId);
  if (student) {
    if (!student.enrollments) student.enrollments = [];
    student.enrollments.push(enrollment.id);
  }
 
  closeEnrollmentModal();
  loadEnrollmentData();
  updateDashboardStats();
}
 
function loadEnrollmentData() {
  const container = document.getElementById('enrollmentByCourseContainer');
  container.innerHTML = '';
 
  adminData.courses.forEach(course => {
    const courseEnrollments = adminData.enrollments.filter(e => e.courseId === course.id);
 
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
<div class="course-header">
<h3>${course.code}</h3>
<p>${course.name}</p>
</div>
<div class="course-body">
<p><strong>Total Enrolled:</strong> ${courseEnrollments.length}</p>
<ul class="section-list">
${['A', 'B', 'C'].map(section => {
  const sectionEnrollments = courseEnrollments.filter(e => e.section === section);
  return `<li class="section-item">Section ${section}: ${sectionEnrollments.length} students</li>`;
}).join('')}
</ul>
</div>
    `;
    container.appendChild(card);
  });
}
 
function filterEnrollments() {
  // Add filter logic here
}
 
// ================================================================ DESIGNATION MANAGEMENT ================================================================
 
function openDesignationModal() {
  const modal = document.getElementById('designationModal');
  const select = document.getElementById('designationFaculty');
 
  // Populate faculty dropdown
  select.innerHTML = '<option value="">Select Faculty</option>';
  adminData.faculty.forEach(faculty => {
    const option = document.createElement('option');
    option.value = faculty.id;
    option.textContent = `${faculty.name} (${faculty.id})`;
    select.appendChild(option);
  });
 
  modal.classList.add('show');
}
 
function closeDesignationModal() {
  document.getElementById('designationModal').classList.remove('show');
}
 
function updateDesignationSections() {
  const courseId = document.getElementById('designationCourse').value;
  const sectionSelect = document.getElementById('designationSection');
 
  sectionSelect.innerHTML = '<option value="">Select Section</option>';
  const sections = ['A', 'B', 'C', 'D'];
  sections.forEach(section => {
    const option = document.createElement('option');
    option.value = section;
    option.textContent = `Section ${section}`;
    sectionSelect.appendChild(option);
  });
}
 
function saveDesignation(event) {
  event.preventDefault();
 
  const designation = {
    id: 'DES' + Date.now(),
    facultyId: document.getElementById('designationFaculty').value,
    courseId: document.getElementById('designationCourse').value,
    section: document.getElementById('designationSection').value,
    status: 'assigned'
  };
 
  adminData.designations.push(designation);
 
  // Add to faculty's courses
  const faculty = adminData.faculty.find(f => f.id === designation.facultyId);
  if (faculty) {
    if (!faculty.courses) faculty.courses = [];
    faculty.courses.push(designation.courseId);
  }
 
  closeDesignationModal();
  loadDesignationData();
  updateDashboardStats();
}
 
function loadDesignationData() {
  const container = document.getElementById('designationByCourseContainer');
  container.innerHTML = '';
 
  adminData.courses.forEach(course => {
    const courseDesignations = adminData.designations.filter(d => d.courseId === course.id);
 
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
<div class="course-header">
<h3>${course.code}</h3>
<p>${course.name}</p>
</div>
<div class="course-body">
<p><strong>Assigned Faculty:</strong> ${courseDesignations.length}</p>
<ul class="section-list">
${courseDesignations.map(des => {
  const faculty = adminData.faculty.find(f => f.id === des.facultyId);
  return `<li class="section-item">Section ${des.section}: ${faculty ? faculty.name : 'TBA'}</li>`;
}).join('')}
</ul>
</div>
    `;
    container.appendChild(card);
  });
}
 
function filterDesignations() {
  // Add filter logic here
}
 
// ================================================================ CURRICULUM MANAGEMENT ================================================================
 
function openCurriculumModal(action) {
  const modal = document.getElementById('curriculumModal');
  const form = document.getElementById('curriculumForm');
 
  if (action === 'add') {
    document.getElementById('curriculumModalTitle').textContent = 'Add Course';
    form.reset();
  }
 
  modal.classList.add('show');
}
 
function closeCurriculumModal() {
  document.getElementById('curriculumModal').classList.remove('show');
}
 
function saveCurriculum(event) {
  event.preventDefault();
 
  const course = {
    id: 'CRS' + Date.now(),
    code: document.getElementById('courseCode').value,
    name: document.getElementById('courseName').value,
    department: document.getElementById('courseDept').value,
    yearLevel: document.getElementById('courseYear').value,
    units: document.getElementById('courseUnits').value,
    description: document.getElementById('courseDescription').value
  };
 
  adminData.courses.push(course);
  closeCurriculumModal();
  loadCurriculumList();
  updateDashboardStats();
}
 
function loadCurriculumList() {
  const tbody = document.getElementById('curriculumTableBody');
  tbody.innerHTML = '';
 
  adminData.courses.forEach(course => {
    const row = `
<tr>
<td>${course.code}</td>
<td>${course.name}</td>
<td>${course.department}</td>
<td>${course.yearLevel} Year</td>
<td>${course.units} units</td>
<td>${course.description || '-'}</td>
<td>
<div class="action-buttons">
<button class="action-btn edit" onclick="editCurriculum('${course.id}')">Edit</button>
<button class="action-btn delete" onclick="deleteCourse('${course.id}')">Delete</button>
</div>
</td>
</tr>
    `;
    tbody.innerHTML += row;
  });
}
 
function editCurriculum(courseId) {
  const course = adminData.courses.find(c => c.id === courseId);
  if (!course) return;
 
  document.getElementById('courseCode').value = course.code;
  document.getElementById('courseName').value = course.name;
  document.getElementById('courseDept').value = course.department;
  document.getElementById('courseYear').value = course.yearLevel;
  document.getElementById('courseUnits').value = course.units;
  document.getElementById('courseDescription').value = course.description;
 
  document.getElementById('curriculumModalTitle').textContent = 'Edit Course';
  document.getElementById('curriculumModal').classList.add('show');
}
 
function deleteCourse(courseId) {
  if (confirm('Are you sure you want to delete this course?')) {
    adminData.courses = adminData.courses.filter(c => c.id !== courseId);
    loadCurriculumList();
    updateDashboardStats();
  }
}
 
function filterCurriculum() {
  const deptFilter = document.getElementById('curriculumDeptFilter').value;
  const yearFilter = document.getElementById('curriculumYearFilter').value;
  const tbody = document.getElementById('curriculumTableBody');
  const rows = tbody.querySelectorAll('tr');
 
  rows.forEach(row => {
    const deptCell = row.cells[2]?.textContent || '';
    const yearCell = row.cells[3]?.textContent || '';
 
    const matchesDept = !deptFilter || deptCell.includes(deptFilter);
    const matchesYear = !yearFilter || yearCell.includes(yearFilter);
 
    row.style.display = matchesDept && matchesYear ? '' : 'none';
  });
}
 
// ================================================================ DASHBOARD & UTILITY ================================================================
 
function updateDashboardStats() {
  document.getElementById('totalFaculty').textContent = adminData.faculty.length;
  document.getElementById('totalStudents').textContent = adminData.students.length;
  document.getElementById('totalCourses').textContent = adminData.courses.length;
  document.getElementById('totalEnrollments').textContent = adminData.enrollments.length;
}
 
function loadAdminData() {
  // Initialize with sample data (replace with actual database calls)
  if (adminData.courses.length === 0) {
    adminData.courses = [
      {
        id: 'CRS001',
        code: 'CS101',
        name: 'Introduction to Computer Science',
        department: 'CS',
        yearLevel: '1',
        units: 3,
        description: 'Fundamentals of CS'
      },
      {
        id: 'CRS002',
        code: 'IT101',
        name: 'Introduction to IT',
        department: 'IT',
        yearLevel: '1',
        units: 3,
        description: 'Fundamentals of IT'
      }
    ];
  }
}
 
function adminLogout() {
  if (confirm('Are you sure you want to logout?')) {
    currentAdminUser = null;
    document.getElementById('adminDashboard').classList.add('app-hidden');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('loginErr').style.display = 'none';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
  }
}