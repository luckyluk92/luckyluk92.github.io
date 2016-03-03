---
layout: post
title: How to snipmate?
summary: This post shows my struggle with snipmate and silly mistakes which can be made by person who use it for the first time.
date: 2016-03-03 22:13
tags: vim dajsiepoznac snippets vim-snipmate
---

I have been using VIM since the very beginning of my professional Rails career. Even though, it has been quite a lot of time, I don't consider myself as advanced user and still I do a lot of things in a beginner way. But I enjoy VIM anyway. Of course, I understand people who use other editors or IDEs like RubyMine (I used Visual Studio quite a lot) because RubyMine was my first choice but... it wasn't good fit for me. 

Anyway, this post isn't about VIM itself. The brief introduction was just simple indication why I started using snippets so long after I had been using it everyday. This post is about [vim-snipmate](https://github.com/garbas/vim-snipmate) and my foolish struggle with it.

First of all, this plugin is a fork of not maintained [snipmate.vim](https://github.com/msanders/snipmate.vim) ([here](https://github.com/msanders/snipmate.vim/pull/67) is an explanation of that matter). So, for those who still are using it, maybe it is time for some upgrade.

For example, in React there is a well defined structure of a component and the fact that this is a javascript (even in es6 flavour) typing this piece of code over and over again is a little bit annoying and tiring. I don't have any issue with Ruby because of lack of braces ( `{}` ) and rare usage of parentheses ( `()` ). That's why snippets for Ruby are quite unnecessary for me but not for javascript.

Very excited that I reminded myself about snippets and increased convenience, I started setting up the plugin. vim-snipmate goes without any snippets, so I decided to create separate [repo](https://github.com/luckyluk92/snippets) for found or created ones.

The struggle began when I wanted to add my own snippets, but first let's talk more about vim-snipmate itself. The syntax is quite straight forward.

```
snippet name
  content
```

`name` is a string when typed and a trigger button is hit, it will be replace with `content`. Easy right[^1]? Of course, there are more possibilities like stops, mirrors and placeholders.

## Stops
The name says it all. The stop lets you type some custom text within put snippet.

```
snippet if
  if (${1}) {${2}}
```

`${n}` is a syntax for stop, where `n` is an order. By `<Tab>` you move to next stop and by `<S-Tab>` you move to previous one.

There is also a special stop. Its `n` is equal to `0`. The plugin understands it as its stop after execution.

## Placeholder
The placeholder syntax is an extension of stop's syntax:

```
snippet ppt
  propTypes: {
    ${1}: React.PropTypes.${2:string}
  }
```

Placeholder in that case is nothing other than default value. When you move to the next stop without changing the placeholder the held value will remain. It can be also be useful as a hint.

## Mirrors
Mirrors starts to be great when a snippet contains two or more places with the same input.

```
snippet component
  var ${1} = React.createClass({
    displayName: '$1'
  });
```

Mirror is defined by `$n`. Where `n` indicates which stop to copy.

Remember the difference. **If you put mirror instead of a stop, your cursor will be placed at the end of snippet.**

These information are enough for beginner vim-snipmate user. Now let's get to...

## The Struggle




[^1]: No sarcasm here!
