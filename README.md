
# WONDER WOMAN (BMZ-AI), May, 2019
### Mini, Bella, Zia


## Motivation:
When the TV goes to sleep it displays random pictures of places. The TV provided no details, and my friends and I would argue about where they were taken. This turned into a guessing game, but for most pictures, we couldn’t prove who was right.  We decided an app that could ‘look-up’ these pictures would solve this problem, and the app could play a game too.

## Description:
Our application allows users to upload any image, and then quickly see a description of that image by using the Microsft Cognitive Service Computer Vision API. The site has also a game powered by the same API.
 
##Architectural Design 

#Image Analyzer
We built an app using the Microsft Cognitive Service Computer Vision API to retrieve details about an image. 
Now, the image will be identified by the API, and its details displayed. 

#The Smart Game
We also added a game feature, to provide socializing experience.
Opentdb API is also used to generate random questions. 
 
## Results:
We built an app using the  Microsft Cognitive Service Computer Vision API API and an uploader, and the other DotDot API to retrieve details about an image that was uploaded.  Now, an image can be uploaded to the app, and it displays details. We also added a game feature, to provide the experience without the TV.

## Technologies Used
Microsoft Computer Vision API
Open Trivia Database API
HTML, CSS, Booststrap
Java Scriot
p5.js
jQuery 
jQuery ajax

## Known bugs
* The p5.js is currently is not playing the background sound for the game.
(propably a problem with the p5.js CDN)

## Team Effort:
As a team we discussed and decide together on:
The website design and content
API selection

## Challenges:

Finding an API that would give us list of cities near places which is why we changed the format of the game we originally wanted to create.
Collaborating with git
Resolving conflict

##Improvements
Larger selection of pictures in game. 
Improve formatting (give specific examples)
Make the background sound to work again


