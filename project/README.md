# Project

This is a fullstack project that consists of a Node fastify backend and NextJS frontend. 

Available routes: 
1. `/`: create-next-app default page
1. `/image`: Random image of the day, a list of existing todos and a form to add a new one
1. `/api`: Static hello-world html served from the backend
1. `/api/todos`: GET endpoint returning JSON of todos
1. `/api/randomImage`: Image of the day returned from the backend 

## Exercise 3.06: DBaaS vs DIY

### DBaaS:
Pros: 
- quick and easy to get started
- vendor support
- easier maintenance
- automatic scaling and replication, backups

Cons:
- can get pricey real quick
- vendor lock-in

### DIY
Pros:
- is DIY 
- probably cheaper
- complete control

Cons:
- takes more time to get started, do maintenance
- requires a lot more know-how
- no one else to blame if something goes wrong
- no automatic backups or scaling
