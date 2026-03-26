
Two kinds of workloads 

Legacy apps running on VMs 

Container migration


Pathway 1 - Modernization Flow - App A Cymbal Store

Hero Product - Gemini CLI / codmod


Start in source environment (Azure VMs & SQL Server)

Use Gemini CLI with codmod to generate assessment

Use assessment plan with Gemini CLI to refactor/modernize the code

Run the SQL Server on docker locally and test the modernized code

Migrate the database to Cloud SQL from SQL Server (Azure) using DMS

Deploy the modernized code as containers to GKE through Cloud Build 

Show the modernized app on GCP. 


Pathway 2 - Container Lift & Shift Migration Flow - Container App B + Managed database on Azure (Cymbal Store with order functionality)

Hero Product - KubeScan + Gemini CLI


Kubescan

Start database migration

Migrate containers from AKS to GKE 

Show the app on GKE. 

