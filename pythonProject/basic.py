#!/usr/bin/python

string = "Don't Panic Coporal Jones!"

print(string)
print("First element of the string: " + string[0])
print("Length of the string: "+str(len(string)))
print("Number of Os in the string: "+str(string.count("o")))
print("Where is the letter j?: "+str(string.find("j")))
print("Where does the word JONES start?: " + str(string.index("Jones")))
print("Present the string in upper case: " + string.upper())
print("Present the string in lower case: " + string.lower())
print("Present the string as if it was a title: "+ string.title())
print("Capitalise every word in the string: "+ string.capitalize())
print("Swap the case of every letter in the string: "+ string.swapcase())
print("repeat the string 5 times:")
print(string*5)
print("Reverse the string: "+''.join(reversed(string)))
print("Add whitespace: "+ " ".join(string))
print("Is the string alphanumerical?: " + str(string.isalnum()))
print("Is the string alphabeticaL?: " + str(string.isalpha()))

#Other logical tests in the string class.
#string.isdigit()
#string.istitle()
#string.isupper()
#string.islower()
#string.isspace()
#string.endswith('a')
#string.startswith('B')

print(string.replace("Panic", "just sit there"))
print(string)
string2=string.replace("Panic", "just sit there")
print(string2)

print(string[6:11])
print(string[:5])
