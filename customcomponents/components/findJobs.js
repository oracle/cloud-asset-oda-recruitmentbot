/*******************************************************************************
 Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
******************************************************************************/
"use strict";
const jobInfo = require('./jobInfo.json');
const images = require('./images.json');

module.exports = {

    metadata: () => (
        {
            "name": "findJobs",
            "properties": {
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {
        const allInfo = conversation.variable("allInfo");
        let jobCategories = allInfo.JobCategory || [];
        let categories = []
        let jobRoles = allInfo.JobRole || [];
        let roles = []
        let jobDomains = allInfo.JobDomain || [];
        let industries = allInfo.Industry || [];
        categories.push(jobCategories.length>0 ?  jobCategories[0] : '');
        categories.push(jobCategories.length>1 ?  jobCategories[1] : categories[0]);
        categories.push(jobCategories.length>2 ?  jobCategories[2] : categories[0]);
        roles.push(jobRoles.length>0 ?  jobRoles[0] : '');
        roles.push(jobRoles.length>1 ?  jobRoles[1] : roles[0]);
        roles.push(jobRoles.length>2 ?  jobRoles[2] : roles[0]);
        const domain1 = jobDomains.length>0 ?  jobDomains[0] : undefined;
        const domain2 = jobDomains.length>1 ?  jobDomains[1] : domain1;
        const domain3 = jobDomains.length>2 ?  jobDomains[2] : domain2;
        const industry1 = industries.length>0 ?  industries[0] : undefined;
        const industry2 = industries.length>0 ?  industries[1] : undefined;
        const industry3 = industries.length>0 ?  industries[2] : undefined;
        const yearsExperience = conversation.variable("yearsExperience") 
        const isSenior = (yearsExperience || 0) > 4;
        const isPartTime = allInfo.IndPartTime ? true : false;
        const isJunior = allInfo.IndStudent ||  allInfo.IndTrainee || (yearsExperience || 100) < 3;
        
        let getDesc = function(counter) {
            let desc = ''; 
            if (isPartTime) {
                desc = "Part-time position"
            }
            if (industries.length>counter) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience in "+industries[counter]+" is a pre"
            }
            else if (jobDomains.length>counter) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience with "+jobDomains[counter]+" is a pre"
            }
            else if (jobDomains.length>0) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience with "+jobDomains[0]+" is a pre"
            }
            else if (industries.length>0) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience in "+industries[0]+" is a pre"
            }
            desc+= (desc=='' ? 'C' : ', c' )+  "ompany car and excellent benefits package included";
            
            return desc;
        }

        let getCard = function(j,counter) {
            let desc =   getDesc(counter);
            let title = j.title || j.role;
            if (isSenior && j.senior) {
                title = "Senior "+title;
            }
            if (isJunior && j.junior) {
                title = "Junior "+title;
            }   
            let card = {title: title
                ,description: desc
                ,image: images[Math.floor(Math.random() * 10)]}
            return card;                
        }

        let getJobs = function(value, property) {
            let counter = -1;
            if (property=='role') {
                let matchingJob = jobInfo.filter(j => j.role==value)[0];
                return jobInfo.filter(j => j.group==matchingJob.group).map(j => {
                    counter++;
                    return getCard(j,counter);           
                }) 
            }
            else {
                return jobInfo.filter(j => j.category==value).map(j => {
                    counter++;
                    return getCard(j,counter);           
                })                 
            }
        }

        let jobs = [];
        if (roles[0]) {
            jobs = getJobs(roles[0],'role'); 
        }        
        else if (categories[0]) {
            jobs = getJobs(categories[0],'category'); 
        }        
        conversation.variable("jobs",jobs);
        conversation.transition();
        done();
    }
};

