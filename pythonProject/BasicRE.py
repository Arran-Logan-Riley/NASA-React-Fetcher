#!/usr/bin/python

# Python Regular Expressions Parser
import re


# program 2
# Run the programme below and again see if you can work out the regular expression.


# What does the following regular expression do?
# The rs on the right hand side of the expression mean treat the terms
# in quotes as raw text this sometimes simplifies the inputting
# of backslashes and other symbols.

r = r"[^a-z]*([y]o|[h']?ello|ok|hieroglyphs|hey|(good[ ])?(morn[gin']{0,3}|"\
r"afternoon|even[gin']{0,3}))[\s,;:]{1,3}([a-z]{1,20})"


#Regular expressions can be compiled. 
re_greeting = re.compile(r, flags=re.IGNORECASE)

print(str(re_greeting.match('Hello Algernon')))
print(str(re_greeting.match('Honestly, this looks like egyptian hieroglyphs to me')))
print(str(re_greeting.match('Hello Dave, I am afraid I cannott let you do that').groups()))
print(str(re_greeting.match("Good morning Dave")))
print(str(re_greeting.match("That's not very nice Dave"))) # Note this is not matched.
print(str(re_greeting.match('Good evening HAL9000').groups()))
print(str(re_greeting.match("Good Morn'n Vietnam")))
print(str(re_greeting.match("yo Blair")))


