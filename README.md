# CSYA-Hackathon

## Inspiration
Concussions are known for going undiagnosed, particularly in sports, where there’s pressure to play through injury and more obvious symptoms may not immediately be evident. My sister, for instance, experienced multiple concussions as a competitive cheerleader without realizing, and this resulted in her receiving delayed medical attention and suffering through worsened symptoms. We were motivated to address this problem by developing a convenient and accessible solution for athletes and other individuals prone to concussions, empowering them to independently assess their condition on the spot and seek medical help promptly. By combining a user-friendly and interactive interface with AI features to fill-in for potentially unavailable healthcare professionals, our web app aims to make concussion diagnosis more accessible and efficient than ever before.

## What it does
Concussify determines the likelihood of a concussion based on whether it detects a difference in the pupil size of the right and left eye (a common indication of a concussion). We had also planned for users to be able to take a series of baseline tests that can be repeated after a head injury to determine if there’s been a change in their cognitive speed, memory, or awareness. 

## How we built it
The frontend was written in CSS and HTML, and we developed the backend using Cloudflare Workers, which is an edge-based serverless provider that is based upon the WinterCG runtime; through this, we are able to create a highly-scalable and mobile backend able to tackle almost any challenge. We do not have any lock-in as it is based on the Winter CG Runtime which allows us to move to other providers such as Vercel or Deno. We decided to implement Google sign-in to reduce development time while still providing ease-of-use.
The pupil size detection function was built using two pretrained machine learning models. The image is first processed through OpenCV’s Haar Cascade model for eye detection, then the separate eye images are passed through another model which determines pupil diameter. 

## Challenges we ran into
We faced several challenges, from differing time zones to part of the team being constrained to work on it for a day and a half. There were communication issues which the differing time zones did not help with, nevertheless, we still tried our hardest to overcome this obstacle and are proud of the accomplishments we achieved.


## Accomplishments that we're proud of
We are proud of the lessons we’ve learned, the challenges we tackled, and our ability to still able to make something in a short timeframe. For some team members, this was their first experience in working in a hackathon, and were therefore quite unused to the format. 

## What we learned
Most of us learned more about connecting frontend and backend, as well as working with ML models. 

## What's next for Concussify
We hope to extend on our AI model for detecting pupil size, which due to time limits we weren’t able to fully finish and connect to our main app. We also think Concussify could have many more features for evaluating concussion symptoms, such as tests to measure cognitive processing, attention, and memory. 

