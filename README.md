# Facily Management Software System
# Summary

This project is a comprehensive database system for Public Facility Management and
Maintenance. It encompasses user management, maintenance management, budget
management, and event scheduling. The system categorizes users into different roles,
such as Managers, Event Organizers, and Staff Members, each with specific
permissions. Managers can add budgets, add electronic equipment to rooms, and
perform budget allocation for different time periods. Event Organizers can book rooms
based on attendee numbers and required devices, ensuring efficient resource
utilization. Staff Members can manage maintenance requests, assign servicing
contracts (also managers), and keep track of device maintenance schedules. This
database system aims to streamline facility management processes, optimize resource
allocation, and improve overall operational efficiency.


# How to run

1. Go to source_code/source_code
2. Run: sqlplus ora_<cwlUserName>@stu
3. Type in your password: a<studentId>
4. Run: start buildTables.sql

The above will create all the tables. 

5. quit from the sql plus
6. Run sh ./remote-start.sh
