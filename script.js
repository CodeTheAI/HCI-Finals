// ================================================================
// DATA
// ================================================================
var USERS=[
  {username:'hfavenir',email:'hfavenir@uphsd.edu.ph',password:'uphsd2026',name:'Homer T. Favenir',role:'Faculty · CCS',dept:'College of Computer Studies',eid:'CCS-2024-001',phone:'+63 912 345 6789'}
];
var currentUser=null;
var currentAdminUser=null;
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
  btn.disabled=true; btn.textContent='Signing in…';
  
  // Check for admin credentials FIRST (immediate, no timeout)
  if(u === 'admin' && p === 'admin123'){
    currentAdminUser = {username: 'admin', role: 'admin', name: 'Administrator'};
    document.getElementById('loginScreen').classList.add('hidden');
    showAdminPanel();
    toast('Welcome, Administrator!','ok');
    btn.disabled=false; btn.textContent='Sign In';
    return;
  }
  
  // Faculty login uses setTimeout
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

var selectedRole='faculty';

function selectRole(role){
  selectedRole=role;
}

function demoLogin(){
  if(selectedRole==='admin'){
    document.getElementById('loginUser').value='admin';
    document.getElementById('loginPass').value='admin123';
  } else {
    document.getElementById('loginUser').value='hfavenir';
    document.getElementById('loginPass').value='uphsd2026';
  }
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
  document.getElementById('pgTitle').textContent=pageTitles[id]||id;
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

// ================================================================
// ADMIN FUNCTIONS
// ================================================================
function switchAdminPage(page, el){
  if(el){
    document.querySelectorAll('.sb-item').forEach(function(item){item.classList.remove('active');});
    el.classList.add('active');
  }
  // Hide only admin pages
  document.querySelectorAll('[id^="admin-page-"]').forEach(function(p){p.style.display='none';});
  var targetPage=document.getElementById('admin-page-'+page);
  if(targetPage) targetPage.style.display='block';
  
  switch(page){
    case 'dashboard': renderAdminDashboard(); break;
    case 'faculty': renderAdminFaculty(); break;
    case 'students': renderAdminStudents(); break;
    case 'enrollment': renderAdminEnrollment(); break;
    case 'designation': renderAdminDesignation(); break;
    case 'curriculum': renderAdminCurriculum(); break;
  }
}

function renderAdminDashboard(){
  var totalFaculty=USERS.length;
  var totalStudents=DB.students.length;
  var activeCourses=DB.courses.length;
  var totalStudentEnrollments=0;
  var totalGrade=0;
  var gradeCount=0;
  
  DB.courses.forEach(function(course){
    totalStudentEnrollments+=course.students.length;
    course.students.forEach(function(s){
      var c=compute(s,course.weeks);
      totalGrade+=c.grade;
      gradeCount++;
    });
  });
  
  var avgRating=gradeCount?Math.round(totalGrade/gradeCount*100)/100:0;
  
  var statHtml='';
  statHtml+='<div class="stat-card"><div class="stat-num">'+totalFaculty+'</div><div class="stat-label">Total Faculty</div><div class="stat-desc">Active faculty members</div></div>';
  statHtml+='<div class="stat-card"><div class="stat-num">'+totalStudents+'</div><div class="stat-label">Total Students</div><div class="stat-desc">Enrolled students</div></div>';
  statHtml+='<div class="stat-card"><div class="stat-num">'+activeCourses+'</div><div class="stat-label">Active Courses</div><div class="stat-desc">Running courses</div></div>';
  statHtml+='<div class="stat-card"><div class="stat-num">'+avgRating+'</div><div class="stat-label">Avg Rating</div><div class="stat-desc">Out of 5.0</div></div>';
  
  var dashHtml='<div class="stats-grid">'+statHtml+'</div>';
  
  dashHtml+='<div class="card"><div class="card-hd"><h3>Quick Access</h3></div><div class="quick-access">';
  dashHtml+='<div class="quick-item" onclick="switchAdminPage(\'faculty\', document.querySelectorAll(\'.sb-item\')[1])"><img src="data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b1a2a\' stroke-width=\'2\'%3E%3Ccircle cx=\'12\' cy=\'8\' r=\'4\'/%3E%3Cpath d=\'M6 20c0-4 2.5-6 6-6s6 2 6 6\'/%3E%3C/svg%3E" alt="Faculty" /><h4>Faculty Management</h4><p>Manage '+totalFaculty+' faculty members</p></div>';
  dashHtml+='<div class="quick-item" onclick="switchAdminPage(\'students\', document.querySelectorAll(\'.sb-item\')[2])"><img src="data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b1a2a\' stroke-width=\'2\'%3E%3Ccircle cx=\'8\' cy=\'7\' r=\'3\'/%3E%3Cpath d=\'M5 21c0-2 1.5-4 3-4s3 2 3 4\'/%3E%3Ccircle cx=\'16\' cy=\'8\' r=\'3\'/%3E%3Cpath d=\'M12 21c0-2 2-4 4-4s4 2 4 4\'/%3E%3C/svg%3E" alt="Students" /><h4>Student Management</h4><p>Manage '+totalStudents+' students</p></div>';
  dashHtml+='<div class="quick-item" onclick="switchAdminPage(\'enrollment\', document.querySelectorAll(\'.sb-item\')[3])"><img src="data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b1a2a\' stroke-width=\'2\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/%3E%3Cpath d=\'M7 10h10M7 14h10M7 18h4\'/%3E%3C/svg%3E" alt="Enrollment" /><h4>Enrollment</h4><p>'+totalStudentEnrollments+' total enrollments</p></div>';
  dashHtml+='<div class="quick-item" onclick="switchAdminPage(\'designation\', document.querySelectorAll(\'.sb-item\')[4])"><img src="data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b1a2a\' stroke-width=\'2\'%3E%3Ccircle cx=\'12\' cy=\'8\' r=\'3\'/%3E%3Cpath d=\'M5 20c0-3 2-5 7-5s7 2 7 5\'/%3E%3Cpath d=\'M16 11l3 2-3 2\'/%3E%3C/svg%3E" alt="Designation" /><h4>Designation</h4><p>Faculty roles & assignments</p></div>';
  dashHtml+='</div></div>';
  
  dashHtml+='<div class="card"><div class="card-hd"><h3>Recent Activity</h3></div><div class="activity-list">';
  dashHtml+='<div class="activity-item"><div class="activity-icon">📋</div><div class="activity-info"><strong>System Initialized</strong><p>Admin dashboard ready for operations</p><span class="activity-time">Just now</span></div></div>';
  dashHtml+='<div class="activity-item"><div class="activity-icon">👥</div><div class="activity-info"><strong>'+totalStudents+' Students</strong><p>Currently enrolled in courses</p><span class="activity-time">S.Y. 2025–2026</span></div></div>';
  dashHtml+='<div class="activity-item"><div class="activity-icon">📚</div><div class="activity-info"><strong>'+activeCourses+' Active Courses</strong><p>Running this semester</p><span class="activity-time">1st Semester</span></div></div>';
  dashHtml+='</div></div>';
  
  document.getElementById('admin-page-dashboard').innerHTML=dashHtml;
}

function renderAdminFaculty(){
  var html='<div class="table-responsive"><table class="admin-table"><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
  
  USERS.forEach(function(f, i){
    html+='<tr><td>'+(i+1)+'</td>';
    html+='<td><strong>'+f.name+'</strong></td>';
    html+='<td><a href="mailto:'+f.email+'" style="color:var(--accent)">'+f.email+'</a></td>';
    html+='<td><span class="role-badge">'+f.role+'</span></td>';
    html+='<td>'+f.dept+'</td>';
    html+='<td><span class="status-badge active">Active</span></td>';
    html+='<td><div class="td-actions">';
    html+='<button class="btn btn-sm" onclick="alert(\'View: '+f.name+'\')" title="View">👁</button>';
    html+='<button class="btn btn-sm" onclick="alert(\'Edit: '+f.name+'\')" title="Edit">✏️</button>';
    html+='<button class="btn btn-danger btn-sm" onclick="alert(\'Archive: '+f.name+'\')" title="Archive">🗄️</button>';
    html+='</div></td></tr>';
  });
  
  html+='</tbody></table></div>';
  
  document.getElementById('admin-faculty-list').innerHTML=html||'<div class="empty">No faculty members.</div>';
}

function renderAdminStudents(){
  var html='<div class="table-responsive"><table class="admin-table"><thead><tr><th>#</th><th>Name</th><th>Student ID</th><th>Email</th><th>Year</th><th>Section</th><th>Courses</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
  
  DB.students.forEach(function(s, i){
    var enrolledIn=DB.courses.filter(function(c,idx){return s.courses.indexOf(idx)>-1;}).length;
    html+='<tr><td>'+(i+1)+'</td>';
    html+='<td><strong>'+s.ln+', '+s.fn+'</strong> '+s.mi+'</td>';
    html+='<td style="font-family:\'JetBrains Mono\',monospace;font-size:11px">'+s.sid+'</td>';
    html+='<td><a href="mailto:'+s.email+'" style="color:var(--accent)">'+s.email+'</a></td>';
    html+='<td>'+s.year+'</td>';
    html+='<td>'+s.section+'</td>';
    html+='<td><span class="badge bg-blue">'+enrolledIn+' courses</span></td>';
    html+='<td><span class="status-badge active">Active</span></td>';
    html+='<td><div class="td-actions">';
    html+='<button class="btn btn-sm" onclick="alert(\'View: '+s.ln+', '+s.fn+'\')" title="View">👁</button>';
    html+='<button class="btn btn-sm" onclick="alert(\'Edit: '+s.ln+', '+s.fn+'\')" title="Edit">✏️</button>';
    html+='<button class="btn btn-danger btn-sm" onclick="alert(\'Remove: '+s.ln+', '+s.fn+'\')" title="Remove">✕</button>';
    html+='</div></td></tr>';
  });
  
  html+='</tbody></table></div>';
  
  document.getElementById('admin-students-list').innerHTML=html||'<div class="empty">No students.</div>';
}

function renderAdminEnrollment(){
  var html='<div><h4 style="margin:0 0 16px 0">Enrollment by Course</h4>';
  html+='<div class="enrollment-stats">';
  
  DB.courses.forEach(function(c, i){
    var enroll=c.students.length;
    var capacity=30;
    var percent=Math.round(enroll/capacity*100);
    html+='<div class="enrollment-card">';
    html+='<div class="enrollment-header"><strong>'+c.code+'</strong><span class="enrollment-count">'+enroll+'/'+capacity+'</span></div>';
    html+='<div class="enrollment-name">'+c.name+'</div>';
    html+='<div class="enrollment-bar"><div class="enrollment-fill" style="width:'+percent+'%;background:'+( enroll>=25?'var(--red)':enroll>=15?'var(--amber)':'var(--green)')+'"></div></div>';
    html+='<div class="enrollment-footer"><span>'+percent+'% Capacity</span><span>Section '+c.section.substring(0,5)+'</span></div>';
    html+='</div>';
  });
  
  html+='</div>';
  html+='<div style="margin-top:20px;padding:16px;background:var(--bg2);border-radius:8px;text-align:center;color:var(--text3)">';
  html+='<strong>Total Enrollments:</strong> '+DB.courses.reduce(function(sum,c){return sum+c.students.length;},0)+'<br>';
  html+='<strong>Average per Course:</strong> '+Math.round(DB.courses.reduce(function(sum,c){return sum+c.students.length;},0)/DB.courses.length);
  html+='</div></div>';
  
  var el=document.getElementById('admin-enrollment-list');
  if(el) el.innerHTML=html;
}

function renderAdminDesignation(){
  var designations=[
    {role:'Department Chair',dept:'College of Computer Studies',faculty:3,color:'#8b1a2a'},
    {role:'Faculty Coordinator',dept:'College of Computer Studies',faculty:2,color:'#c8932a'},
    {role:'Academic Adviser',dept:'College of Computer Studies',faculty:5,color:'#4a7c59'},
    {role:'Laboratory Instructor',dept:'College of Computer Studies',faculty:8,color:'#5b9aa0'},
    {role:'Curriculum Specialist',dept:'College of Computer Studies',faculty:1,color:'#d4a574'}
  ];
  
  var html='<div class="designation-list">';
  designations.forEach(function(d){
    html+='<div class="designation-card" style="border-left:4px solid '+d.color+'">';
    html+='<div class="designation-header">';
    html+='<h4>'+d.role+'</h4>';
    html+='<span class="faculty-count">'+d.faculty+' Faculty</span>';
    html+='</div>';
    html+='<div class="designation-dept">'+d.dept+'</div>';
    html+='<div class="designation-actions">';
    html+='<button class="btn btn-sm" onclick="alert(\'View assignments for '+d.role+'\')" title="View">View</button>';
    html+='<button class="btn btn-sm" onclick="alert(\'Edit '+d.role+'\')" title="Edit">Edit</button>';
    html+='</div>';
    html+='</div>';
  });
  html+='</div>';
  
  document.getElementById('admin-designation-list').innerHTML=html;
}

function renderAdminCurriculum(){
  var programs=[
    {code:'BSCS',name:'Bachelor of Science in Computer Science',units:120,semesters:8,active:34},
    {code:'BSIS',name:'Bachelor of Science in Information Systems',units:118,semesters:8,active:28},
    {code:'BSIT',name:'Bachelor of Science in Information Technology',units:119,semesters:8,active:22}
  ];
  
  var html='<div class="curriculum-list">';
  programs.forEach(function(p){
    html+='<div class="curriculum-card">';
    html+='<div class="curriculum-header">';
    html+='<h4>'+p.code+' - '+p.name+'</h4>';
    html+='<span class="active-badge">'+p.active+' Active</span>';
    html+='</div>';
    html+='<div class="curriculum-details">';
    html+='<div class="detail-item"><strong>Total Units:</strong> '+p.units+'</div>';
    html+='<div class="detail-item"><strong>Semesters:</strong> '+p.semesters+'</div>';
    html+='<div class="detail-item"><strong>Active Courses:</strong> '+p.active+'</div>';
    html+='</div>';
    html+='<div class="curriculum-actions">';
    html+='<button class="btn btn-sm" onclick="alert(\'View curriculum for '+p.code+'\')" title="View">View</button>';
    html+='<button class="btn btn-sm" onclick="alert(\'Edit '+p.code+'\')" title="Edit">Edit</button>';
    html+='<button class="btn btn-sm" onclick="alert(\'Export '+p.code+'\')" title="Export">Export</button>';
    html+='</div>';
    html+='</div>';
  });
  html+='</div>';
  
  var el=document.getElementById('admin-curriculum-list');
  if(el) el.innerHTML=html;
}