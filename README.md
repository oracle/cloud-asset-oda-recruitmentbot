# Recruitment Bot

This sample bot represents best practices in building intelligent bots using Oracle's Digital Assistant (ODA). Using a "Recruitment" use case, this bot shows how you can use open questions combined with an active listening approach to create an intelligent conversation with the bot user, while extracting as much information as possible to find the best job for the candidate. 

## Getting Started
1. Create a zip file from all files and folders in bot directory, but do NOT include the bot folder itself as top-level folder in the zip file
2. Import the bot zip file you just created in your ODA instance, and train the bot
3. Go to the tester and enter a greeting like "hi"
4. Tap on "Let's get started button"
5. Answer the bot questions
6. Optional: replace the dummy URL links in dialog YAML file on lines 75, 86, 317 and 369 with real URLs
7. Optional: replace the dummy images in customcomponents/components/images.json with real image URLs

## Folder Structure

- bot: contains the unzipped content of the bot archive 
- customcomponents: contains the artefacts for creating custom components used by the bot. See the readme in this directory for details
- web: contains artefacts to deploy the bot as a web page using the Web SDK



