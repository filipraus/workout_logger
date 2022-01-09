# **Workout Logger 0.1.0**

## Preface

In my past projects, I mostly stuck to using Django with Vanilla/Plain JavaScript (following a Model-View-Controller design pattern). Now, when I think I got the fundamentals down, I decided to dive deeper into what Python and JavaScript have to offer. Hence why I decided to build this web application using Django REST API and React frameworks. Both are very large frameworks that offer a multitude of ways for doing things. This will require more time and an application that can be sensically large enough to try as many things as possible.

## Table of Contents

[1. Introduction](#1-introduction)

[2. User Manual](#2-user-manual)

[3. Technical Implementation](#3-technical-implementation)

[4. Conclusion](#4-conclusion)

[5. Todos](#5-todos)

## 1. Introduction

A workout logger is very similar to a todo app. Users can do all of the CRUD operations. But the main difference is that one is used for logging data regarding the physical energy output (in the sense of how often and how intensely you exercise) and the other for productive output (in the sense of getting things done). I find that there is quite a bit more nuance when it comes to measuring physical energy output since the output will highly depend on your body composition, age, predispositions or disabilities.

Since individuals have different anatomies they will need to have different workout regimes to maximize the returns on their time, money and energy investments. To be able to effectively create a workout regime that maximizes the ROI, you would need to have an almost intimate knowledge of how each individual responds to different training stimuluses.

Thus, the first step would be to create a logger - &quot;computer program for making a systematic recording of events, observations, or measurements&quot;.

The second and the third step would be to create two algorithms. One for creating a workout regime, based on past performance data, that would maximize each individual&#39;s ROI for their goals - the **&quot;Smart Workout Generator&quot;**. The second algorithm would auto-regulate or auto-correct the workout based on almost real-time inputs of the user - the &quot; **Smart Workout Optimizer&quot;**. These two algorithms can be wrapped up into a **&quot;Smart Workout&quot;** feature.

Creating the Smart Workout feature will almost be like finding Alpha in financial markets - &quot;Alpha is used in finance as a measure of performance, indicating when a strategy, trader, or portfolio manager has managed to beat the market return over some period&quot;.

Some of the variables that Smart Workout should take into account for each individual are the most optimal:

- Workout and exercise frequency - how often are the workouts and exercises being done.
- Workout and exercise intensity - the rate at which workouts and exercises are performed.
- Recovery periods between workouts and exercises - how much time passes between the last and the next workout or exercise.

The data logged into Workout Logger would be pipelined into Smart Workout and it would probably take at least a few weeks to create an approximation of the optimal workout regime. For new users it could give a potentially most optimal workout based on past data that was logged by other users with similar goals and anatomies.

But the possibilities here are very large, especially as IoT is becoming more and more built into our lives. We already have smart watches that can track with high accuracy your physical activity, heart rate, energy levels, and even blood sugar levels. We will come to a point where all the fitness data is automatically logged and you will immediately know what is the next thing you need to do to reach your fitness goals sooner and more effectively.

This project might as well prove that I will have an opportunity to work, or at least dabble, with embedded programming, data engineering and machine learning, at some point down the road, at which there will most likely already exist commercial products that fulfill this vision. Nevertheless, having an open source version won&#39;t hurt the market and it will only push up the lower boundary for the commercial quality of similar applications.

## 2. User Manual

This chapter will be updated with each new version. The steps below will guide you through all of the current functionality. It is robustly builded so it might feel a little bit clunky, there are definitely improvements that can be done.

The goal was to create the basic CRUD functionality of a workout logger by utilizing a 3rd party calendar with which users can interact. The current version does not have Django authentication implemented which means that everyone will be interacting with the same calendar.

![](/screenshots/wg01.png)
  
![](/screenshots/wg02.png)
  
![](/screenshots/wg03.png)
  
![](/screenshots/wg04.png)
  
![](/screenshots/wg05.png)
  
![](/screenshots/wg06.png)
  
![](/screenshots/wg07.png)
  
![](/screenshots/wg08.png)
  
## 3. Technical Implementation

Tech stack: Django, Django REST API framework, React (classes) + FullCalendar (3rd party JavaScript calendar library), CSS, Git, Docker, Heroku.

Coming from Vanilla JavaScript and MVC design pattern, React makes things even clearer when dealing with continuously increasing size of the codebase.

Right now, I got the hang of only one part of it, namely the React class-components approach. I already have plans for refactoring the app to use React Hooks with functional components. After which I will most likely also refactor it to use TypeScript. No later than version 1.0.0.

With the Django REST API framework I feel like a lot of things are abstracted away, and that is one reason why I would like to learn Node.js at some point.

As you can imagine, this is going to be a long and slow process where I will have the opportunity to thoroughly master the fundamentals of each part of each technology.

Here are some screenshots to get familiar with the project structure and the organization of components. I recommend trying to imagine how all of the things are connected and then going through the source code.

![](/screenshots/file_structure.png)   ![](/screenshots/react_components.png)
  
## 4. Conclusion
All in all, this project has a lot of work left to be done, at the moment it feels quite clunky and the UI/UX is not perfect. But my goal is to build a large robust application by continuously diving deeper into many different technologies, such as Django, Django REST API, Python Dash, React (with Classes and with Hooks and functional components), React Native, TypeScript, Git, Docker, Heroku, among others.

## 5. Todos 

[ ] add Django auth (either stock Django auth, or Django REST API framework’s Oauth2)

[ ] add new pages for user authentication, user settings, user preferences, user workout statistics, documentation, etc (opportunity to utilize React Routers and Python Dash for data visualization)

[ ] refactor the codebase to React Hooks and functional components

[ ] refactor the codebase to React + TypeScript

[ ] write tests with React Testing Library

[ ] continuously fix any newly found bugs

[ ] create data visualization/statistics page with Python Dash

[ ] expand and update "User Manual" and "Technical Implementation" sections

[ ] add "Installation" section to the README.md explaining how to install the app locally
