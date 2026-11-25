const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toastEl = $('#toast');
let toastTimer;
function toast(message){toastEl.textContent=message;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2800)}
const state = {
  tasks: [
    {title:'Complete API integration',project:'CRM Platform',team:'Engineering',priority:'High',done:false},
    {title:'Prepare project report',project:'Analytics Dashboard',team:'Operations',priority:'Medium',done:false},
    {title:'Review UI design',project:'Employee Portal',team:'Design',priority:'Low',done:false},
    {title:'Update documentation',project:'Internal Tools',team:'Engineering',priority:'Medium',done:false}
  ],
  employees:[
    {name:'Harish Kumar',id:'NPK-1024',role:'Software Engineer',department:'Engineering',status:'Present'},
    {name:'Priya Sharma',id:'NPK-1031',role:'HR Executive',department:'Human Resources',status:'On leave'},
    {name:'Ravi Teja',id:'NPK-1042',role:'Business Analyst',department:'Operations',status:'Present'},
    {name:'Ananya Reddy',id:'NPK-1050',role:'UI/UX Designer',department:'Design',status:'Present'},
    {name:'Arjun Rao',id:'NPK-1063',role:'Project Manager',department:'Engineering',status:'Absent'}
  ],
  projects:[
    {name:'CRM Platform',owner:'Harish Kumar',team:'Engineering',progress:78,status:'In progress'},
    {name:'Analytics Dashboard',owner:'Ravi Teja',team:'Operations',progress:54,status:'In progress'},
    {name:'Employee Portal',owner:'Ananya Reddy',team:'Design',progress:91,status:'In progress'},
    {name:'Internal Tools',owner:'Sujith Bobba',team:'Engineering',progress:100,status:'Completed'}
  ],
  leaves:[
    {name:'Priya Sharma',type:'Casual leave',dates:'Nov 26 – Nov 27',status:'Pending'},
    {name:'Arjun Rao',type:'Sick leave',dates:'Nov 24',status:'Approved'},
    {name:'Meera Reddy',type:'Earned leave',dates:'Dec 02 – Dec 04',status:'Pending'}
  ]
};
const pageContent = $('#pageContent');
const dashboardMarkup = pageContent.innerHTML;
const pages = {
'Employees':{subtitle:'Manage employee records, roles and team details.',columns:['Employee','Employee ID','Role','Department','Status'],rows:()=>state.employees.map(e=>[e.name,e.id,e.role,e.department,e.status])},
'Attendance':{subtitle:'Review daily attendance and employee check-in records.',columns:['Employee','Employee ID','Department','Check-in','Status'],rows:()=>state.employees.map((e,i)=>[e.name,e.id,e.department,e.status==='Present'?['09:02 AM','09:15 AM','09:08 AM'][i%3]:'—',e.status])},
'Projects':{subtitle:'Track delivery, ownership and progress across company projects.',columns:['Project','Owner','Team','Progress','Status'],rows:()=>state.projects.map(p=>[p.name,p.owner,p.team,p.progress+'%',p.status])},
'Tasks':{subtitle:'Create, assign and track the work that moves projects forward.',columns:['Task','Project','Team','Priority','Status'],rows:()=>state.tasks.map(t=>[t.title,t.project,t.team,t.priority,t.done?'Completed':'Open'])},
'Leave Management':{subtitle:'Review employee leave requests and approval status.',columns:['Employee','Leave type','Dates','Status','Action'],rows:()=>state.leaves.map(l=>[l.name,l.type,l.dates,l.status,l.status==='Pending'?'Review':'—'])},
'Departments':{subtitle:'Department structure and team distribution.',columns:['Department','Team lead','Employees','Active projects','Status'],rows:()=>[['Engineering','Sujith Bobba','48','5','Active'],['Operations','Ravi Teja','32','3','Active'],['Human Resources','Priya Sharma','12','1','Active'],['Design','Ananya Reddy','18','2','Active'],['Customer Success','Meera Reddy','42','1','Active']]},
'Team Management':{subtitle:'Team ownership, capacity and collaboration.',columns:['Team','Team lead','Members','Projects','Status'],rows:()=>[['Engineering','Sujith Bobba','48','5','Active'],['Operations','Ravi Teja','32','3','Active'],['Design','Ananya Reddy','18','2','Active'],['Customer Success','Meera Reddy','42','1','Active']]},
'Timesheets':{subtitle:'Review submitted work hours and weekly time records.',columns:['Employee','Week ending','Regular hours','Overtime','Status'],rows:()=>[['Harish Kumar','Nov 22, 2026','40.0','0.0','Submitted'],['Priya Sharma','Nov 22, 2026','38.5','0.0','Submitted'],['Ravi Teja','Nov 22, 2026','40.0','2.0','Pending'],['Ananya Reddy','Nov 22, 2026','36.0','0.0','Submitted']]},
'Meetings':{subtitle:'Keep track of team syncs, reviews and company events.',columns:['Meeting','Date','Time','Location','Status'],rows:()=>[['Project sync meeting','Nov 25, 2026','10:30–11:30 AM','Meeting room A','Upcoming'],['Team stand-up','Nov 26, 2026','11:00–11:30 AM','Online','Upcoming'],['Management review','Nov 27, 2026','03:00–04:00 PM','Board room','Upcoming']]},
'Announcements':{subtitle:'Company news and important updates for everyone.',columns:['Announcement','Published by','Date','Audience','Status'],rows:()=>[['Building a better workplace, together','HR Team','Nov 24, 2026','All employees','Published'],['November project milestones','PMO','Nov 20, 2026','Project teams','Published'],['Holiday calendar update','HR Team','Nov 18, 2026','All employees','Published']]},
'Documents':{subtitle:'A central place for company policies, templates and shared files.',columns:['Document','Category','Owner','Updated','Access'],rows:()=>[['Employee Handbook.pdf','HR Policy','HR Team','Nov 18, 2026','Company'],['IT Security Guidelines.pdf','IT Policy','IT Admin','Nov 12, 2026','Company'],['Project Status Template.xlsx','Templates','PMO','Nov 10, 2026','Company']]},
'Assets':{subtitle:'Track company equipment and asset allocation.',columns:['Asset','Asset ID','Assigned to','Category','Status'],rows:()=>[['Dell Latitude Laptop','AST-001','Harish Kumar','Laptop','Assigned'],['HP ProBook','AST-002','Priya Sharma','Laptop','Assigned'],['Meeting Room Display','AST-014','Office Admin','Equipment','Available']]},
'Reports':{subtitle:'Explore operational summaries and export the records you need.',columns:['Report','Period','Owner','Last updated','Status'],rows:()=>[['Attendance summary','November 2026','HR Team','Today','Ready'],['Project progress report','November 2026','PMO','Today','Ready'],['Task completion report','This week','Team Leads','Today','Ready'],['Leave balance report','FY 2026–27','HR Team','Yesterday','Ready']]},
'Settings':{subtitle:'Manage workspace preferences, company profile and access controls.',columns:['Setting','Description','Current value','Status'],rows:()=>[['Company profile','Organization details','NPK Business Solutions Pvt Ltd','Configured'],['User access','Role-based permissions','5 role types','Configured'],['Notifications','Email and in-app alerts','In-app enabled','Enabled'],['Security','Session and password policies','Demo mode','Needs setup']]}
};
function navTo(page){
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  $('#crumbPage').textContent=page;
  $('#sidebar').classList.remove('open');
  if(page==='Dashboard'){pageContent.innerHTML=dashboardMarkup;bindDashboard();return}
  const conf=pages[page]||pages.Reports;
  pageContent.innerHTML=`<div class="welcome-row"><div><div class="eyebrow"><span class="eyebrow-line"></span>NPK BUSINESS WORKSPACE</div><h1>${page}</h1><p>${conf.subtitle}</p></div><div class="welcome-actions"><button class="btn btn-light" id="pageExport">↧ Export CSV</button><button class="btn btn-primary" id="pageAdd">＋ ${page==='Employees'?'Add employee':page==='Projects'?'New project':page==='Tasks'?'New task':page==='Meetings'?'Schedule meeting':page==='Leave Management'?'New leave request':'Add record'}</button></div></div><div class="page-placeholder"><div class="table-tools"><div><strong>${page} overview</strong><p style="font-size:10px;color:#94a2b1;margin:5px 0 0">Sample workspace data · Connect a backend for live company records</p></div><input class="table-search" id="tableSearch" placeholder="Filter records..."></div><div style="overflow:auto"><table class="data-table"><thead><tr>${conf.columns.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody id="tableBody"></tbody></table></div></div><footer class="footer"><span>© 2026 <strong>NPK Business Solutions Pvt Ltd.</strong> All rights reserved.</span><div><a href="#" data-goto="Settings">Privacy</a><a href="#" data-goto="Settings">Terms</a><a href="mailto:support@npkbusinesssolutions.com">Support</a><span class="system-status"><i></i> Demo workspace</span></div></footer>`;
  const drawRows=(filter='')=>{$('#tableBody').innerHTML=conf.rows().filter(row=>row.join(' ').toLowerCase().includes(filter.toLowerCase())).map(row=>`<tr>${row.map((cell,i)=>{let val=String(cell);if(['Present','Approved','Completed','Published','Ready','Assigned','Available','Active','Submitted','Configured','Enabled'].includes(val))return `<td><span class="status-pill">${val}</span></td>`;if(['Pending','Absent','Needs setup','Open'].includes(val))return `<td><span class="status-pill pending">${val}</span></td>`;if(val==='In progress')return `<td><span class="status-pill progress">${val}</span></td>`;if(val.endsWith('%')&&Number(val.slice(0,-1))>=0)return `<td><strong>${val}</strong></td>`;return `<td>${val}</td>`}).join('')}</tr>`).join('')||`<tr><td colspan="${conf.columns.length}" class="empty-state">No matching records found.</td></tr>`};
  drawRows();$('#tableSearch').addEventListener('input',e=>drawRows(e.target.value));
  $('#pageExport').addEventListener('click',()=>downloadCSV(page,conf.columns,conf.rows()));
  $('#pageAdd').addEventListener('click',()=>openAddModal(page));
  $$('[data-goto]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();navTo(b.dataset.goto)}));
}
function bindDashboard(){
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>navTo(b.dataset.page)));
  $$('[data-goto]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();navTo(b.dataset.goto)}));
  $$('#taskList .task-row input').forEach((input,i)=>input.addEventListener('change',()=>{state.tasks[i].done=input.checked;toast(input.checked?'Task marked as completed':'Task reopened');$('#taskMetric').textContent=Math.max(0,86-state.tasks.filter(t=>t.done).length)}));
  $('#addTaskBtn')?.addEventListener('click',()=>openAddModal('Tasks'));
  $('#quickActionBtn')?.addEventListener('click',()=>openQuickModal());
  $('#exportBtn')?.addEventListener('click',()=>downloadCSV('NPK_Dashboard',['Metric','Value'],[['Total employees','152'],['Present today','138'],['Active projects','12'],['Open tasks','86'],['Pending leaves','14']]));
  $('#notificationsBtn')?.addEventListener('click',()=>toast('You are all caught up — no new notifications.'));
  $('#chartRange')?.addEventListener('change',e=>toast(`Chart range changed to ${e.target.value}. Demo visualization shown.`));
  $('#globalSearch')?.addEventListener('input',e=>{const v=e.target.value.trim().toLowerCase();if(!v)return;const match=[...state.employees.map(x=>x.name),...state.projects.map(x=>x.name),...state.tasks.map(x=>x.title)].find(x=>x.toLowerCase().includes(v));if(match)toast(`Found: ${match}. Open the relevant section to view details.`)});
}
function openModal(title,body){$('#modalTitle').textContent=title;$('#modalBody').innerHTML=body;$('#modalBackdrop').classList.add('open');$('#modalClose').focus()}
function closeModal(){$('#modalBackdrop').classList.remove('open')}
function openQuickModal(){openModal('What would you like to do?',`<div class="quick-actions"><button class="btn btn-light" data-quick="Employees">＋ Add employee</button><button class="btn btn-light" data-quick="Projects">＋ Create project</button><button class="btn btn-light" data-quick="Tasks">＋ Create task</button><button class="btn btn-light" data-quick="Meetings">＋ Schedule meeting</button><button class="btn btn-light" data-quick="Leave Management">＋ Leave request</button></div>`);$$('[data-quick]').forEach(b=>b.addEventListener('click',()=>{closeModal();openAddModal(b.dataset.quick)}));}
function openAddModal(page){
  const fields = page==='Employees'?[['name','Full name','text'],['role','Job title','text'],['department','Department','text'],['status','Status','select']]:
    page==='Projects'?[['name','Project name','text'],['owner','Project owner','text'],['team','Department / team','text'],['progress','Progress (%)','number']]:
    page==='Tasks'?[['title','Task title','text'],['project','Project','text'],['team','Assigned team','text'],['priority','Priority','select']]:
    page==='Meetings'?[['name','Meeting title','text'],['date','Date','date'],['time','Time','time'],['location','Location / link','text']]:
    page==='Leave Management'?[['name','Employee name','text'],['type','Leave type','text'],['dates','Leave dates','text']]:[['name','Record name','text'],['details','Details','text']];
  const form=fields.map(([id,label,type])=>`<div class="form-field ${fields.length%2&&id===fields[fields.length-1][0]?'full':''}"><label for="f_${id}">${label}</label>${type==='select'?`<select id="f_${id}">${(id==='status'?['Present','Absent','On leave']:['Low','Medium','High']).map(o=>`<option>${o}</option>`).join('')}</select>`:`<input id="f_${id}" type="${type}" ${id==='progress'?'min="0" max="100"':''} required>`}</div>`).join('');
  openModal(page==='Leave Management'?'Create leave request':`Add ${page==='Employees'?'employee':page==='Projects'?'project':page==='Tasks'?'task':page==='Meetings'?'meeting':'record'}`,`<form id="addForm"><div class="form-grid">${form}</div><button class="form-submit" type="submit">Save to demo workspace</button><p style="font-size:10px;color:#8c9aaa;line-height:1.5">Demo mode: changes are held in this browser session and are not sent to a company database.</p></form>`);
  $('#addForm').addEventListener('submit',e=>{e.preventDefault();const val=id=>$('#f_'+id)?.value||'';if(page==='Employees')state.employees.unshift({name:val('name'),id:'NPK-'+Math.floor(1000+Math.random()*8999),role:val('role'),department:val('department'),status:val('status')});else if(page==='Projects')state.projects.unshift({name:val('name'),owner:val('owner'),team:val('team'),progress:Number(val('progress')||0),status:'In progress'});else if(page==='Tasks')state.tasks.unshift({title:val('title'),project:val('project'),team:val('team'),priority:val('priority'),done:false});else if(page==='Leave Management')state.leaves.unshift({name:val('name'),type:val('type'),dates:val('dates'),status:'Pending'});else if(page==='Meetings')toast('Meeting saved in this demo session.');closeModal();if(page==='Employees')$('#employeeMetric').textContent=152+state.employees.length-5;if(page==='Projects')$('#projectMetric').textContent=12+state.projects.length-4;if(page==='Tasks')$('#taskMetric').textContent=86+state.tasks.length-4;toast(`${page} record saved in demo workspace.`);if(page!=='Meetings')navTo(page)});
}
function downloadCSV(name,headers,rows){const csv=[headers,...rows].map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name.replaceAll(' ','_')+'.csv';a.click();URL.revokeObjectURL(url);toast('CSV report exported.')}
$('#modalClose').addEventListener('click',closeModal);$('#modalBackdrop').addEventListener('click',e=>{if(e.target===$('#modalBackdrop'))closeModal()});document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#globalSearch')?.focus()}if(e.key==='Escape')closeModal()});$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));bindDashboard();