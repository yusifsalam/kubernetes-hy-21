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

## Exercise 3.07: Commitment

I chose DIY because it's cooler and I already have it implemented. Doing everything yourself also means you get to make all the possible mistakes and maybe even learn from them.

![i like to live dangerously](./assets/danger.jpeg)

## Exercise 3.10: Project v1.6

![log](./assets/log.png)

## Exercise 4.03: Prometheus

![prometheus](./assets/prometheus.png)

## Exercise 4.06: Project 2.0

As can be seen from the video below, there are 6 replicas of the broadcaster app running at the same time and they do not interfere with each other.

https://user-images.githubusercontent.com/42574232/144722192-6e638dfe-8dd1-4602-b573-95b1a0ea211b.mov

## Exercise 4.07: GitOpsify Cluster

Cluster config is stored at https://github.com/yusifsalam/kube-cluster-dwk

Ping-pong app requires a secret for the postgres password, so a secret has to be created in the flux-system namespace. Assuming the age key file is `key.txt`, the command is:
`cat key.txt | kubectl -n flux-system create secret generic sops-age \ --from-file=age.agekey=/dev/stdin`. The key has to end with "agekey" for flux to know that it's an age key file and be able to decrypt it.
After creating the sops-age secret, we can run `flux reconcile kustomization my-secrets` to force a sync instead of waiting for 10m.
