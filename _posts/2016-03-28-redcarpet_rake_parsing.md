---
layout: post
title: Redcarpet, Rake and post parsing
date: 2016-03-28 11:11
summary: In this post I wrote about using Redcarpet and how I parse a blog post from a file.
tags: dajsiepoznac reactive-blog mvp redcarpet rake
---

Every blog has to have a way of inputing a new post. Some people write their creations in editor provided by blog engines, others are writing it in their favorite editor. As a VIM user, I want to create a convenient way to publish a post from author's file and for me, there is no need for fancy in-web editor. That's why, I decided that in the [MVP]({% post_url 2016-03-24-minimum-viable-product %}) I don't need internal editor, only a way of publishing a post having a file.

There is a catch, of course. There's need to be a way of providing formatting throughout writing tools which will be understood by *reactive-blog*. Posts could be written in HTML, but come on... HTML is not a convenient way of expressing yourself. However, [Markdown](https://en.wikipedia.org/wiki/Markdown) is! It is used more and more. [Github](https://help.github.com/articles/about-writing-and-formatting-on-github/) is using it, they even created [GitBook](https://www.gitbook.com/) which allows you comfortably writing a long form. I wrote my entire thesis with Markdown (except the code part, of course :) ). This is the solution of sharing way of text formatting throughout editors.

## The Flow
In the [previous]({% post_url 2016-03-24-minimum-viable-product %}) post I pointed out that for now, I want to focus on the simplest blog without any managing tools and so on. However, there has to be a way of publishing a post. I came up with a flow. Maybe it is not the simplest one, especially for not-tech person, but I had fun coding it :)

![The Flow](/images/2016-03-28/flow.png)
<span>The flow of publishing a new post.</span>


## Creating a post
The rake task is suppose to:

* read your file,
* extract the settings,
* extract post's content,
* parse post's content from Markdown to HTML,
* create a post record using settings and parsed content.

Below you can see an example of a post:

```markdown
---
title: This is a test post
publish_date: 28-03-2016
tags: test, post
---
# Header
This is a content of my **super** interesting blogpost.
```

and if you ran the task, post will be saved in a database. The example record will look like this:

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

Parsing is extremely simple:

```ruby
markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, your_settings)
html_content = markdown.render(markdown_you_want_parse)
```

I wrapped this with my own class to make the code less dependable on Redcarpet.

```ruby
# app/services/parser/file/post.rb
module Parser
  class Markdown

    def initialize(settings = DEFAULT_SETTINGS)
      @markdown_parser = Redcarpet::Markdown.new(
        Redcarpet::Render::HTML,
        settings
      )
    end

    def render(markdown)
      @markdown_parser.render(markdown)
    end

  end
end
```

### Parser
A file containing a post has two sections:

* settings,
* content.

`settings` section is surrounded by `---`, the same way as in Jekyll. As I need to operate on single lines to extract settings section, I used `File.foreach` which gives me an enumerator and it doesn't load the whole file into memory.

```ruby
module Parser
  module File
    class Post

      # ...some code

      def parse
        file_enumerator = ::File.foreach(PATH + @file_name)
        if file_enumerator.first.to_s.strip == SETTING_BLOCK
          file_enumerator.next # omitting the settings block indicator
          parse_settings(file_enumerator)
        end
        parse_content(file_enumerator)
      end

      # ...some code

    end
  end
end
```

`parse` method manages the enumerator throughout the process of parsing and calls methods to extract both settings and content - `parse_settings` and `parse_content`. Settings are tried to be extracted only if the file begins with `---` (the `SETTING_BLOCK` constant). `parse_settings` method not only extracts settings but pushes the enumerator to the place where the whole block ends, so then the content can be easily obtained.

The whole implementation can be found [here](https://github.com/luckyluk92/reactive-blog/blob/minimum_viable_product/app/services/parser/file/post.rb) and its tests [here](https://github.com/luckyluk92/reactive-blog/blob/minimum_viable_product/spec/services/parser/file/post_spec.rb).

### Rake
The last step is to make use of the code shown above. For now, I uses a simple rake task to run the parser and create a post record. The task's core looks like this:

```ruby
post = post_file_parser.settings['id'].present? ? Post.find(post_file_parser.settings['id']) : Post.new

post.update(
  content: post_file_parser.content,
  description: post_file_parser.settings['description'],
  content_html: markdown_parser.render(post_file_parser.content),
  description_html: markdown_parser.render(post_file_parser.settings['description'].to_s),
  title: post_file_parser.settings['title'],
  author: Author.where("(first_name || ' ' || last_name) = ?", post_file_parser.settings['author']).first,
  publish_date: post_file_parser.settings['publish_date'],
  tags: post_file_parser.settings['tags'].to_s.split(/,\s+/)
)
```

For now, I decided that `Post` will keep both markdown and html content in database. When the whole application will be more interactive I will probably change it and html will be rendered on the fly.

Although, defining a rake task is easy-peasy, I found a little bit awkward to pass an argument and use the environment.

```rake
namespace :posts do
  desc 'Parse post\'s markdown file into database object'
  task :parse, [:file_name] => :environment do |t, args|
    file_name = args[:file_name]

    # ...some code
  end
end
```

Doesn't `[:file_name] => :environment` look a little bit strange?

## Conclusion
I don't know, if this solution will last, but it is good enough for now. However, I think that there may be an issue with images in posts. Until they will be served from `public/`, everything should work fine, but when I'd like to include images from `assets/` I will have to override the image renderer in Redcarpet to use correct url.

That's all for today.


