#!/usr/bin/env python3
# Add Christina Marie Lopez as demo student

with open('index_ver1.3.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add to USERS array
old_users = "  {username:'uphmo2023-10005',email:'diaz.r@uphsd.edu.ph',password:'student123',name:'Rafael Diaz',role:'Student',year:'1st',section:'B',sid:'2023-10005',type:'student'}\n];"
new_users = "  {username:'uphmo2023-10005',email:'diaz.r@uphsd.edu.ph',password:'student123',name:'Rafael Diaz',role:'Student',year:'1st',section:'B',sid:'2023-10005',type:'student'},\n  {username:'uphmo_2023_10003',email:'lopez.cm@uphsd.edu.ph',password:'student123',name:'Christina Marie Lopez',role:'Student',year:'2nd',section:'A',sid:'2023-10003',type:'student'}\n];"
content = content.replace(old_users, new_users)

# 2. Add to DB.students array
old_students = "    {id:5,ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',year:'1st',section:'B',courses:[]}\n  ],"
new_students = "    {id:5,ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',year:'1st',section:'B',courses:[]},\n    {id:6,ln:'LOPEZ',fn:'CHRISTINA MARIE',mi:'M.',sid:'2023-10003',email:'lopez.cm@uphsd.edu.ph',year:'2nd',section:'A',courses:[]}\n  ],"
content = content.replace(old_students, new_students)

# 3. Add to IT411 course students
old_it411 = "       {ln:'BAGAYAS',fn:'BOBSON ROB',mi:'V.',sid:'2023-10003',email:'bagayas.br@uphsd.edu.ph',qe:[80,80,80,80],ra:[70,70,70,70],proj:80,major:70,att:['P','A','P','P','P','P']}\n     ],"
new_it411 = "       {ln:'BAGAYAS',fn:'BOBSON ROB',mi:'V.',sid:'2023-10003',email:'bagayas.br@uphsd.edu.ph',qe:[80,80,80,80],ra:[70,70,70,70],proj:80,major:70,att:['P','A','P','P','P','P']},\n       {ln:'LOPEZ',fn:'CHRISTINA MARIE',mi:'M.',sid:'2023-10003',email:'lopez.cm@uphsd.edu.ph',qe:[92,91,93,91],ra:[88,90,87,89],proj:91,major:90,att:['P','P','P','P','P','A']}\n     ],"
content = content.replace(old_it411, new_it411)

# 4. Add to IT421 course students
old_it421 = "       {ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',qe:[75,80,78,82],ra:[70,75,72,78],proj:76,major:74,att:['P','A','P','P','P','P']}\n     ],\n     weeks:['Feb 3','Feb 10','Feb 17','Feb 24','Mar 3','Mar 10'],"
new_it421 = "       {ln:'DIAZ',fn:'RAFAEL',mi:'S.',sid:'2023-10005',email:'diaz.r@uphsd.edu.ph',qe:[75,80,78,82],ra:[70,75,72,78],proj:76,major:74,att:['P','A','P','P','P','P']},\n       {ln:'LOPEZ',fn:'CHRISTINA MARIE',mi:'M.',sid:'2023-10003',email:'lopez.cm@uphsd.edu.ph',qe:[89,88,90,87],ra:[85,84,86,83],proj:88,major:86,att:['P','P','P','L','P','P']}\n     ],\n     weeks:['Feb 3','Feb 10','Feb 17','Feb 24','Mar 3','Mar 10'],"
content = content.replace(old_it421, new_it421)

with open('index_ver1.3.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✓ Successfully added Christina Marie Lopez as demo student')
print('  - Username: uphmo_2023_10003')
print('  - Password: student123')
print('  - Enrolled in IT411 and IT421')
