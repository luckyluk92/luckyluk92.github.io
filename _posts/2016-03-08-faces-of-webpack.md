---
layout: post
title: Faces of Webpack
date: 2016-03-08 19:23
tags: dajsiepoznac webpack es6 configuration
---

After a little [fun with vim](http://dev.kielczykowski.pl/2016/03/04/how-to-snipmate/) it is time for more configuration within [Reactive Blog](http://dev.kielczykowski.pl/2016/03/01/reactive-blog-project/). 

As I had written before, I decided for React and Redux to be my frontend "toys". Additionally, to have a more pleasant journey I choose es6 to be my flavour of javascript. There can be some of you who don't agree with that choice and are in favour of Vanilla JS or CoffeeScript. Well, I've used both as well as es6 and for now, es6 is my favourite.

Because of all these frontend tools, I need to use some module bundler. Recently, I've noticed a lot of noise about **Webpack** and a team: *React* + *Redux* + *Webpack*. So, there you have, my **frontend trinity**.

This post is not a tutorial of Webpack. It is more of a reference for me and for you (I hope). Below you can find some blogposts about Webpack as well as some conference talks and cookbooks. After that, I want to get my head around connecting Rails and Webpack together in "all in with Webpack" approach.

Let's begin...

## Beginner steps
As [#dajsiepoznac](http://dev.kielczykowski.pl/tags/#dajsiepoznac) started, my experience with Webpack had been equal zero. I had known what is it, but I had never used it. That is why I started looking for some beginner guides.

But before any reading, below you can watch a great talk by [Pete Hunt](https://github.com/petehunt) who worked for Instagram at the time. The talk will show you successful usage of Webpack, the real world example (a quite *popular* one) and also reasons why they switched to fairly new solution.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VkTCL6Nqm6Y" frameborder="0" allowfullscreen></iframe>

The talk shows more advanced configuration, but it will warm you up for some reading below!

Next up, I advise you to read **[Nader's post](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.x3an3crq4)**. He shows basic commands Webpack offers and he explains step by step how to build your very basic config along with an explanation of used attributes.

At this point, some of the concepts from Pete Hunt's talk can clarify.

Yet, one thing is bugging me. I had a problem with *webpack-dev-server*. Everything was working. Webpack was bundling my files and browser outputed what it suppose to, but *webpack-dev-server* didn't work when I wanted use *presets*. It shouted at me that there are any *react* or *es2015* presets, even if everything had been installed (I mean it).

> If you think somethink will work out of the box, it probably will not.
> - Paulo Programmero

Maybe I did something stupid or I'm not aware of some step. I have no idea... If you had the same problem and you solved it, please let me know in the comments.

## I know what Webpack is and that's enough!
Pete Hunt started a [repo](https://github.com/petehunt/webpack-howto), which is in a form of a cookbook. It lets you pick up some configuration, apply to yours and you are ready to go. This will work as summary of the talk above.

## Spliting up your up - chunks and styles
Now, if you need more than putting js files into single bundle, this section is for you. Below you can watch another talk, but this time it contains more advanced topics like bundling your files into several bundles - chunks, and extracting common modules into separate chunk.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MzVFrIAwwS8" frameborder="0" allowfullscreen></iframe>

As a summary, [here](http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/) and [here](http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/) are two posts written by the speaker.

I really like the concept of including styles within js file, especially when we consider React and components. Css file per component seems for me a little bit utopian, but I'll try this approach with *Reactive Blog*. 

