# Recruitment Bot

This sample bot represents best practices in building intelligent bots using Oracle's Digital Assistant (ODA). Using a "Recruitment" use case, this bot shows how you can use open questions combined with an active listening approach to create an intelligent conversation with the bot user, while extracting as much information as possible to find the best job for the candidate. 

## Installation
1. Create a zip file from all files and folders in bot directory, but do NOT include the bot folder itself as top-level folder in the zip file
2. Import the bot zip file you just created in your ODA instance, and train the bot
3. Go to customcomponents folder and run 'npm pack' in this folder. This creates a file customcomponents-1.0.0.tgz in the same folder
4. Go to the "Components" page in the ODA UI, click on "+Service" button and enter a name for the service and upload the tgz file you created in step 3.
5. Go to the bot tester and enter a greeting like "hi"
6. Tap on "Let's get started button"
7. Answer the bot questions
8. Optional: replace the dummy URL links in dialog YAML file on lines 75, 86, 317 and 369 with real URLs
9. Optional: replace the dummy images in customcomponents/components/images.json with real image URLs

## Getting Started
You can start the conversation with the bot by typing a greeting like "hi".
You will then be asked a series of open questions about the kind of job you are looking for and about yourself. When answering the questions, remember this is a recruitment bot for marketing and sales jobs, if you enter job information outside of the marketing/sales context the bot will not understand you.

Provide as much information as possible when answering each open question, and do not answer with a question like "what would you like to know?". The bot is able to capture a wide variety of information, including job names, job categories, job characteristics, job roles and salary and part-time indications, as well as personal information like work experience, education, hobbies/sports, languages you speak and civil state. The bot applies active listening by providing answers based on specific information you provide like your favorite sport.

## Folder Structure

- bot: contains the unzipped content of the bot archive 
- customcomponents: contains the artefacts for creating custom components used by the bot. See the readme in this directory for details
- web: contains artefacts to deploy the bot as a web page using the Web SDK


## License
This sample is distributed under the Universal Permissive License (UPL), Version 1.0.
See LICENSE file for more information.



