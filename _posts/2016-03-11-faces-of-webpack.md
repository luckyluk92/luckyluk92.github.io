---
layout: post
title: Faces of Webpack
summary: A brief guide for Webpack. Collection of blogposts and conference talks from beginner to more advanced. This also includes my comments.
date: 2016-03-11 00:01
tags: dajsiepoznac webpack es6 configuration
---

After a little [fun with vim](http://dev.kielczykowski.pl/2016/03/04/how-to-snipmate/) it is time for more configuration within [Reactive Blog](http://dev.kielczykowski.pl/2016/03/01/reactive-blog-project/). 

As I had written before, I decided for React and Redux to be my frontend "toys". Additionally, to have a more pleasant journey I choose es6 to be my flavour of javascript. There can be some of you who don't agree with that choice and are in favour of Vanilla JS or CoffeeScript. Well, I've used both as well as es6 and for now, es6 is my favourite (I really miss inline if statement from CoffeeScript though).

Because of all these frontend tools, I need to use some module bundler. Recently, I've noticed a lot of noise about **Webpack** and a team: *React* + *Redux* + *Webpack*. So, there you have, my **frontend trinity**.

This post is not a tutorial of Webpack. It is more of a reference or directions for me and for you (I hope). Below you can find some blogposts about Webpack as well as some conference talks and cookbooks. After that, I want to get my head around connecting Rails and Webpack together in "all in with Webpack" approach.

Let's begin...

## Beginner steps
As [#dajsiepoznac](http://dev.kielczykowski.pl/tags/#dajsiepoznac) started, my experience with Webpack had been equal zero. I had known what is it, but I had never used it. That is why I started looking for some beginner guides.

But before any reading, below you can watch a great talk by [Pete Hunt](https://github.com/petehunt) who worked for Instagram at the time. The talk will show you successful usage of Webpack, the real world example (a quite *popular* one) and also reasons why they switched to fairly new solution.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VkTCL6Nqm6Y" frameborder="0" allowfullscreen></iframe>

The talk shows more advanced configuration, but it will warm you up for some reading below!

Next up, I advise you to read [Nader's post](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.x3an3crq4). He shows basic commands Webpack offers and he explains step by step how to build your first basic config along with an explanation of used attributes.

At this point, some of the concepts from Pete Hunt's talk can clarify.

Yet, one thing is bugging me. I had a problem with *webpack-dev-server*. Everything was working. Webpack was bundling my files and browser outputed what it suppose to, but *webpack-dev-server* didn't work when I wanted use *presets*. It shouted at me that there are any *react* or *es2015* presets, even if everything had been installed (I mean it).

> If you think somethink will work out of the box, it probably will not.
> - Paulo Programmero

Maybe I did something stupid or I'm not aware of some step. I have no idea... If you had the same problem and you solved it, please let me know in the comments.

## I know what Webpack is and that's enough!
Pete Hunt started a [repo](https://github.com/petehunt/webpack-howto), which is in a form of a cookbook. It lets you pick up some configuration, apply to yours and you are ready to go. This will work as summary of the talk above.

## Spliting up your app - chunks and styles
Now, if you need more than putting js files into single bundle, this section is for you. Below you can watch another talk, but this time it contains more advanced topics like bundling your files into several bundles - chunks, and extracting common modules into separate chunk.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MzVFrIAwwS8" frameborder="0" allowfullscreen></iframe>

As a summary, [here](http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/) and [here](http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/) are two posts written by the speaker.

I really like the concept of including styles within js file, especially when we consider React and components. CSS file per component seems for me a little bit utopian, but I'll try this approach with *Reactive Blog*. To be more graphic, here is how I imagine myself the folder hierarchy:

```
+-SomeComponent/
  |
  +-_specs/
  |
  +-SomeChild/
  |
  +-component.es6.jsx
  |
  +-styles.sass
```
I will test it and check if it is a good fit for me. Probably, there will be some post about it.

## The all in
[Here](http://clarkdave.net/2015/01/how-to-use-webpack-with-rails/) you can find a great article / tutorial about Webpack and how to use it with Rails. It is long, but it shows a lot.

The first thing I liked was moving your javscript files to a different folder rather than to `assets/javascripts`. The author proposed `frontend/javascripts` and the previous one should be for Webpack's output. Then, we put `assets/javascripts` folder to `.gitignore`. Of course, there's other way - putting everything together, but bundled output would be mixed up with our whole frontend. In my opinion, author's view seems interesting and worth of trying and this is what I'm going to do.

There is one section that I'd like to focus on - *Using webpack in production*. I want to clarify for myself why I need those steps.

First of all, I read [*The Asset Pipeline Guide*](http://guides.rubyonrails.org/asset_pipeline.html). At this point, a sort of poor understanding of steps in mentioned blogpost, turned out to be more clear now. Digesting, fingerprinting, caching, in one hand I knew about these things, but because Rails provides them out of the box I've never thought about manually doing them and what actually is happening in there.

We could let Sprockets to take care of Webpack's bundles as well, but we are *all in*, remember?

Sprockets in order to being able to figure out the real filename of our fingerprinted bundles, creates a manifest file, which is a json file containing the real name and generated digest. To create Webpack's manifest file the author created a rake task for that purpose which is convenient and clean. However, without proper configuration within Rails files, an app won't use it (the manifest).

Then, the author creates some helpers to actually make the files available for browser.

I don't know how about you, but I feel pretty amazed by this. That amazement shows I can't take everything for granted...

## Conclusion
When I wanted to write a post about Webpack, I had a vision of just a guide, few steps - how to start and where to move on. But, after diving more into some advanced Webpack's freatures, I knew that I have to write not only a guide, but a little discussion with myself for myself. You see, Rails was created having in mind fast development, convenience and above all - *convention over configuration*. As far as I'm concerned, this caused a little bit of ignorance among developers. However, this is understandable. We can't know everything, can we?.

It turned out for me that Webpack has more than one face. In one hand, the basic config is simple, which allows us start quickly, but then if we want more advanced configuration, it requires more awareness. In fact, isn't it actually perfect?

Share with me your experience with Webpack and / or other thoughts.
