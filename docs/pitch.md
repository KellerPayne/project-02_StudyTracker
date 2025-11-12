# Pitch
**Track:** Productivity
**Product (one line):** A local-first study tracker that helps students measure and visualize their study sessions without sign-ins or cloud dependencies.
**Problem & User:** Students often underestimate how much they actually study and lack a simple, private way to track and reflect on their focus time. This app provides an offline-first timeer and log that records each study session locally, while anonymously syncing totals to the cloud.
**Core Loop (3-5 sentences):**
The user will be able to choose a subject and start the study timer. The timer runs in real time, showing minutes and seconds while the session is active. When the user stops the timer, the app records the duration and adds it to the local session history. THe data syncs to JSONBin as an anonymous log, and a moticational quote fetched from the Quotable API is displayed. On reload, the app will restore all past sessions isntantly from local storage.