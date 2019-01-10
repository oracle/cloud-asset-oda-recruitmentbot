"use strict";
const _ = require('lodash');
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
//        const jobInfo = JSON.parse(jobInfoTxt);
//        const images = JSON.parse(imagesTxt);
        const allInfo = conversation.variable("allInfo");
        let categories = []
        let roles = []
        categories.push(allInfo.JobCategory.length>0 ?  allInfo.JobCategory[0] : '');
        categories.push(allInfo.JobCategory.length>1 ?  allInfo.JobCategory[1] : categories[0]);
        categories.push(allInfo.JobCategory.length>2 ?  allInfo.JobCategory[2] : categories[0]);
        roles.push(allInfo.JobRole.length>0 ?  allInfo.JobRole[0] : '');
        roles.push(allInfo.JobRole.length>1 ?  allInfo.JobRole[1] : roles[0]);
        roles.push(allInfo.JobRole.length>2 ?  allInfo.JobRole[2] : roles[0]);
        const domain1 = allInfo.JobDomain.length>0 ?  allInfo.JobDomain[0] : undefined;
        const domain2 = allInfo.JobDomain.length>1 ?  allInfo.JobDomain[1] : domain1;
        const domain3 = allInfo.JobDomain.length>2 ?  allInfo.JobDomain[2] : domain2;
        const industry1 = allInfo.Industry.length>0 ?  allInfo.Industry[0] : undefined;
        const industry2 = allInfo.Industry.length>0 ?  allInfo.Industry[1] : undefined;
        const industry3 = allInfo.Industry.length>0 ?  allInfo.Industry[2] : undefined;
        const yearsExperience = conversation.variable("yearsExperience") 
        const isSenior = (yearsExperience || 0) > 4;
        const isPartTime = allInfo.IndPartTime ? true : false;
        const isJunior = allInfo.IndStudent ||  allInfo.IndTrainee || (yearsExperience || 100) < 3;
        
        let getDesc = function(counter) {
            let desc = ''; 
            if (isPartTime) {
                desc = "Part-time position"
            }
            if (allInfo.Industry.length>counter) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience in "+allInfo.Industry[counter]+" is a pre"
            }
            else if (allInfo.JobDomain.length>counter) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience with "+allInfo.JobDomain[counter]+" is a pre"
            }
            else if (allInfo.JobDomain.length>0) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience with "+allInfo.JobDomain[0]+" is a pre"
            }
            else if (allInfo.Industry.length>0) {
                desc+= (desc=='' ? 'E' : ', e')+  "xperience in "+allInfo.Industry[0]+" is a pre"
            }
            desc+= (desc=='' ? 'C' : ', c' )+  "ompany car and excellent benefits package included";
//            desc+= '.';
            
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

