---
layout:     post
title:      Test post
date:       2015-07-11
summary:    This is some test post for blog.
tags: test stuff
---

This is some sentence.

List below:

* one
* two
* three

This is some ruby code:

```ruby
# The most awesome of classes
class Awesome < ActiveRecord::Base
  include EvenMoreAwesome

  validates_presence_of :something
  validates :email, email_format: true

  def initialize(email, name = nil)
    self.email = email
    self.name = name
    self.favorite_number = 12
    puts 'created awesomeness'
  end

  def email_format
    email =~ /\S+@\S+\.\S+/
  end
end
```
