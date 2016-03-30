---
layout: post
title: Overriding renderer in Redcarpet
date: 2016-03-30 21:36
summary: This post shows how easy is to override Redcarpet's renderer if you need some custom behaviour.
tags: dajsiepoznac redcarpet reactive-blog
---

In the [previous]({% post_url 2016-03-28-redcarpet_rake_parsing %}) post's conclusion I mentioned there is a problem with images' urls within a post. When I as a user/writer will write a post and include images' urls which direct to `assets/` directory they won't show up in a rendered post. Why is that? Of course, Rails precompiles these files, so `myimage.jpg` is no longer available via `/assets/images/myimage.jpg`, it is available via something like `/assets/myimage-4e6c5cfa49fbcb37453dc74256453515ba68b9f49811def2b29d6420f2a18e96.jpg`. I mentioned about this mechanism a little bit in [this]({% post_url 2016-03-11-faces-of-webpack %}) post.

In order to make it work, I have to override the Redcarpet's image tag renderer. Outstanding thing about Redcarpet is that this is extremely simple!

Out of the box Redcarpet provides `Redcarpet::Render::HTML` class which is a html renderer, hence we can inherit from it. Shocking!

```ruby
module CustomRender
  class Html < Redcarpet::Render::HTML

  def image(link, title, alt_text)
    asset_link = ActionController::Base.helpers.image_url(link)
    "<img src='#{asset_link}' alt='#{alt_text}' title='#{title}' />"
  end

  end
end
```

If you're wondering about methods which correspond to html tags, the gem's [documentation](https://github.com/vmg/redcarpet#block-level-calls) will help you.

That's it for today.
