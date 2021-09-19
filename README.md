# Team-Project-22


<h1>Proposal 1 :</h1>

<h2>FriendNearMe - Housing Community Network Portal</h2>


<h3>Introduction to problem statement:</h3>
Residents of housing communities (like Avalon, 101 San Fernando, etc) often do not know other people living in the same community, sometimes not even their neighbours. Community members can often help each other when it comes to emergency situations, lending/borrowing things, making social connections or just making friends.

<h3>Abstract:</h3>
Maintaining a relationship with the people living close by but outside of one’s own family and friends can come handy in times of need. While most people will have accounts on social media websites, how can a resident know who lives around him/her? Even if the resident knows the name of the person, how can one search and connect on the social media website? This portal answers both the questions by providing that platform where people can get to know other people living in the same community. <br><br>

The following two points differentiate this portal from social media websites :<br>
1. All data is visible to and controlled by the housing community itself, which already has access to the residents’ housing data. It will not be accessible to any third party company.<br>
2. The members can be assured that all people on the portal belong to the community and are within reach, there are no strangers.

<h3>Approach:</h3>
The housing community will have added the details of the residents in the portal when the residents start their lease and then the residents can sign up using those credentials on the portal. 
Get friend recommendations based on the similarity of interests with other residents. (implemented using document similarity functionality in IBM Cloud DB for ElasticSearch)
Residents sign up and enter their details and can view other residents’ details (as revealed by them).
They can view the items available for borrowing / list items they want to lend.


<h3>Persona:</h3>
Housing Community Owner Persona - The entity that owns all the houses in the community can sign up and maintain the details of the current residents in the portal.
<br>
Resident Persona - The resident can sign up on the portal using the credentials provided by the housing community owner and create his profile.


<h3>Technologies Used:</h3>
Server side - NodeJS, Express <br>
Client side - React <br>
Database - Cloudant <br>
Cloud and containerization - AWS EC2, AWS ECR, AWS ECS, Docker <br>
Similarity score functionality - IBM Cloud Databases for Elasticsearch  <br>
