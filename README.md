# NWIRP Volunteer Management Webapp

## Project goals

* Enable NWIRP volunteer coordinators to effectively manage a growing number of incoming volunteers
* Shorten the time between when a volunteer reaches out attempting to volunteer and when they receive a reply

## The problem

On a typical day, somewhere between 10-20 new people reach out to NWIRP wanting to get involved as volunteers. This creates some overhead work for the people who these volunteers are reaching out to.

Here is the current process for a typical potential new volunteer
1. Visit NWIRP's [home page](https://www.nwirp.org/) .
2. Navigate to the [volunteer page](https://www.nwirp.org/join-us/volunteer/).
3. Identify the type/s of volunteer work they would like to do (choose from 1-5 opportunities)
4. Manually contact each point of contact for each volunteer opportunity (phone or email)
5. Engage in back and forth conversation with the PoC to determine if:
	* Volunteer is a good fit for the opportunity (satifies any necessary prequisites)
	* Opportunity is a good fit for the volunteer (is this something the volunteer actually wants to do after learning about the specifics) 
6. Begin volunteering

This process seems to be working well, but there is concern over the recent growth rate of the number of volunteers reaching out to NWIRP. Volunteer opportunity managers are getting bogged down by the number of volunteers reaching out to volunteer.

In order to capitalize on their volunteer resources while balancing their own staff resources, NWIRP needs an information system to manage their volunteers in a safe and effective manner.


## Scope

What will be the end results of the project? Describe what phases of work will be undertaken. What is not in scope?

What **is** in scope is the following:
* Collecting volunteer information
* Viewing aggregate volunteer information
	

What **is not** in scope is the following:
* Maintenance of volunteer information (can be deleted after 30 days)
* Interfacing with any of the other existing components of the NWIRP website
Reimplementing mailing list feature with eTapestry or recreating the submission form that submits data to eTapestry


## Solution


The word "solution" is a misnomer, as there are many different solutions possible to tackle this particular problem. Below is a description of one attempt to solve the problem:

Here is the new flow for a potential new volunteers:
1. Volunteer visits NWIRP's [home page](https://www.nwirp.org/) .
2. Volunteer navigates to the [volunteer page](https://www.nwirp.org/join-us/volunteer/).
3. Volunteer identifies and selects the type/s of volunteer work they would like to do (choose from 1-5 opportunities)
4. Volunteer fills out generated surveys that correspond to the volunteer opportunities selected. This will help opportunity managers determine volunteer fit upfront without having to engage in conversation
5. Volunteer manager receives an automated email alert with all of the potential new volunteer's contact info and survey results. This will help the volunteer manager initiate contact and streamline communication.
6. Begin volunteering

The purpose of this new process is A) to cut down overhead work for the volunteer managers and B) to provide a more streamlined experience for the potential new volunteers.




## How to run it locally


This web app is written in Python using the [Django](https://www.djangoproject.com/) server side web framework. It is built to run out of [Docker containers](https://www.docker.com/what-docker) for cross-platform portability and ease of deployment.

1. Install Docker Community Edition (for any OS)
2. Clone the git repo (```git clone https://github.com/luisnaranjo733/nwirp.git```)
3. cd into the git repo
4. Run ```docker-compose build``` to build the docker images
5. Run ```docker-compose up -d``` to run the docker containers in the background
6. Run ```docker-compose down``` to take down the docker containers