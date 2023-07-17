# Progetto_Tecnologie_App_Web
Create a web app to manage the orders of a restaurant 

## Introduction
The goal is to develop a full-stack web application, comprising a REST-style API backend 
and a SPA Angular frontend to manage the orders of a restaurant. The system must handle 
the following kind of users:

### Waiters
Each waiter carries a mobile device (smartphone or tablet) with which she/he can take 
orders at the tables.

### Cooks
The cooks are notified in real time about the food ordered at each table by the waiters. 
Orders are entered in a queue and grouped by table and by production time so that the 
preparation of dishes for the same table can be served at the same time. A cook, using 
her/his user interface, can notify the system when a disk preparation begins or when is
completed. When all the preparations for a given table are complete, the waiter associated 
with that table is notified so that she/he can proceed to serve.

### Bartenders
Bartenders are conceptually like cooks, but they only deal with drinks. Bartenders receive 
notification of each table's orders and send notification to the waiters when the tray of drinks 
of a specific table is ready for service.

### Cashier
The cashier can produce a receipt for a table with the bill to be paid. The cashier also has a 
view of the statistics on the status of the orders, in particular: 

* Which tables have orders in preparation
* Which waiter is associated with each table
* Which tables are free/occupied
* How long are the kitchen preparation queues

Finally, the cashier can compute the total profit for a day.
