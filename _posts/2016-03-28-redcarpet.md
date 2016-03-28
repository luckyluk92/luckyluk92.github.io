---
layout: post
title: Redcarpet, Rake and post parsing
date: 2016-03-28 11:11
tags: dajsiepoznac reactive-blog mvp redcarpet rake
---

Every blog has to have a way of inputing a new post. Some people write their creations in editor provided by blog engines, others are writing it in their favorite editor. As a VIM user, I want to create a convenient way to publish a post from author's file and for me, there is no need for fancy in-web editor. That's why, I decided that in the [MVP]({% post_url 2016-03-24-minimum-viable-product %}) I don't need internal editor, only a way of publishing a post having a file.

There is a catch, of course. There's need to be a way of providing formatting throughout writing tools which will be understood by *reactive-blog*. Posts could be written in HTML, but come on... HTML is not a convenient way of expressing yourself. However, [Markdown](https://en.wikipedia.org/wiki/Markdown) is! It is used more and more. [Github](https://help.github.com/articles/about-writing-and-formatting-on-github/) is using it, they even created [GitBook](https://www.gitbook.com/) which allows you comfortably writing a long form. I wrote my entire thesis with Markdown (except the code part, of course :) ). This is the solution of sharing way of text formatting throughout editors.

## The Flow
In the [previous]({% post_url 2016-03-24-minimum-viable-product %}) post I pointed out that for now, I want to focus on the simplest blog without any managing tools and so on. However, there has to be a way of publishing a post. I came up with a flow. Maybe it is not the simplest one, especially for not-tech person, but I had fun coding it :)

![The Flow](/images/2016-03-28/flow.png)
<span>The flow of publishing a new post.</span>


## Parsing post
The rake task is suppose to:

* read your file,
* extract the settings,
* extract post's content,
* parse post's content from Markdown to HTML,
* create a post record using settings and parsed content.

Below you can see an example of post:

```markdown
---
title: This is a test post
publish_date: 28-03-2016
tags: test, post
---
# Header
This is a content of my **super** interesting blogpost.
```

and if you ran the task, post will be saved in a database. The example record will look like:

```ruby
=> #<Post:0x00000006124bb0
  id: 3,
  title: "This is a test post",
  content: "# Header\nThis is a content of my **super** interesting blogpost.\n",
  author_id: nil,
  description: nil,
  tags: ["test", "post"],
  publish_date: Mon, 28 Mar 2016 00:00:00 UTC +00:00,
  content_html: "<h1>Header</h1>\n\n<p>This is a content of my <strong>super</strong> interesting blogpost.</p>\n",
  description_html: "">
```

You can see above that this:

```markdown
# Header
This is a content of my **super** interesting blogpost.
```

changed to this:

```html
<h1>Header</h1>
<p>
  This is a content of my <strong>super</strong> interesting blogpost.
</p>
```

### Redcarpet
In my case, I used [Redcarpet](https://github.com/vmg/redcarpet) to parse a Markdown to HTML. It is a great gem which provides such utility. It contains extensions and allows you to choose exactly the features you need. Below, you can see my setup:

```ruby
# app/services/parser.rb
module Parser
  DEFAULT_SETTINGS = {
    autolink: true,
    tables: true,
    no_intra_emphasis: true,
    fenced_code_blocks: true,
    strikethrough: true,
    space_after_headers: true,
    superscript: true,
    underline: true,
    quote: true,
    footnotes: true
  }
end
```

It may change, if I decide that some features are not necessary.




