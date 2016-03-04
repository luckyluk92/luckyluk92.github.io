---
layout: post
title: How to snipmate?
summary: This post shows how to use snipmate and avoid silly mistakes which can be made by person who use it for the first time.
date: 2016-03-04 22:00
tags: vim dajsiepoznac snippets vim-snipmate
---

I have been using VIM since the very beginning of my professional Rails career. Even though, it has been quite a lot of time, I don't consider myself as advanced user and I still do a lot of things in a beginner way. But I enjoy VIM anyway. Of course, I understand people who choose other editors or IDEs like RubyMine (I used Visual Studio quite a lot) because RubyMine was my first choice but... it wasn't good fit for me. 

Anyway, this post isn't about VIM itself. The brief introduction was just a simple indication why I started using snippets so long after I had been using VIM everyday. This post is about [vim-snipmate](https://github.com/garbas/vim-snipmate) and my foolish struggle with it.

First of all, this plugin is a fork of not maintained [snipmate.vim](https://github.com/msanders/snipmate.vim) ([here](https://github.com/msanders/snipmate.vim/pull/67) is an explanation of that matter). So, for those who still are using it, maybe it is time for some upgrade.

In React there is a well defined structure of a component and the fact that this is a javascript (even in es6 flavour) typing this piece of code over and over again is a little bit annoying and tiring. I don't have any issue with Ruby, however, because of lack of braces ( `{}` ) and rare usage of parentheses ( `()` ). That's why snippets for Ruby are quite unnecessary for me but not for javascript.

Very excited that I reminded myself about snippets and increased convenience, I started setting up the plugin. vim-snipmate goes without any snippets, so I decided to create separate [repo](https://github.com/luckyluk92/snippets) for found or created ones.

The struggle began when I wanted to add my own snippets, but first let's talk more about vim-snipmate itself. The syntax is quite straight forward.

```
snippet name
  content
```

`name` is a string when typed and a trigger button is hit, it will be replaced with `content`. Easy right[^1]? Of course, there are more possibilities like stops, mirrors and placeholders.

## Stops
The name says it all. The stop lets you type some custom text within put snippet.

```
snippet if
  if (${1}) {${2}}
```

`${n}` is a syntax for stop, where `n` is an order. By hitting `<Tab>` you move to the next stop and by hitting `<S-Tab>` you move to the previous one.

There is also a special stop. Its `n` is equal to `0`. The plugin understands it as its stop after execution.

## Placeholder
The placeholder syntax is an extension of stop's syntax:

```
snippet ppt
  propTypes: {
    ${1}: React.PropTypes.${2:string}
  }
```

Placeholder in that case is nothing other than default value. When you move to the next stop without changing the placeholder, the held value will remain. It can be also be useful as a hint.

## Mirrors
Mirrors starts to be great when a snippet contains two or more places with the same input.

```
snippet component
  var ${1} = React.createClass({
    displayName: '$1'
  });
```

Mirror is defined by `$n`. Where `n` indicates which stop to copy.

Remember the difference. **If you put mirror instead of a stop, your stop will be ingored or the cursor will be placed at the end of a snippet.**

Now let's get to...

## The Struggle
The struggle, of course, is a bit of an exaggeration, but I had spent at leat 20-30 minutes before I managed to deal with it. The thing is simple. **You must use tabs instead of double whitespace** when defining snippet. I'm not sure if documentation clears this out, does it?

## The last element - directories
Created snippets have to be put somewhere. First of all, these need to be located in `snippets/` directory. Second of all, `snippets/` directory needs to be within *runtimepath*. For me, the best solution is `~/.vim` directory, so I added there a symbolic link to my repo.

Additionally, there are a few ways of organising your snippets within `snippets/`. Two, adapted by me are:

* `.../snippets/scope.snippets`
* `.../snippets/scope/name.snippets`

*Scope* is, in most cases, the specific name of a language like *javascript*. You can assign some file extension to *scope* and then vim-snipmate will load snippets from correct directory/file.

*Name* is just a name. If you have some subgroups like *react* you can put them within `javascript/` directory and vim-snipmate will pick it up in javascript files.

## Conclusion
[vim-snipmate](https://github.com/garbas/vim-snipmate) is a great plugin and if you don't use it, I think you should consider it. If you can't remember some default syntax or you are annoyed with typing over and over again the same code structure, there you go! Remember, however, about these few things above, maybe they will save a little bit of your time.

Do you have any favorite plugins? Tell me about them in the comments!

Clever snipmating!


[^1]: No sarcasm here!
